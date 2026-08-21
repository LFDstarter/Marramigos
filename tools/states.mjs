import { chromium } from 'playwright';
import fs from 'fs';
const OUT='tools/shots/etats'; fs.mkdirSync(OUT,{recursive:true});
const B='http://localhost:4174';
const b = await chromium.launch();
for (const vp of [{n:'desktop',w:1280,h:900},{n:'mobile',w:393,h:852}]) {
  const c = await b.newContext({viewport:{width:vp.w,height:vp.h},deviceScaleFactor:2});
  const p = await c.newPage();

  // lightbox evenements (home)
  await p.goto(B+'/', {waitUntil:'networkidle'});
  await p.evaluate(async () => { for(let y=0;y<document.body.scrollHeight;y+=window.innerHeight*0.5){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,220));} });
  await p.waitForTimeout(600);
  const ev = p.locator('img[alt*="vénement"], img[src*="evenements"]').first();
  await ev.scrollIntoViewIfNeeded(); await p.waitForTimeout(500);
  await ev.click(); await p.waitForTimeout(900);
  await p.screenshot({path:`${OUT}/lightbox-evenements-${vp.n}.png`});
  await p.keyboard.press('Escape').catch(()=>{});

  // formulaire contact rempli
  await p.goto(B+'/contact', {waitUntil:'networkidle'});
  await p.waitForTimeout(700);
  const fill = async (sel,val)=>{ const l=p.locator(sel).first(); if(await l.count()) await l.fill(val).catch(()=>{}); };
  await fill('input[name="name"], input#name','Camille Renard');
  await fill('input[type="email"]','camille.renard@example.com');
  await fill('input[type="tel"]','+212 6 12 34 56 78');
  await fill('textarea','Dîner pour 8 personnes le 12 septembre, à la villa.');
  await p.waitForTimeout(400);
  await p.screenshot({path:`${OUT}/contact-rempli-${vp.n}.png`, fullPage:true});

  // FAQ ouverte
  await p.goto(B+'/faq', {waitUntil:'networkidle'});
  await p.waitForTimeout(700);
  const q = p.locator('button').filter({hasNotText:/^$/}).nth(1);
  await q.click().catch(()=>{}); await p.waitForTimeout(800);
  await p.screenshot({path:`${OUT}/faq-ouverte-${vp.n}.png`, fullPage:true});

  // 404
  await p.goto(B+'/page-inexistante', {waitUntil:'networkidle'});
  await p.waitForTimeout(600);
  await p.screenshot({path:`${OUT}/404-${vp.n}.png`});

  // galerie chef : lightbox
  await p.goto(B+'/le-chef', {waitUntil:'networkidle'});
  await p.evaluate(async () => { for(let y=0;y<document.body.scrollHeight;y+=window.innerHeight*0.5){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,220));} });
  await p.waitForTimeout(600);
  const g = p.locator('img[src*="/photos/le_chef/image"]').first();
  await g.scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
  await g.click().catch(()=>{}); await p.waitForTimeout(900);
  await p.screenshot({path:`${OUT}/chef-galerie-${vp.n}.png`});

  await c.close();
}
await b.close(); console.log('ok');
