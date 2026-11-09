import json,datetime,urllib.request,uuid
from pathlib import Path
from playwright.sync_api import sync_playwright
import os
out=Path(os.environ.get('COMMERCE_QA_OUTPUT','/tmp/soravynx-commerce-qa'));out.mkdir(exist_ok=True)
with sync_playwright() as p:
 browser=p.chromium.launch(executable_path=os.environ.get('CHROMIUM_PATH','/usr/bin/chromium'),headless=True,args=['--no-sandbox'])
 context=browser.new_context(viewport={'width':1440,'height':1000})
 page=context.new_page();errors=[];page.on('pageerror',lambda e:errors.append(str(e)))
 page.route('https://qr.sepay.vn/**',lambda r:r.fulfill(content_type='image/svg+xml',body='<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300"><rect width="300" height="300" fill="white"/><text x="40" y="150">TEST QR - NO PAYMENT</text></svg>'))
 root=os.environ.get('STATIC_ORIGIN','http://127.0.0.1:4173/')
 pages=['index','shop','product','guide','support','cart','orders','policy','account','discord']
 for width in [375,768,1440]:
  page.set_viewport_size({'width':width,'height':1000})
  for name in pages:
   response=page.goto(root+name+'.html');assert response.status==200
   page.evaluate('document.fonts.ready')
   assert page.locator('h1').count()==1,(name,'h1')
   assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'),(name,width,'overflow')
 page.goto(root+'shop.html');page.locator('[data-add="week"]').first.click();page.goto(root+'cart.html');assert page.get_by_role('link',name='Thanh toán QR',exact=True).count()==1
 assert 'plan=week' in page.get_by_role('link',name='Thanh toán QR',exact=True).get_attribute('href')
 page.goto(root+'discord.html');assert page.get_by_role('link',name='Vào server Discord ↗',exact=True).get_attribute('href')=='https://discord.gg/J3BevcpAxF'
 page.screenshot(path=str(out/'discord-guide.png'),full_page=True)
 page.route('**/store-config.json',lambda route:route.fulfill(json={'version':1,'apiBase':'javascript:alert(1)'}))
 page.goto(root+'account.html');page.get_by_text('Cổng tài khoản đang chờ kết nối.',exact=True).wait_for();assert page.url.startswith(root)
 page.unroute('**/store-config.json')
 page.route('**/store-config.json',lambda route:route.fulfill(json={'version':1,'apiBase':'https://checkout.example.com'}))
 page.route('https://checkout.example.com/account*',lambda route:route.fulfill(body='<h1>Account gateway target</h1>',content_type='text/html'))
 page.goto(root+'account.html?plan=month&method=wallet');page.wait_for_url('https://checkout.example.com/account*');assert 'plan=month' in page.url and 'method=wallet' in page.url
 page.unroute('**/store-config.json');page.unroute('https://checkout.example.com/account*')
 page.goto('http://127.0.0.1:8791/account');page.locator('#register-mode').click();username='webtester'+uuid.uuid4().hex[:6]
 page.fill('#username',username);page.fill('#password','strong-password-123');page.fill('#confirm','strong-password-123');page.click('#auth-submit');page.locator('#dashboard').wait_for(state='visible',timeout=10000)
 assert '__Host-soravynx' not in page.evaluate('document.cookie')
 assert any(c['name']=='__Host-soravynx' and c['httpOnly'] and c['secure'] for c in context.cookies())
 page.screenshot(path=str(out/'account-desktop.png'),full_page=True)
 with page.expect_response(lambda r:r.url.endswith('/api/account/topups') and r.request.method=='POST') as sent:page.locator('#topup-form button[type=submit]').click()
 topup=sent.value.json()['order'];assert 'acc=96247TESTVA' in topup['qr'];page.locator('#payment-dialog').wait_for(state='visible')
 def pay(order,id):
  now=datetime.datetime.now(datetime.timezone(datetime.timedelta(hours=7))).strftime('%Y-%m-%d %H:%M:%S')
  payload={'id':id,'gateway':'BIDV','accountNumber':'12345678901234','subAccount':'96247TESTVA','transferType':'in','transferAmount':order['amount'],'content':order['code'],'transactionDate':now}
  request=urllib.request.Request('http://127.0.0.1:8791/webhooks/sepay',data=json.dumps(payload).encode(),headers={'Content-Type':'application/json','Authorization':'Apikey '+'s'*64})
  with urllib.request.urlopen(request) as response:assert response.status==201
 pay(topup,991);pay(topup,991)
 page.locator('#payment-status').filter(has_text='Đã nạp 29.000đ vào ví.').wait_for(timeout=15000)
 assert page.locator('#balance').inner_text()=='29.000đ'
 page.locator('#close-payment').click();page.check('[name=method][value=wallet]');page.locator('#buy-form button[type=submit]').click();page.locator('#payment-result').wait_for(state='visible',timeout=15000)
 key=page.locator('#payment-key').inner_text();assert len(key)==15
 page.locator('#close-payment').click();page.locator('#refresh').click();page.wait_for_function("document.getElementById('balance').textContent==='0đ'")
 page.set_viewport_size({'width':390,'height':844});assert page.evaluate('document.documentElement.scrollWidth<=innerWidth');page.screenshot(path=str(out/'account-mobile.png'),full_page=True)
 page.check('[name=method][value=qr]')
 with page.expect_response(lambda r:r.url.endswith('/api/account/orders') and r.request.method=='POST') as sent:page.locator('#buy-form button[type=submit]').click()
 direct=sent.value.json()['order'];assert direct['amount']==29000;pay(direct,992)
 page.locator('#payment-result').wait_for(state='visible',timeout=15000);assert len(page.locator('#payment-key').inner_text())==15
 page.locator('#close-payment').click();page.locator('#logout').click();page.locator('#auth').wait_for(state='visible');assert page.locator('#orders').inner_text()==''
 page.locator('#login-mode').click();page.fill('#username',username);page.fill('#password','strong-password-123');page.locator('#auth-submit').click();page.locator('#dashboard').wait_for(state='visible');assert page.locator('#orders code').count()==2
 assert not errors,errors
 browser.close()
result={'static_layouts':30,'auth_cookie':'Secure/HttpOnly','duplicate_topup':'credited once','wallet_purchase':'passed','direct_qr':'passed','logout_relogin':'passed','browser_errors':errors,'bank_and_publishing':'simulated','live_backend_verified':False}
Path(__file__).with_name('commerce-results.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
print('PASS: 30 static layouts and isolated account/payment browser flow. Bank/publishing simulated; no real funds.')
