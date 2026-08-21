import { chromium } from 'playwright';
const b = await chromium.launch();
for (const vp of [{n:'desktop',w:1280,h:900},{n:'mobile',w:393,h:852}]) {
  const c = await b.newContext({ viewport:{width:vp.w,height:vp.h}, deviceScaleFactor:2 });
  const p = await c.newPage();
  await p.goto('http://localhost:4174/', { waitUntil:'networkidle' });
  await p.waitForTimeout(600);
  if (vp.n === 'mobile') { await p.locator('header button').last().click(); await p.waitForTimeout(500); }
  await p.getByRole('link', { name: /prestations/i }).first().click();
  await p.waitForTimeout(2500);
  await p.screenshot({ path: `tools/shots/ancre-prestations-${vp.n}.png` });
  const info = await p.evaluate(() => {
    const el = document.getElementById('nos-prestations');
    const h = document.querySelector('header');
    return { top: Math.round(el?.getBoundingClientRect().top ?? -1), headerH: Math.round(h?.getBoundingClientRect().height ?? -1) };
  });
  console.log(vp.n, JSON.stringify(info));
  await c.close();
}
await b.close();
