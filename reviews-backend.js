// BACKEND ulasan — Firebase Firestore (gratis, tanpa server sendiri).
// Selama config di bawah masih placeholder, website otomatis pakai
// mode lokal (seed + localStorage) jadi tetap jalan normal.
//
// CARA AKTIFKAN (sekali saja, ±5 menit):
// 1. Buka console.firebase.google.com → Add project (mis. "portofolio-rma")
// 2. Build → Firestore Database → Create database → production mode
//    (lokasi: asia-southeast2 / Jakarta)
// 3. Tab Rules → tempel seluruh isi firestore.rules → Publish
// 4. Project settings (ikon gerigi) → Your apps → Web (</>) → copy firebaseConfig
// 5. Tempel config di bawah menggantikan placeholder → commit → selesai.
//    Ulasan lalu tersimpan permanen & tampil realtime ke semua pengunjung.
window.RMA_BACKEND = (function(){
  const firebaseConfig = {
    apiKey: "ISI_API_KEY_DARI_FIREBASE_CONSOLE",
    authDomain: "ISI_PROJECT_ID.firebaseapp.com",
    projectId: "ISI_PROJECT_ID",
    appId: "ISI_APP_ID"
  };

  const isPlaceholder = String(firebaseConfig.apiKey).indexOf('ISI_') === 0;
  if(isPlaceholder || !window.firebase || !window.firebase.firestore) return null;

  try{
    if(!window.firebase.apps.length) window.firebase.initializeApp(firebaseConfig);
    const db = window.firebase.firestore();
    return {
      live: true,
      subscribe(cb){
        return db.collection('reviews').orderBy('tanggal', 'desc').onSnapshot(
          snap => cb(snap.docs.map(d => ({id: d.id, ...d.data()}))),
          () => cb(null) // gagal baca → fallback lokal
        );
      },
      async add(review){
        await db.collection('reviews').add(review);
      },
      async seedIfEmpty(seeds){
        const s = await db.collection('reviews').limit(1).get();
        if(s.empty){
          const batch = db.batch();
          seeds.forEach(r => batch.set(db.collection('reviews').doc(), r));
          await batch.commit();
        }
      }
    };
  }catch(e){ return null; }
})();
