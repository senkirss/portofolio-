// TURING-EDU — Game matematika Uji Turing (native JS)
// Aturan: jawab matematika -> notif pembuat (AI/Manusia) -> tebak asal -> skor -> buka portofolio
(function(){
  const gate = document.getElementById('turingGate');
  if(!gate) return;

  // Kunci body selama gerbang aktif
  document.body.classList.add('gated');

  // ---- BANK SOAL MANUSIA (buatan "Guru" — gaya hangat, angka kecil, contoh user) ----
  const humanBank = [
    { text: '1 + 1 = ?', a: 2, why: 'Gaya manusia: sangat sederhana & hangat, angka 1-digit seperti contoh gurumu.' },
    { text: '2 + 3 = ?', a: 5, why: 'Gaya manusia: penjumlahan kecil yang natural diajarkan guru.' },
    { text: '4 + 5 = ?', a: 9, why: 'Gaya manusia: angka berurutan, pola yang sering dipilih manusia.' },
    { text: '3 + 7 = ?', a: 10, why: 'Gaya manusia: hasilnya bulat (10) — manusia suka angka cantik.' },
    { text: '5 × 2 = ?', a: 10, why: 'Gaya manusia: perkalian dasar dengan hasil genap yang mudah diingat.' },
    { text: '6 + 4 = ?', a: 10, why: 'Gaya manusia: komposisi angka favorit guru untuk latihan cepat.' },
    { text: '3 × 3 = ?', a: 9, why: 'Gaya manusia: angka kembar — pola khas buatan manusia.' },
    { text: '7 + 5 = ?', a: 12, why: 'Gaya manusia: penjumlahan belasan yang ramah untuk pemula.' },
  ];

  // ---- SOAL AI (dibangkitkan prosedural ala Bot — formal, angka lebih besar/acak) ----
  function genAIQuestion(){
    const type = Math.random() < 0.5 ? 'tambah' : 'kali';
    let text, a;
    if(type === 'tambah'){
      const x = 11 + Math.floor(Math.random()*40); // 11-50
      const y = 12 + Math.floor(Math.random()*45); // 12-56
      text = `Hitung: ${x} + ${y} = ?`;
      a = x + y;
    } else {
      const x = 6 + Math.floor(Math.random()*13); // 6-18
      const y = 6 + Math.floor(Math.random()*10); // 6-15
      text = `Hitung: ${x} × ${y} = ?`;
      a = x * y;
    }
    return { text, a, why: 'Gaya AI/Bot: angka acak 2-digit, presisi, dan redaksi formal "Hitung: ...".' };
  }

  const TOTAL = 5;
  let rounds = [], idx = 0, score = 0, turingBenar = 0, mathBenar = 0;
  let mathSolved = false, guessed = false;

  const el = id => document.getElementById(id);
  const qLabel=el('turingQLabel'), qText=el('turingQuestion'), ansInput=el('turingAnswer'),
        checkBtn=el('turingCheck'), guessBox=el('turingGuessBox'), notif=el('turingNotif'),
        nextBtn=el('turingNext'), roundEl=el('turingRound'), scoreEl=el('turingScore'),
        prog=el('turingProg'), qBox=el('turingQBox'), finalBox=el('turingFinal');

  function buildRounds(){
    const humans = [...humanBank].sort(()=>Math.random()-.5).slice(0,3)
      .map(q => ({...q, source:'manusia'}));
    const ais = [genAIQuestion(), genAIQuestion()].map(q => ({...q, source:'ai'}));
    rounds = [...humans, ...ais].sort(()=>Math.random()-.5);
  }

  function render(){
    const r = rounds[idx];
    mathSolved = false; guessed = false;
    qLabel.textContent = `Soal Misteri #${idx+1} — siapa pembuatnya? 🤔`;
    qText.textContent = r.text;
    ansInput.value = ''; ansInput.disabled = false; checkBtn.disabled = false;
    guessBox.classList.add('hidden'); nextBtn.classList.add('hidden');
    notif.innerHTML = '';
    roundEl.textContent = `Ronde ${idx+1}/${TOTAL}`;
    prog.style.width = `${(idx)/TOTAL*100}%`;
    ansInput.focus();
  }

  function notify(html, cls){
    notif.innerHTML = `<div class="turing-notif ${cls}">${html}</div>`;
  }

  checkBtn.addEventListener('click', ()=>{
    if(mathSolved) return;
    const r = rounds[idx];
    const val = ansInput.value.trim();
    if(val === ''){
      notify('⚠️ Isi dulu jawaban matematikanya, baru tebak pembuatnya.', 'warn');
      return;
    }
    const benar = Number(val) === r.a;
    mathSolved = true;
    ansInput.disabled = true; checkBtn.disabled = true;
    if(benar){
      mathBenar++; score += 20;
      notify(`✅ <strong>Matematika BENAR!</strong> Jawabannya memang <strong>${r.a}</strong>.<br>Sekarang tebak: soal ini buatan siapa? 👇`, 'ok');
    } else {
      notify(`❌ Matematika kurang tepat. Kunci jawabannya <strong>${r.a}</strong> (jawabanmu: ${val}).<br>Tidak apa — lanjut tebak pembuatnya untuk bonus Turing! 👇`, 'err');
    }
    scoreEl.textContent = `Skor: ${score}`;
    guessBox.classList.remove('hidden');
  });
  ansInput.addEventListener('keydown', e=>{ if(e.key==='Enter') checkBtn.click(); });

  document.querySelectorAll('.guess-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      if(!mathSolved || guessed) return;
      if(!mathSolved){ notify('⚠️ Jawab soalnya dulu ya.', 'warn'); return; }
      guessed = true;
      const r = rounds[idx];
      const tebakan = btn.dataset.guess;
      const tepat = tebakan === r.source;
      const labelAsli = r.source === 'ai' ? '🤖 Bot Komputer (AI)' : '🧑‍🏫 Guru Sungguhan (Manusia)';
      if(tepat){ turingBenar++; score += 20; }
      scoreEl.textContent = `Skor: ${score}`;
      // NOTIFIKASI WAJIB: siapa pembuat soal
      notify(
        `${tepat ? '🎯 <strong>Tebakan Turing TEPAT!</strong>' : '🔍 <strong>Tebakan Turing meleset.</strong>'}<br>` +
        `📢 Soal ini dibuat oleh: <strong>${labelAsli}</strong><br>` +
        `<small>${r.why}</small>`,
        tepat ? 'ok' : 'info'
      );
      guessBox.classList.add('hidden');
      nextBtn.textContent = idx === TOTAL-1 ? 'Lihat Hasil →' : 'Soal Berikutnya →';
      nextBtn.classList.remove('hidden');
    });
  });

  nextBtn.addEventListener('click', ()=>{
    if(idx < TOTAL-1){ idx++; render(); }
    else finish();
  });

  function finish(){
    qBox.classList.add('hidden');
    finalBox.classList.remove('hidden');
    prog.style.width = '100%';
    el('turingFinalScore').innerHTML = `📐 Matematika benar: <strong>${mathBenar}/${TOTAL}</strong> • Skor akhir: <strong>${score}</strong>`;
    let predikat = turingBenar >= 4 ? 'Detektif Turing Andal 🕵️' : turingBenar >= 2 ? 'Cukup Jeli 👀' : 'Masih Terkecoh Bot 🤖';
    el('turingFinalTuring').innerHTML = `🔎 Tebakan asal-soal benar: <strong>${turingBenar}/${TOTAL}</strong> — ${predikat}`;
  }

  el('turingEnter').addEventListener('click', ()=>{
    gate.classList.add('open'); // buka gerbang
    document.body.classList.remove('gated');
    try{ sessionStorage.setItem('turingPassed','1'); }catch(e){}
    document.getElementById('tentang')?.scrollIntoView({behavior:'smooth'});
  });
  el('turingReplay').addEventListener('click', ()=>{
    buildRounds(); idx=0; score=0; turingBenar=0; mathBenar=0;
    scoreEl.textContent='Skor: 0';
    finalBox.classList.add('hidden'); qBox.classList.remove('hidden');
    render();
  });

  buildRounds(); render();
})();
