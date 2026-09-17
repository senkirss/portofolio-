// Portofolio RMA — interaksi ala White Desert (native JS)

// 1. Preloader
(function preloader(){
  const pre = document.getElementById('preloader');
  const num = document.getElementById('preNum');
  const fill = document.getElementById('preBarFill');
  let p = 0;
  const t = setInterval(()=>{
    p += Math.floor(Math.random()*12)+4;
    if(p >= 100){ p = 100; clearInterval(t);
      setTimeout(()=> pre.classList.add('done'), 300);
    }
    num.textContent = String(p).padStart(2,'0');
    fill.style.width = p + '%';
  }, 120);
})();

// 2. Navbar scroll + parallax hero
const navbar = document.getElementById('navbar');
const heroBg = document.getElementById('heroBg');
window.addEventListener('scroll', ()=>{
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  if(heroBg && window.scrollY < window.innerHeight){
    heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  }
}, {passive:true});

// 2b. Video fade-in saat siap
(function heroVideo(){
  const v = document.querySelector('.hero-video');
  if(!v) return;
  const show = ()=> v.classList.add('loaded');
  v.addEventListener('canplay', show, {once:true});
  v.addEventListener('loadeddata', show, {once:true});
  setTimeout(show, 4000); // paksa tampil walau event lambat
  v.play?.().catch(()=>{});
})();

// 2c. Parallax mouse di hero (gerak mengikuti kursor — terasa hidup)
(function mouseParallax(){
  const hero = document.getElementById('hero');
  const layers = document.querySelectorAll('#heroBg [data-depth]');
  const center = document.querySelector('.hero-center');
  if(!hero || !window.matchMedia('(hover:hover)').matches) return;
  let tx=0, ty=0, cx=0, cy=0;
  hero.addEventListener('mousemove', e=>{
    const r = hero.getBoundingClientRect();
    tx = (e.clientX - r.left)/r.width - .5;
    ty = (e.clientY - r.top)/r.height - .5;
  });
  hero.addEventListener('mouseleave', ()=>{ tx=0; ty=0; });
  (function loop(){
    cx += (tx-cx)*.05; cy += (ty-cy)*.05;
    layers.forEach(l=>{
      const d = parseFloat(l.dataset.depth)||.03;
      l.style.marginLeft = `${cx * d * 600}px`;
      l.style.marginTop = `${cy * d * 400}px`;
    });
    if(center) center.style.transform = `translate(${cx*-18}px, ${cy*-14}px)`;
    requestAnimationFrame(loop);
  })();
})();

// 2d. Partikel kunang-kunang + daun melayang (canvas native)
(function particles(){
  const cv = document.getElementById('particles');
  if(!cv) return;
  const ctx = cv.getContext('2d');
  const hero = document.getElementById('hero');
  let W,H,parts=[];
  const COLORS = ['252,236,216','255,248,238','145,172,103','255,255,255'];
  function resize(){
    W = cv.width = hero.offsetWidth;
    H = cv.height = hero.offsetHeight;
  }
  function spawn(n){
    parts = Array.from({length:n}, ()=>({
      x: Math.random()*W,
      y: Math.random()*H,
      r: Math.random()*2.4+.6,
      vy: -(Math.random()*.5+.15),
      vx: (Math.random()-.5)*.4,
      a: Math.random()*.7+.2,
      tw: Math.random()*Math.PI*2,
      ts: Math.random()*.03+.01,
      c: COLORS[Math.floor(Math.random()*COLORS.length)]
    }));
  }
  function tick(){
    if(!document.body.classList.contains('paused')){
      ctx.clearRect(0,0,W,H);
      parts.forEach(p=>{
        p.y += p.vy; p.x += p.vx + Math.sin(p.tw)*.2; p.tw += p.ts;
        if(p.y < -10){ p.y = H+10; p.x = Math.random()*W; }
        if(p.x < -10) p.x = W+10; if(p.x > W+10) p.x = -10;
        const alpha = p.a * (0.6 + 0.4*Math.sin(p.tw));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = `rgba(${p.c},${alpha.toFixed(2)})`;
        ctx.shadowColor = `rgba(${p.c},.8)`; ctx.shadowBlur = 8;
        ctx.fill(); ctx.shadowBlur = 0;
      });
    }
    requestAnimationFrame(tick);
  }
  resize(); spawn(window.innerWidth < 600 ? 35 : 70); tick();
  window.addEventListener('resize', resize);
})();

// 2e. Tombol jeda / putar latar
document.getElementById('motionToggle')?.addEventListener('click', function(){
  const paused = document.body.classList.toggle('paused');
  const v = document.querySelector('.hero-video');
  this.textContent = paused ? '▶ Latar' : '❚❚ Latar';
  if(v){ paused ? v.pause() : v.play?.().catch(()=>{}); }
});

// 3. Mobile menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', ()=> mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> mobileMenu.classList.remove('open')));

// 4. Reveal on scroll
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('visible');
      // skill bars
      if(e.target.classList.contains('skill')){
        const f = e.target.querySelector('.fill');
        if(f) f.style.width = f.dataset.w;
      }
      // counters
      const c = e.target.querySelector?.('.counter');
      if(c && !c.dataset.done) animateCount(c);
      if(e.target.classList.contains('counter') && !e.target.dataset.done) animateCount(e.target);
    }
  });
},{threshold:0.15});
document.querySelectorAll('.reveal, .reveal-img, .skill, .stat').forEach(el=> io.observe(el));

function animateCount(el){
  el.dataset.done = 1;
  const target = +el.dataset.target || 0;
  let cur = 0;
  const step = Math.max(1, Math.ceil(target/40));
  const t = setInterval(()=>{
    cur += step;
    if(cur >= target){ cur = target; clearInterval(t); }
    el.textContent = cur;
  }, 50);
}

// 5. Drag to scroll untuk kartu Data Diri
(function dragScroll(){
  const el = document.getElementById('hScroll');
  let down=false, startX=0, startL=0;
  el.addEventListener('pointerdown', e=>{ down=true; startX=e.clientX; startL=el.scrollLeft; el.setPointerCapture(e.pointerId); });
  el.addEventListener('pointermove', e=>{ if(!down) return; el.scrollLeft = startL - (e.clientX - startX); });
  ['pointerup','pointercancel','pointerleave'].forEach(ev=> el.addEventListener(ev, ()=> down=false));
})();

// 6. Filter karya
document.querySelectorAll('.chip').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.chip').forEach(b=> b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    document.querySelectorAll('.work-card').forEach(card=>{
      card.classList.toggle('hide', f !== 'all' && card.dataset.cat !== f);
    });
  });
});

// 7. Film modal
const filmModal = document.getElementById('filmModal');
document.getElementById('playBtn').addEventListener('click', ()=> filmModal.classList.add('open'));
document.getElementById('closeFilm').addEventListener('click', ()=> filmModal.classList.remove('open'));
filmModal.addEventListener('click', e=>{ if(e.target === filmModal) filmModal.classList.remove('open'); });

// 8. Custom cursor
(function cursor(){
  const c = document.getElementById('cursor');
  document.addEventListener('mousemove', e=>{
    c.style.left = e.clientX + 'px';
    c.style.top = e.clientY + 'px';
  });
  document.querySelectorAll('a, button, .trip-card').forEach(el=>{
    el.addEventListener('mouseenter', ()=>{ c.style.width='34px'; c.style.height='34px'; });
    el.addEventListener('mouseleave', ()=>{ c.style.width='14px'; c.style.height='14px'; });
  });
})();

// 9. Form kontak (validasi native)
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const nama = document.getElementById('fNama').value.trim();
  const email = document.getElementById('fEmail').value.trim();
  const pesan = document.getElementById('fPesan').value.trim();
  const msg = document.getElementById('formMsg');
  if(!nama || !email || !pesan){
    msg.textContent = 'Mohon lengkapi semua kolom dulu ya.';
    msg.className = 'err';
    return;
  }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    msg.textContent = 'Format email belum valid.';
    msg.className = 'err';
    return;
  }
  msg.textContent = `Terima kasih, ${nama}! Pesan kamu sudah tercatat. Saya akan menghubungimu via ${email}.`;
  msg.className = 'ok';
  this.reset();
});

// 10. Back to top + active nav
document.getElementById('toTop').addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

const sections = [...document.querySelectorAll('section[id]')];
const navAs = [...document.querySelectorAll('.nav-links a')];
window.addEventListener('scroll', ()=>{
  const y = window.scrollY + 140;
  let current = sections[0]?.id;
  sections.forEach(s=>{ if(y >= s.offsetTop) current = s.id; });
  navAs.forEach(a=> a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}, {passive:true});

console.log('%cRMA Portfolio — native HTML/CSS/JS 🌿', 'color:#597928;font-weight:bold');
