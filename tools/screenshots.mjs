import { chromium } from 'playwright';
import fs from 'fs';

const BASE = process.env.BASE || 'http://localhost:4174';
const OUT = process.env.OUT || 'tools/shots';
fs.mkdirSync(OUT, { recursive: true });

const pages = [
  { name: 'accueil', path: '/' },
  { name: 'prestations', path: '/nos-prestations' },
  { name: 'le-chef', path: '/le-chef' },
  { name: 'faq', path: '/faq' },
  { name: 'contact', path: '/contact' },
];

const viewports = [
  { name: 'desktop', width: 1280, height: 900 },
  { name: 'mobile', width: 393, height: 852 },
];

const report = { broken: [], consoleErrors: [], imgStatus: [] };

const browser = await chromium.launch();
for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();

  page.on('console', m => { if (m.type() === 'error') report.consoleErrors.push(`[${vp.name}] ${m.text()}`); });
  page.on('response', async r => {
    const u = r.url();
    if (/\.(jpg|jpeg|png|svg|mp4|webp)$/i.test(u)) {
      report.imgStatus.push(`${r.status()} ${u.replace(BASE, '')}`);
      if (r.status() >= 400) report.broken.push(`${r.status()} ${u}`);
    }
  });
  page.on('requestfailed', r => report.broken.push(`FAILED ${r.url()} (${r.failure()?.errorText})`));

  for (const p of pages) {
    await page.goto(BASE + p.path, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    // scroller toute la page pour declencher les animations au scroll (useInView)
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.6;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 260));
      }
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise(r => setTimeout(r, 600));
      window.scrollTo(0, 0);
      await new Promise(r => setTimeout(r, 400));
    });
    await page.waitForTimeout(900);
    const videoState = await page.evaluate(() => {
      const v = document.querySelector('video');
      return v ? { currentTime: v.currentTime, paused: v.paused, w: v.videoWidth, h: v.videoHeight } : null;
    });
    if (videoState) report.consoleErrors.push(`[video ${vp.name}${p.path}] ${JSON.stringify(videoState)}`);
    // vérifier les images cassées côté DOM
    const bad = await page.evaluate(() =>
      [...document.images].filter(i => !i.complete || i.naturalWidth === 0).map(i => i.currentSrc || i.src)
    );
    if (bad.length) report.broken.push(`[${vp.name}${p.path}] images vides: ${bad.join(', ')}`);
    await page.screenshot({ path: `${OUT}/${p.name}-${vp.name}.png`, fullPage: true });
  }

  // état: lightbox galerie page chef
  await page.goto(BASE + '/le-chef', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);
  const thumbs = page.locator('img');
  if (await thumbs.count() > 2) {
    await thumbs.nth(2).click({ trial: false }).catch(() => {});
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${OUT}/le-chef-lightbox-${vp.name}.png` });
  }

  // menu mobile ouvert
  if (vp.name === 'mobile') {
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(600);
    const btn = page.locator('header button').last();
    await btn.click().catch(() => {});
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/menu-mobile.png` });
  }

  await ctx.close();
}
await browser.close();

fs.writeFileSync(`${OUT}/rapport.json`, JSON.stringify(report, null, 2));
console.log('MEDIAS CHARGES:', [...new Set(report.imgStatus)].sort().join('\n'));
console.log('\nERREURS CONSOLE:', report.consoleErrors.length ? report.consoleErrors.join('\n') : 'aucune');
console.log('\nCASSES:', report.broken.length ? report.broken.join('\n') : 'aucun');
