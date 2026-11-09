self.addEventListener('install',e=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('notificationclick',e=>{e.notification.close();const u=(e.notification.data&&e.notification.data.u)||'./';e.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(l=>{for(const c of l){if('focus' in c)return c.focus()}return self.clients.openWindow(u)}))});
/* ভবিষ্যতে FCM/Web Push সার্ভার যোগ করলে ব্রাউজার বন্ধ থাকলেও এটি নোটিফিকেশন দেখাবে */
self.addEventListener('push',e=>{let d={};try{d=e.data.json()}catch(x){d={body:e.data?e.data.text():''}}e.waitUntil(self.registration.showNotification(d.title||'পেনাল্টি শুটআউট',{body:d.body||'',data:{u:d.u||'./'}}))});
