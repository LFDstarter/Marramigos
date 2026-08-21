import { chromium } from 'playwright';
import fs from 'fs';
const BASE = 'http://localhost:4174';
const OUT = 'tools/shots/sections';
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
for (const vp of [{n:'mobile',w:393,h:852},{n:'desktop',w:1280,h:900}]) {
  const ctx = await browser.newContext({ viewport:{width:vp.w,height:vp.h}, deviceScaleFactor:2 });
  const page = await ctx.newPage();
  for (const route of ['/', '/le-chef', '/contact', '/faq']) {
    await page.goto(BASE + route, { waitUntil:'networkidle' });
    await page.waitForTimeout(700);
    // 1er passage : scroll complet pour declencher toutes les animations
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.5;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y); await new Promise(r => setTimeout(r, 280));
      }
      window.scrollTo(0, document.body.scrollHeight);
      await new Promise(r => setTimeout(r, 700));
    });
    // 2e passage : capture ecran par ecran
    const total = await page.evaluate(() => document.body.scrollHeight);
    const h = vp.h;
    const screens = Math.min(Math.ceil(total / h), 14);
    const slug = route === '/' ? 'home' : route.replace(/\//g,'');
    for (let i = 0; i < screens; i++) {
      await page.evaluate(y => window.scrollTo(0, y), i * h);
      await page.waitForTimeout(700);
      await page.screenshot({ path: `${OUT}/${slug}-${vp.n}-${String(i).padStart(2,'0')}.png` });
    }
  }
  await ctx.close();
}
await browser.close();
console.log('ok');
