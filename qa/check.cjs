/* Browser acceptance tests for the actual shopping flow and PDF requirements. */
const {chromium,firefox}=require('playwright');
const useFirefox=process.env.TEST_BROWSER==='firefox';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
(async()=>{
 const browser=await (useFirefox?firefox.launch({headless:true}):chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']}));
 const context=await browser.newContext({viewport:{width:1440,height:1000}});
 const p=await context.newPage();let errors=[];p.on('pageerror',e=>errors.push(e.message));
 const origin=process.env.TEST_ORIGIN||'http://127.0.0.1:4173/';const pages=['index','shop','product','guide','support','cart','orders','policy'];
 let views=0;
 for(const width of [375,768,1440]){
  await p.setViewportSize({width,height:900});
  for(const page of pages){
   const response=await p.goto(origin+page+'.html');assert.equal(response.status(),200);await p.evaluate(()=>document.fonts.ready);
   assert.equal(await p.locator('h1').count(),1,page+' h1');
   assert.equal(await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,page+' overflow @'+width);
   assert.equal(await p.locator('header nav a').count(),4);
   for(const href of await p.locator('a[href]').evaluateAll(a=>a.map(x=>x.getAttribute('href')))){
    if(!href||href.startsWith('https:')||href.startsWith('#'))continue;
    assert.ok(fs.existsSync(path.join(__dirname,'..',href.split('#')[0])),href+' missing');
   }
   views++;
  }
 }
 await p.goto(origin+'shop.html');await p.fill('#plan-search','khong-co-goi-nay');assert.equal(await p.locator('#no-results').isVisible(),true);
 await p.click('#reset-search');assert.equal(await p.locator('[data-plan-card]:visible').count(),4);
 await p.selectOption('#plan-sort','price-desc');assert.equal(await p.locator('[data-plan-card]').first().getAttribute('data-plan-card'),'lifetime');
 await p.fill('#plan-search','1 thang');assert.equal(await p.locator('[data-plan-card]:visible').count(),1);
 await p.click('[data-add="month"]');await p.click('[data-add="month"]');assert.equal(await p.locator('.cart-count').innerText(),'1');
 await p.goto(origin+'product.html');await p.click('[data-choice="year"]');assert.equal(await p.locator('#selected-price').innerText(),'499.000đ');await p.click('#detail-add');
 await p.goto(origin+'cart.html');assert.equal(await p.locator('.cart-item').count(),2);assert.equal(await p.locator('#cart-total').innerText(),'578.000đ');
 await p.reload();assert.equal(await p.locator('.cart-item').count(),2);
 await p.click('[aria-label="Xóa gói 1 năm"]');assert.equal(await p.locator('#cart-total').innerText(),'79.000đ');
 const malicious='<img src=x onerror=alert(1)>';
 await p.fill('#customer-discord',malicious);await p.fill('#order-note','Test browser — chưa gửi người bán');await p.check('#agree-order');await p.click('button[type=submit]');
 assert.equal(await p.locator('#order-success').isVisible(),true);assert.ok((await p.locator('#order-report').innerText()).includes(malicious));assert.equal(await p.locator('#order-report img').count(),0);assert.equal(await p.locator('.cart-count').innerText(),'0');
 const [download]=await Promise.all([p.waitForEvent('download'),p.click('#download-order')]);assert.ok(download.suggestedFilename().endsWith('.txt'));
 await p.goto(origin+'orders.html');assert.equal(await p.locator('.order-card').count(),1);await p.reload();assert.equal(await p.locator('.order-card').count(),1);
 await p.click('#clear-orders');assert.equal(await p.locator('.order-card').count(),1);await p.click('#clear-orders');assert.equal(await p.locator('#orders-empty').isVisible(),true);
 await p.goto(origin+'support.html');await p.selectOption('#support-topic','Kiểm tra tương thích');await p.fill('#support-message','Phiên bản Stella Sora 2.0.0 cần kiểm tra.');await p.click('button[type=submit]');assert.ok((await p.locator('#support-report').innerText()).includes('Kiểm tra tương thích'));
 await p.goto(origin);await p.getByRole('tab',{name:'Event',exact:true}).click();assert.equal(await p.locator('.preview-row').count(),3);await p.getByRole('tab',{name:'Event',exact:true}).press('ArrowLeft');assert.equal(await p.locator('.preview-row').count(),5);
 await p.setViewportSize({width:375,height:812});await p.click('.menu-toggle');assert.equal(await p.locator('#main-nav').isVisible(),true);await p.keyboard.press('Escape');assert.equal(await p.locator('#main-nav').isVisible(),false);
 // Critical/serious automated accessibility checks for every distinct page.
 let axeFindings=[];await p.setViewportSize({width:1440,height:1000});
 for(const page of pages){await p.goto(origin+page+'.html');await p.addScriptTag({path:require.resolve('axe-core')});const findings=await p.evaluate(async()=> (await axe.run()).violations.filter(v=>['critical','serious'].includes(v.impact)).map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})));if(findings.length)axeFindings.push({page,findings});}
 assert.deepEqual(axeFindings,[]);
 // Recovery from malformed persisted state, and storage denied mode.
 await p.evaluate(()=>localStorage.setItem('soravynx.cart.v1','{"broken":true}'));await p.goto(origin+'cart.html');assert.equal(await p.locator('#cart-empty').isVisible(),true);
 const blocked=await browser.newContext();await blocked.addInitScript(()=>{Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Blocked','SecurityError')}})});const bp=await blocked.newPage();await bp.goto(origin+'cart.html');assert.equal(await bp.locator('#storage-warning').isVisible(),true);await blocked.close();
 assert.deepEqual(errors,[]);
 const report={html_pages:8,responsive_views_checked:views,widths:[375,768,1440],flows:['search and sort','duplicate protection','detail plan selection','cart persistence and removal','order validation and draft','safe text rendering','download request','order history and deletion','support form','keyboard tabs','mobile navigation','corrupt and denied storage'],critical_or_serious_axe_violations:axeFindings,page_errors:errors,browser:(useFirefox?'Firefox ':'Chromium ')+browser.version(),game_or_payment_actions:'None'};
 fs.writeFileSync(path.join(__dirname,useFirefox?'results-firefox.json':'results.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
