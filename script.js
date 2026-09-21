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

// 2. Navbar scroll + parallax hero + section atmospheres
const navbar = document.getElementById('navbar');
const heroBg = document.getElementById('heroBg');
const sectionAtmos = document.querySelectorAll('.section-atmos, .signature-atmos');
window.addEventListener('scroll', ()=>{
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  if(heroBg && window.scrollY < window.innerHeight){
    heroBg.style.transform = `translateY(${window.scrollY * 0.3}px)`;
  }
  // Section atmospheres scroll parallax
  const sy = window.scrollY;
  sectionAtmos.forEach(atmos=>{
    const section = atmos.closest('section');
    if(!section) return;
    const rect = section.getBoundingClientRect();
    const vh = window.innerHeight;
    // Only parallax when section is near viewport
    if(rect.bottom > -vh/2 && rect.top < vh*1.5){
      const progress = (vh - rect.top) / (vh + rect.height); // 0 to 1
      const depth = parseFloat(atmos.dataset.depth) || 0.015;
      const offset = (progress - 0.5) * vh * depth * 2;
      atmos.style.transform = `translateY(${offset}px) scale(1.04)`;
    }
  });
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

// 2c2. Subtle mouse parallax for section atmospheres (desktop only, very gentle)
(function sectionMouseParallax(){
  if(!window.matchMedia('(hover:hover)').matches) return;
  const atmos = document.querySelectorAll('.section-atmos, .signature-atmos');
  if(!atmos.length) return;
  let tx=0, ty=0, cx=0, cy=0;
  document.addEventListener('mousemove', e=>{
    tx = (e.clientX / window.innerWidth) - 0.5;
    ty = (e.clientY / window.innerHeight) - 0.5;
  });
  (function loop(){
    cx += (tx-cx)*0.02; // very slow lerp
    cy += (ty-cy)*0.02;
    atmos.forEach(a=>{
      const d = parseFloat(a.dataset.depth) || 0.015;
      // Very subtle movement
      a.style.transform += ` translate(${cx * d * 120}px, ${cy * d * 80}px)`;
    });
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

// 2e2. Label fase langit — sinkron dengan siklus 72 detik (Pagi→Siang→Senja→Malam)
(function skyPhase(){
  const label = document.getElementById('skyPhase');
  const icon = document.getElementById('skyIcon');
  if(!label) return;
  const CYCLE = 72;
  function tick(){
    if(document.body.classList.contains('paused')) return;
    const t = (Date.now() / 1000) % CYCLE;
    let name = 'Pagi', ic = '🌅';
    if(t >= 54){ name = 'Malam'; ic = '🌙'; }
    else if(t >= 36){ name = 'Senja'; ic = '🌇'; }
    else if(t >= 18){ name = 'Siang'; ic = '☀️'; }
    if(label.textContent !== name){
      label.textContent = name;
      if(icon) icon.textContent = ic;
    }
  }
  tick();
  setInterval(tick, 1000);
})();

// 2f. Signature animation — draw R + 5 waves + upward tail
(function signatureAnim(){
  const canvas = document.getElementById('signatureCanvas');
  const info = document.querySelector('.signature-info');
  if(!canvas || !info) return;

  const ctx = canvas.getContext('2d');
  let w=0, h=0, dpr=window.devicePixelRatio||1;
  let animated=false, progress=0, rafId=null;
  let samples = [];

  function resize(){
    const rect = canvas.parentElement.getBoundingClientRect();
    w = canvas.width = Math.floor(rect.width * dpr);
    h = canvas.height = Math.floor(rect.height * dpr);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    samples = signatureSamples();
    if(progress >= 1) draw(1);
    else if(animated) draw(progress);
  }
  window.addEventListener('resize', resize);
  resize();

  // Build smooth pen-like points: cursive R + 5 waves + upward tail,
  // smoothed with Catmull-Rom so no sharp corners (like a real pen)
  function signatureSamples(){
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    const cx = cw / 2, base = ch * 0.68;
    const s = Math.min(cw / 470, ch / 200);
    const raw = [];
    const add = (x, y) => raw.push({x: cx + x * s, y: base + y * s});

    // --- Cursive R in one flowing motion ---
    add(-152, 10); add(-150, -18); add(-147, -48); add(-142, -70);
    add(-132, -82); add(-116, -86); add(-101, -81); add(-94, -68);
    add(-97, -55); add(-108, -48); add(-122, -45); add(-130, -43);
    add(-118, -32); add(-104, -16); add(-92, 0); add(-83, 10);

    // --- connector into waves ---
    add(-72, 12); add(-62, 9);

    // --- 5 smooth sine waves ---
    const waves = 5, waveW = 27, amp = 10, x0 = -62, per = 12;
    const total = waves * per;
    for(let k = 1; k <= total; k++){
      const t = k / per; // 0..5 in wave units
      add(x0 + t * waveW, 5 + amp * Math.sin(t * Math.PI * 2 - Math.PI / 2 + 0.5));
    }

    // --- upward tail flourish ---
    const xEnd = x0 + waves * waveW;
    add(xEnd + 8, -2); add(xEnd + 18, -14);
    add(xEnd + 27, -30); add(xEnd + 34, -48); add(xEnd + 38, -64);

    // Catmull-Rom -> dense smooth samples
    const P = [raw[0], ...raw, raw[raw.length - 1]];
    const out = [];
    const perSeg = 14;
    for(let i = 1; i < P.length - 2; i++){
      const p0 = P[i-1], p1 = P[i], p2 = P[i+1], p3 = P[i+2];
      for(let j = 0; j < perSeg; j++){
        const t = j / perSeg, t2 = t * t, t3 = t2 * t;
        out.push({
          x: 0.5 * ((2*p1.x) + (-p0.x+p2.x)*t + (2*p0.x-5*p1.x+4*p2.x-p3.x)*t2 + (-p0.x+3*p1.x-3*p2.x+p3.x)*t3),
          y: 0.5 * ((2*p1.y) + (-p0.y+p2.y)*t + (2*p0.y-5*p1.y+4*p2.y-p3.y)*t2 + (-p0.y+3*p1.y-3*p2.y+p3.y)*t3)
        });
      }
    }
    out.push({...raw[raw.length - 1]});
    return out;
  }

  samples = signatureSamples();

  function draw(prog){
    const cw = canvas.width / dpr;
    const ch = canvas.height / dpr;
    ctx.clearRect(0, 0, cw, ch);
    ctx.strokeStyle = '#6E3511';
    ctx.lineWidth = 2.6;
    ctx.globalAlpha = 1;

    const n = Math.max(1, Math.floor(prog * (samples.length - 1)));
    ctx.beginPath();
    ctx.moveTo(samples[0].x, samples[0].y);
    for(let i = 1; i <= n; i++) ctx.lineTo(samples[i].x, samples[i].y);
    ctx.stroke();

    // Pen tip dot while drawing
    if(prog > 0 && prog < 1){
      const tip = samples[n];
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#91AC67';
      ctx.fill();
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(tip.x, tip.y, 10, 0, Math.PI * 2);
      ctx.fillStyle = '#91AC67';
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  function animate(){
    if(animated) return;
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting && !animated){
          animated = true;
          observer.disconnect();
          startDrawing();
        }
      });
    },{threshold:0.3});
    observer.observe(canvas.parentElement);
  }

  function startDrawing(){
    const duration = 2800; // ms
    const start = performance.now();
    function frame(now){
      const elapsed = now - start;
      progress = Math.min(1, elapsed / duration);
      // Easing
      const eased = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;
      draw(eased);
      if(progress < 1){
        rafId = requestAnimationFrame(frame);
      }else{
        // Keep final state, lalu tulis nama seperti pulpen
        draw(1);
        writeName();
        setTimeout(()=> document.getElementById('sigStamp')?.classList.add('stamped'), 2300);
      }
    }
    rafId = requestAnimationFrame(frame);
  }

  // Nama digambar bergaris (stroke) seperti tanda tangan, lalu tinta mengisi
  let fallbackTimer = null;
  function writeName(){
    if(fallbackTimer){ clearTimeout(fallbackTimer); fallbackTimer = null; }
    const wrap = document.getElementById('sigNameWrap');
    const t = document.querySelector('.sig-name-text');
    if(wrap) wrap.classList.add('visible');
    if(t){
      let len = 700;
      try{ len = t.getComputedTextLength() * 1.1; }catch(e){}
      t.style.setProperty('--len', len.toFixed(0));
      void t.getBoundingClientRect(); // reflow agar transisi berjalan
      t.classList.add('drawn');
    }
    setTimeout(()=>{
      document.getElementById('sigRole')?.classList.add('visible');
      document.getElementById('sigActions')?.classList.add('visible');
    }, 1600);
  }

  // Pengaman: paksa semua tampil bila observer global terlewat
  fallbackTimer = setTimeout(()=>{
    if(!animated) return;
    document.getElementById('sigNameWrap')?.classList.add('visible');
    document.querySelector('.sig-name-text')?.classList.add('drawn');
    document.getElementById('sigRole')?.classList.add('visible');
    document.getElementById('sigActions')?.classList.add('visible');
  }, 9000);

  // Replay: tulis ulang tanda tangan + nama dari awal
  document.getElementById('replaySignature')?.addEventListener('click', ()=>{
    if(rafId) cancelAnimationFrame(rafId);
    document.getElementById('sigStamp')?.classList.remove('stamped');
    const t = document.querySelector('.sig-name-text');
    if(t){ t.style.transition = 'none'; t.classList.remove('drawn'); void t.getBoundingClientRect(); t.style.transition = ''; }
    ['sigRole','sigActions'].forEach(id=> document.getElementById(id)?.classList.remove('visible'));
    progress = 0;
    draw(0);
    setTimeout(startDrawing, 250);
  });

  animate();
})();

// 3. Mobile menu
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', ()=>{
  mobileMenu.classList.toggle('open');
  document.getElementById('navbar')?.classList.remove('nav-hidden');
});
mobileMenu.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> mobileMenu.classList.remove('open')));

// 3b. Scroll FX — progress bar + navbar auto-hide + content parallax antar-slide
(function scrollFX(){
  const bar = document.getElementById('scrollProgress');
  const nav = document.getElementById('navbar');
  const menu = document.getElementById('mobileMenu');
  const secs = [...document.querySelectorAll('main section')].filter(s=> s.id !== 'hero');
  let lastY = window.scrollY;
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY;
    const vh = window.innerHeight;
    const max = document.documentElement.scrollHeight - vh;
    if(bar) bar.style.width = (max > 0 ? (y / max * 100).toFixed(2) : 0) + '%';
    // Navbar sembunyi saat scroll ke bawah, muncul saat ke atas
    if(nav && menu && !menu.classList.contains('open')){
      if(y > 320 && y > lastY + 4) nav.classList.add('nav-hidden');
      else if(y < lastY - 4 || y <= 320) nav.classList.remove('nav-hidden');
    }
    lastY = y;
    // Parallax isi konten — tiap slide melayang berlapis (maks ±26px)
    secs.forEach(sec=>{
      const r = sec.getBoundingClientRect();
      if(r.bottom < -200 || r.top > vh + 200) return;
      const off = (r.top + r.height / 2 - vh / 2) * -0.035;
      sec.style.setProperty('--px', Math.max(-26, Math.min(26, off)).toFixed(1) + 'px');
    });
  }, {passive:true});
})();

// 4. Reveal on scroll — with stagger for cinematic feel
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el = e.target;
      el.classList.add('visible');
      // Stagger children with .reveal
      const children = el.querySelectorAll('.reveal:not(.visible)');
      children.forEach((child, i)=>{
        child.style.transitionDelay = `${i * 80}ms`;
        child.classList.add('visible');
        // clean delay after animation
        setTimeout(()=> child.style.transitionDelay = '', 1000 + i * 80);
      });
      // skill bars
      if(el.classList.contains('skill')){
        const f = el.querySelector('.fill');
        if(f) f.style.width = f.dataset.w;
      }
      // counters
      const c = el.querySelector?.('.counter');
      if(c && !c.dataset.done) animateCount(c);
      if(el.classList.contains('counter') && !el.dataset.done) animateCount(el);
    }
  });
},{threshold:0.12, rootMargin:'0px 0px -50px 0px'});
document.querySelectorAll('.reveal, .reveal-img, .skill, .stat').forEach(el=> io.observe(el));

// Also observe section containers for stagger
const sectionIO = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('section-visible');
    }
  });
},{threshold:0.08});
document.querySelectorAll('main section').forEach(s=> sectionIO.observe(s));

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

// 5. REEL sinematik — drag inertia + snap + progress + prev/next (Data Diri)
(function reel(){
  const el = document.getElementById('hScroll');
  const vp = document.getElementById('reelViewport');
  const prog = document.getElementById('reelProg');
  const curEl = document.getElementById('reelCurrent');
  const prev = document.getElementById('reelPrev');
  const next = document.getElementById('reelNext');
  if(!el) return;
  const cards = [...el.querySelectorAll('.trip-card')];

  // progress + active
  function update(){
    const max = el.scrollWidth - el.clientWidth;
    const p = max>0 ? el.scrollLeft / max : 0;
    if(prog) prog.style.width = (p*100).toFixed(2)+'%';
    // active = kartu paling tengah di viewport
    const c = el.getBoundingClientRect().left + el.clientWidth/2;
    let best=null, bestDist=Infinity, idx=0;
    cards.forEach((card,i)=>{
      const r = card.getBoundingClientRect();
      const mid = r.left + r.width/2;
      const d = Math.abs(mid - c);
      if(d < bestDist){ bestDist=d; best=card; idx=i; }
    });
    cards.forEach(c=> c.classList.toggle('active', c===best));
    if(curEl) curEl.textContent = String(idx+1).padStart(2,'0');
    if(prev) prev.disabled = el.scrollLeft < 8;
    if(next) next.disabled = el.scrollLeft > max - 8;
    // fade edges
    const leftF = document.querySelector('.reel-fade.left');
    const rightF = document.querySelector('.reel-fade.right');
    if(leftF) leftF.style.opacity = el.scrollLeft < 10 ? '0' : '1';
    if(rightF) rightF.style.opacity = el.scrollLeft > max-10 ? '0' : '1';
  }
  el.addEventListener('scroll', update, {passive:true});
  window.addEventListener('resize', update);
  update();

  // prev/next cinematic snap
  function go(dir){
    const w = cards[0].offsetWidth + 22;
    el.scrollBy({left: w*dir, behavior:'smooth'});
  }
  prev?.addEventListener('click', ()=> go(-1));
  next?.addEventListener('click', ()=> go(1));

  // wheel → horizontal (sinematik)
  el.addEventListener('wheel', e=>{
    if(Math.abs(e.deltaX) < Math.abs(e.deltaY)){
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, {passive:false});

  // drag inertia
  let down=false, startX=0, startL=0, vel=0, lastX=0, lastT=0, raf=null;
  el.addEventListener('pointerdown', e=>{
    down=true; vp?.classList.add('dragging');
    startX=e.clientX; startL=el.scrollLeft;
    vel=0; lastX=e.clientX; lastT=performance.now();
    el.setPointerCapture(e.pointerId);
    if(raf) cancelAnimationFrame(raf);
  });
  el.addEventListener('pointermove', e=>{
    if(!down) return;
    const dx = e.clientX - startX;
    el.scrollLeft = startL - dx;
    const now=performance.now(), dt=now-lastT;
    if(dt>0) vel = (e.clientX - lastX)/dt;
    lastX=e.clientX; lastT=now;
  });
  function stop(){
    if(!down) return;
    down=false; vp?.classList.remove('dragging');
    // inertia
    let v = vel*14; // amplify
    (function inertia(){
      if(Math.abs(v) < 0.3) return;
      el.scrollLeft -= v;
      v *= 0.92;
      raf = requestAnimationFrame(inertia);
    })();
  }
  ['pointerup','pointercancel','pointerleave'].forEach(ev=> el.addEventListener(ev, stop));

  // keyboard
  el.setAttribute('tabindex','0');
  el.addEventListener('keydown', e=>{
    if(e.key==='ArrowRight') { e.preventDefault(); go(1); }
    if(e.key==='ArrowLeft') { e.preventDefault(); go(-1); }
  });
})();

// 5b. REEL sinematik — Pendidikan (sama seperti Data Diri)
(function eduReel(){
  const el = document.getElementById('eduScroll');
  const vp = document.getElementById('eduViewport');
  const prog = document.getElementById('eduProg');
  const curEl = document.getElementById('eduCurrent');
  const prev = document.getElementById('eduPrev');
  const next = document.getElementById('eduNext');
  if(!el) return;
  const cards = [...el.querySelectorAll('.trip-card')];

  function update(){
    const max = el.scrollWidth - el.clientWidth;
    const p = max>0 ? el.scrollLeft / max : 0;
    if(prog) prog.style.width = (p*100).toFixed(2)+'%';
    const c = el.getBoundingClientRect().left + el.clientWidth/2;
    let best=null, bestDist=Infinity, idx=0;
    cards.forEach((card,i)=>{
      const r = card.getBoundingClientRect();
      const mid = r.left + r.width/2;
      const d = Math.abs(mid - c);
      if(d < bestDist){ bestDist=d; best=card; idx=i; }
    });
    cards.forEach(c=> c.classList.toggle('active', c===best));
    if(curEl) curEl.textContent = String(idx+1).padStart(2,'0');
    if(prev) prev.disabled = el.scrollLeft < 8;
    if(next) next.disabled = el.scrollLeft > max - 8;
    const leftF = document.querySelector('#eduViewport .reel-fade.left');
    const rightF = document.querySelector('#eduViewport .reel-fade.right');
    if(leftF) leftF.style.opacity = el.scrollLeft < 10 ? '0' : '1';
    if(rightF) rightF.style.opacity = el.scrollLeft > max-10 ? '0' : '1';
  }
  el.addEventListener('scroll', update, {passive:true});
  window.addEventListener('resize', update);
  update();

  function go(dir){
    const w = cards[0].offsetWidth + 22;
    el.scrollBy({left: w*dir, behavior:'smooth'});
  }
  prev?.addEventListener('click', ()=> go(-1));
  next?.addEventListener('click', ()=> go(1));

  el.addEventListener('wheel', e=>{
    if(Math.abs(e.deltaX) < Math.abs(e.deltaY)){
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    }
  }, {passive:false});

  let down=false, startX=0, startL=0, vel=0, lastX=0, lastT=0, raf=null;
  el.addEventListener('pointerdown', e=>{
    down=true; vp?.classList.add('dragging');
    startX=e.clientX; startL=el.scrollLeft;
    vel=0; lastX=e.clientX; lastT=performance.now();
    el.setPointerCapture(e.pointerId);
    if(raf) cancelAnimationFrame(raf);
  });
  el.addEventListener('pointermove', e=>{
    if(!down) return;
    const dx = e.clientX - startX;
    el.scrollLeft = startL - dx;
    const now=performance.now(), dt=now-lastT;
    if(dt>0) vel = (e.clientX - lastX)/dt;
    lastX=e.clientX; lastT=now;
  });
  function stop(){
    if(!down) return;
    down=false; vp?.classList.remove('dragging');
    let v = vel*14;
    (function inertia(){
      if(Math.abs(v) < 0.3) return;
      el.scrollLeft -= v;
      v *= 0.92;
      raf = requestAnimationFrame(inertia);
    })();
  }
  ['pointerup','pointercancel','pointerleave'].forEach(ev=> el.addEventListener(ev, stop));

  el.setAttribute('tabindex','0');
  el.addEventListener('keydown', e=>{
    if(e.key==='ArrowRight') { e.preventDefault(); go(1); }
    if(e.key==='ArrowLeft') { e.preventDefault(); go(-1); }
  });
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

// 9. Form kontak (WhatsApp Deep Link — works offline & online)
(function contactForm(){
  const form = document.getElementById('contactForm');
  const msg = document.getElementById('formMsg');
  const btn = form.querySelector('.btn-submit');
  if(!form) return;

  // Floating label behavior
  form.querySelectorAll('input, textarea').forEach(el=>{
    el.addEventListener('blur', ()=> el.classList.toggle('has-value', el.value.trim() !== ''));
    if(el.value.trim() !== '') el.classList.add('has-value');
  });

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const nama = form.querySelector('#fNama').value.trim();
    const kontak = form.querySelector('#fEmail').value.trim();
    const pesan = form.querySelector('#fPesan').value.trim();

    if(!nama || !kontak || !pesan){
      msg.textContent = 'Mohon lengkapi semua kolom dulu ya.';
      msg.className = 'form-message err';
      shakeForm();
      return;
    }

    // Loading state
    btn.classList.add('sending');
    btn.disabled = true;
    msg.textContent = 'Menyiapkan WhatsApp...';
    msg.className = 'form-message sending';

    // Build WhatsApp deep link
    const phone = '6285212114058'; // 085212114058 -> 6285212114058
    const text = `Halo, saya ${nama} (${kontak})\n\n${pesan}`;
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

    // Small delay for UX then open
    setTimeout(()=>{
      window.open(url, '_blank', 'noopener,noreferrer');
      msg.textContent = `WhatsApp dibuka — pesan siap dikirim ke 0852-1211-4058 ✨`;
      msg.className = 'form-message ok';
      confettiBurst(btn);
      form.reset();
      form.querySelectorAll('input, textarea').forEach(el=> el.classList.remove('has-value'));
      btn.classList.remove('sending');
      btn.disabled = false;
    }, 600);
  });

  function shakeForm(){
    form.style.animation = 'shake .4s cubic-bezier(.36,.07,.19,.97)';
    setTimeout(()=> form.style.animation = '', 400);
  }
  function confettiBurst(el){
    const colors = ['#6E3511','#91AC67','#597928','#FCECD8'];
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    for(let i=0;i<18;i++){
      const p = document.createElement('div');
      p.style.cssText = `position:fixed;left:${cx}px;top:${cy}px;width:8px;height:8px;border-radius:50%;background:${colors[Math.floor(Math.random()*colors.length)]};pointer-events:none;z-index:9999;transform:translate(-50%,-50%)`;
      document.body.appendChild(p);
      const angle = (Math.PI*2*i)/18;
      const dist = 80 + Math.random()*60;
      const tx = Math.cos(angle)*dist;
      const ty = Math.sin(angle)*dist - 40;
      p.animate([{opacity:1,transform:`translate(-50%,-50%)`},{opacity:0,transform:`translate(${tx-50}%,${ty-50}%)`}],{duration:700,easing:'cubic-bezier(.16,1,.3,1)'}).onfinish=()=>p.remove();
    }
  }
})();

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

