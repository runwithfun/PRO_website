import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
const code=fs.readFileSync(new URL('../public/analytics.js',import.meta.url),'utf8');
const product='pro', host='proapp.uk', apiName=product.toUpperCase()+'_ANALYTICS';
const source=p=>p.utm_source??p.source;
const storage=()=>{const m=new Map();return{getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v),removeItem:k=>m.delete(k)}};
function page(search='',session=storage(),now=1700000000000) {
  const calls=[],timers=[],handlers={};let seq=0;
  const loc=new URL('https://'+host+'/'+search);
  const doc={readyState:'complete',referrer:'',title:'Home',visibilityState:'visible',documentElement:{scrollHeight:1000},currentScript:{getAttribute:k=>({'data-api':'https://api.appfita.ru','data-collect':'1'})[k]},querySelectorAll:()=>[],querySelector:()=>null,addEventListener:(n,f)=>{handlers[n]=f}};
  const win={document:doc,location:loc,localStorage:storage(),sessionStorage:session==='blocked'?storage():session,URL,URLSearchParams,navigator:{language:'en'},screen:{width:100,height:100},innerWidth:100,innerHeight:100,history:{pushState(){},replaceState(){}},addEventListener:(n,f)=>{handlers[n]=f},crypto:{randomUUID:()=>`00000000-0000-4000-8000-${String(++seq).padStart(12,'0')}`},setTimeout:f=>{timers.push(f);return timers.length},fetch:async(url,opts)=>{calls.push(JSON.parse(opts.body));return{status:204}}};
  if(session==='blocked')for(const name of ['localStorage','sessionStorage'])Object.defineProperty(win,name,{get(){throw new Error('SecurityError')}});
  const clock=class extends Date{static now(){return now}};
  vm.runInNewContext(code,{window:win,URL,URLSearchParams,Date:clock,Intl,Uint8Array,Blob,setTimeout:win.setTimeout,clearTimeout(){}});
  const flush=async()=>{let guard=0;while(timers.length&&guard++<10){timers.shift()();await Promise.resolve()}};
  return{win,flush,calls,events:()=>calls.flatMap(c=>c.events),navigate:s=>{win.location=new URL('https://'+host+'/'+s);handlers.popstate?.()}};
}
test('all five safe UTM tags reach events and persist across navigation',async()=>{
  const session=storage(),a=page('?utm_source=Telegram&utm_medium=Post&utm_campaign=Launch&utm_term=Fitness&utm_content=Bio',session);
  await a.flush();const props=a.events()[0].properties;
  assert.equal(source(props),'telegram');assert.equal(props.utm_content,'bio');assert.equal(props.utm_term,'fitness');
  const b=page('',session,1700000001000);await b.flush();assert.equal(source(b.events()[0].properties),'telegram');
});
test('a tagged return replaces the entire campaign and expires after inactivity',async()=>{
  const session=storage(),a=page('?utm_source=one&utm_campaign=old',session);await a.flush();
  const b=page('?utm_source=two',session,1700000001000);await b.flush();const p=b.events()[0].properties;
  assert.equal(source(p),'two');assert.equal(p.utm_campaign??p.campaign,undefined);
  const c=page('',session,1700000001000+31*60000);await c.flush();assert.equal(source(c.events()[0].properties),undefined);
});
test('PII, arbitrary URL parameters and corrupt stored values never become campaign tags',async()=>{
  const session=storage();session.setItem(product+'_acquisition_v1',JSON.stringify({at:1700000000000,values:{utm_source:'person@example.com',email:'private',utm_campaign:'valid',__proto__:'pollution'}}));
  const a=page('?utm_source=person%40example.com&utm_content=https%3A%2F%2Fsecret&utm_term=hello%20world&token=secret',session);await a.flush();
  const props=a.events()[0].properties;assert.equal(source(props),undefined);assert.equal(props.utm_content,undefined);assert.equal(props.utm_term,undefined);assert.doesNotMatch(JSON.stringify(a.calls),/example\.com|secret|hello world|pollution/);
});
if(product!=='fita')test('SPA query-only arrivals count and page_leave keeps its former campaign',async()=>{
  const a=page('?utm_source=one');await a.flush();a.navigate('?utm_source=two');await a.flush();
  const events=a.events();assert.equal(events.filter(e=>e.name==='page_view').length,2);
  assert.equal(source(events.find(e=>e.name==='page_leave').properties),'one');assert.equal(source(events.at(-1).properties),'two');
});
test('an untagged referral link is the referral channel; its own tags win',async()=>{
  for(const path of ['invite/?code=K7MPX3','invite/K7MPX3']){
    const a=page(path);await a.flush();const p=a.events()[0].properties;
    assert.equal(source(p),'referral',path);assert.equal(p.utm_medium,'invite');assert.equal(p.utm_campaign,'invite');
  }
  const tagged=page('invite/?code=K7MPX3&utm_source=telegram');await tagged.flush();
  assert.equal(source(tagged.events()[0].properties),'telegram');
  const plain=page('features?code=K7MPX3');await plain.flush();assert.equal(source(plain.events()[0].properties),undefined);
});
test('a visit keeps raw acquisition facts: ad click id, landing params, first touch and visit number',async()=>{
  const session=storage(),a=page('?fbclid=IwAR0abc_DEF-1.2&utm_source=instagram&x=1',session);await a.flush();
  const p=a.events()[0].properties;
  assert.equal(p.click_id_type,'fbclid');assert.equal(p.click_id,'IwAR0abc_DEF-1.2');
  assert.equal(p.landing_params,'fbclid,utm_source,x');assert.equal(p.landing_path,'/');assert.equal(p.visit_number,1);
  assert.equal(p.first_source,'instagram');assert.equal(p.days_since_first_visit,0);
  a.navigate('features');await a.flush();const later=a.events().at(-1).properties;
  assert.equal(later.click_id_type,'fbclid','the click id stays for the whole visit');assert.equal(later.visit_number,1);
  const untagged=page('?gclid=Cj0KCQ');await untagged.flush();const u=untagged.events()[0].properties;
  assert.equal(u.first_source,'click:gclid');assert.equal(u.utm_source,undefined,'click ids never invent a UTM source');
  const bad=page('?fbclid=%3Cscript%3E');await bad.flush();assert.equal(bad.events()[0].properties.click_id,undefined);
});
test('ChatGPT ad click ids are kept like other ad click ids',async()=>{
  const a=page('?utm_source=gpt&utm_campaign=1026&oppref=Ab1_x-2&olref=Zz9');await a.flush();
  const p=a.events()[0].properties;
  assert.equal(p.click_id_type,'oppref');assert.equal(p.click_id,'Ab1_x-2');assert.equal(p.landing_params,'utm_source,utm_campaign,oppref,olref');
});
test('a browser that blocks storage still sends events',async()=>{
  const a=page('?utm_source=gpt&fbclid=x1','blocked');await a.flush();
  assert.ok(a.events().some(e=>e.name==='page_view'));assert.equal(a.events()[0].properties.click_id,'x1');
});

