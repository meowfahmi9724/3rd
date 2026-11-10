/* পেনাল্টি শুটআউট — অফলাইন ক্যাশ + নোটিফিকেশন ক্লিক */
const V='ps-v3',CORE=['./','index.html'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(V).then(c=>c.addAll(CORE).catch(()=>{})))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
  if(u.search.indexOf('_v=')>=0)return;
  if(/firestore\.googleapis|identitytoolkit|securetoken|firebaseinstallations/.test(u.host))return;
  if(!(u.origin===location.origin||/gstatic\.com|jsdelivr\.net|googleapis\.com|cdnjs\.cloudflare\.com/.test(u.host)))return;
  e.respondWith(fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(V).then(c=>c.put(r,cp)).catch(()=>{})}return res})
    .catch(()=>caches.match(r,{ignoreSearch:true}).then(m=>m||(r.mode==='navigate'?caches.match('index.html').then(x=>x||caches.match('./')):Response.error()))))});
self.addEventListener('notificationclick',e=>{e.notification.close();const url=(e.notification.data&&e.notification.data.u)||'./';
  e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return self.clients.openWindow(url)}))});
