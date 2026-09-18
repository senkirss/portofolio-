# PRD — Portofolio RMA + Gerbang Game “Turing-Edu”

| Field | Isi |
|---|---|
| **Nama Produk** | Portofolio Rasendriya Muhammad Adisanto — edisi White Desert + Turing-Edu Gate |
| **Pemilik** | Rasendriya Muhammad Adisanto |
| **Kelas** | 1CC5 (CCIT-FTUI) |
| **Alamat** | Perumahan Casamora, Jagakarsa, Jakarta Selatan (6°18′ S — 106°49′ E) |
| **Riwayat** | 1. MAN 13 Jakarta Selatan → 2. CCIT-FTUI → 3. Kelas 1CC5 |
| **Versi Dokumen** | 1.0 — 17 Sep 2026 |
| **Stack** | Native murni: `HTML + CSS + JS` (tanpa framework/build step) |
| **File** | `index.html` (418 baris) · `style.css` · `script.js` (230 baris) · `turing-edu.js` (148 baris) |
| **Referensi desain** | https://white-desert.com (luxury fullscreen hero, serif besar, kartu ekspedisi, narasi tenang) |
| **Referensi tugas** | Gambar “Tugas Mandiri: Merancang Cetak Biru Turing-Edu” — wireframe game matematika + misteri Uji Turing |

---

## 1. Ringkasan Eksekutif

Website ini punya **dua lapis**:

1. **Lapis 1 — Gerbang Turing-Edu (wajib):** game matematika penjumlahan & perkalian 5 ronde. Setiap ronde pemain (a) menjawab soal, (b) langsung menerima **notifikasi siapa pembuat soal — 🤖 Bot Komputer (AI) atau 🧑‍🏫 Guru Sungguhan (Manusia)**, (c) menebak asal soal untuk bonus Turing. Lolos 5 ronde → tombol **“Masuk Portofolio”** terbuka.
2. **Lapis 2 — Portofolio White-Desert style:** hero alam fullscreen yang hidup/bergerak, profil data diri, basecamp pendidikan & skill, galeri karya, timeline perjalanan (MAN 13 → CCIT-FTUI → 1CC5), dan form kontak.

Seluruhnya native agar ringan, mudah dikumpulkan sebagai tugas, dan mudah dijelaskan ke dosen (setiap baris bisa ditunjuk).

---

## 2. Tujuan & Objektif

### 2.1 Tujuan tugas (dari gambar soal)
- **Objektif:** merancang konsep antarmuka (wireframe) game edukasi matematika yang menggabungkan misteri Uji Turing.
- **Mekanika wajib:** pemain menyelesaikan soal; di akhir level pemain wajib menebak *“Apakah soal ini disusun oleh Bot Komputer (Mesin) atau Guru Sungguhan (Manusia)?”*
- **Output diharapkan:** 1 halaman sketsa wireframe UI + 1 paragraf penjelasan mekanisme umpan balik → keduanya sudah diwujudkan sebagai gerbang playable + paragraf `.turing-feedback-info` di bawah arena.

### 2.2 Tujuan portofolio
- Menampilkan identitas: nama, kelas 1CC5, alamat Casamora Jagakarsa, lulusan MAN 13 Jakarta Selatan, kini CCIT-FTUI.
- Menunjukkan skill HTML/CSS/JS native lewat website itu sendiri (dogfooding).
- Estetika premium ala White Desert dengan palet earthy.

---

## 3. Target Pengguna & Persona

| Persona | Kebutuhan | Skenario |
|---|---|---|
| **Dosen / Asesor** | Menilai tugas Turing-Edu + kerapian portofolio | Buka `index.html` → main 5 ronde (±2 menit) → baca notifikasi AI/Manusia → masuk portofolio → nilai |
| **Teman / Rekruter kampus** | Kenalan cepat + lihat karya | Lewati gerbang sekali, scroll hero → profil → karya → kontak |
| **Pemilik (Rasendriya)** | Media presentasi diri | Tunjukkan perjalanan MAN 13 → CCIT-FTUI → 1CC5 |

---

## 4. Ruang Lingkup

### In-scope
- Gerbang game 5 ronde (soal manusia tetap + soal AI prosedural), notifikasi pembuat, tebakan Turing, skor, replay, buka portofolio.
- Portofolio satu halaman: nav, hero hidup, marquee, tentang, data-diri horizontal, quote, pendidikan+skillbar, karya+filter, perjalanan timeline, kontak+validasi, footer, preloader, cursor, reveal-on-scroll, mobile menu.
- Responsif (desktop ≥900px, tablet, HP ≤560px), akses keyboard dasar (Enter untuk jawab).

### Out-of-scope (eksplisit tidak dibuat)
- Backend / database / login / penyimpanan nilai permanen (skor hanya di memori + `sessionStorage` flag lolos).
- AI eksternal/API — “AI” di sini disimulasikan oleh generator soal prosedural di `turing-edu.js`.
- Video buatan sendiri (memakai stok Mixkit/Pixabay + fallback foto Unsplash).

---

## 5. Identitas Visual & Desain

### 5.1 Palet (wajib sesuai permintaan)
| Token | Hex | Peran |
|---|---|---|
| `--brown` | `#6E3511` | Tombol, judul serif, aksen utama |
| `--brown-dark` | `#3E200A` | Latar gelap (Data Diri, Perjalanan, footer, arena Turing) |
| `--sage` | `#91AC67` | Highlight, progress, mist, kursor |
| `--olive` / `--olive-dark` | `#597928` / `#3f5a1c` | Label, marquee, gradien skillbar |
| `--cream` / `--cream-light` | `#FCECD8` / `#FFF8EE` | Latar terang, teks di atas gelap |

### 5.2 Tipografi
- Serif display: **Fraunces** (Google Fonts) — judul raksasa hero, quote, judul section. Berat 300–600 + italic.
- Sans body: **Manrope** 400–700 — navigasi, kartu, form.
- Gaya White Desert yang ditiru: eyebrow tracking lebar (`.35em`), judul `clamp(3rem,10vw,7.5rem)`, koordinat kecil di sudut hero, tombol pil (border-radius 100px).

### 5.3 Prinsip layout
- Hero selalu 100vh, konten di tengah, kabut di depan, teks di atas (`z-index` berlapis).
- Section bergantian terang/gelap: cream → dark → cream → sage → dark → cream (ritme napas).
- Kartu: radius 18–26px, bayangan lembut `rgba(110,53,17,.1)`, hover naik 6–8px.

---

## 6. Arsitektur File

```
contoh coy/
├── index.html      # struktur: gerbang Turing + nav + 7 section + footer + 2x <script>
├── style.css       # token, nav, hero living-bg, marquee, section, kartu, timeline, form, footer, gate, responsif
├── script.js       # preloader, nav, hero video/parallax/partikel, reveal, counter, drag-scroll, filter, modal, cursor, form, toTop
└── turing-edu.js   # bank soal manusia, generator AI, ronde, skor, notifikasi, final, gerbang
```

Dependensi eksternal (CDN, runtime saja — bukan framework):
- Google Fonts (Fraunces + Manrope).
- Gambar: `images.unsplash.com` (hero, duo, kartu, karya).
- Video hero: `assets.mixkit.co/...529-large.mp4` (primer) + `cdn.pixabay.com/...40130...large.mp4` (cadangan) + `poster` Unsplash.

Cara jalan: double-click `index.html` — tanpa server, tanpa build.

---

## 7. Spesifikasi Fitur per Modul

### F1 — Gerbang Turing-Edu (`#turingGate`, `turing-edu.js`)
**Tujuan:** memenuhi tugas + mengunci portofolio sampai 5 ronde selesai.

**Komponen UI:**
- `.turing-card`: header (kicker + H2 + deskripsi) + 2 kolom (`.turing-info` | `.turing-arena`).
- Info kiri: Objektif, Mekanika Wajib (3 langkah), Output, legenda pil AI/Manusia.
- Arena kanan (`.turing-arena`, latar `brown-dark`): bar atas (`#turingRound`, `#turingProg`, `#turingScore`), `#turingQBox` (label misteri, `#turingQuestion` serif besar, input `#turingAnswer` + `#turingCheck`), `#turingGuessBox` (2 tombol `.guess-btn[data-guess=ai|manusia]`), `#turingNotif`, `#turingNext`, `#turingFinal` (skor, predikat, `#turingEnter`, `#turingReplay`), + paragraf mekanisme umpan balik.

**Data soal:**
- `humanBank` (8 entri, diambil acak 3 per sesi): contoh persis milik user `1+1`, `2+3` plus `4+5`, `3+7`, `5×2`, `6+4`, `3×3`, `7+5`. Masing-masing punya `text`, `a` (jawaban), `why` (alasan gaya manusia: angka 1-digit, hasil bulat, pola kembar/berurutan).
- `genAIQuestion()` (2 per sesi): 50% tambah (`11–50 + 12–56`), 50% kali (`6–18 × 6–15`), redaksi formal `“Hitung: X + Y = ?”`, `why` gaya bot (acak 2-digit, presisi).
- `buildRounds()`: 3 manusia + 2 AI → shuffle → 5 ronde. Menjamin kedua sumber selalu muncul.

**Alur status per ronde** (`mathSolved`, `guessed`):
1. `render()` — reset input, sembunyikan tebak/lanjut, fokus input.
2. Klik Jawab / Enter → validasi kosong → bandingkan `Number(val)===r.a` → benar +20 (`mathBenar++`), salah tampilkan kunci → buka `guessBox`.
3. Klik Bot/Guru → bandingkan dengan `r.source` → tepat +20 (`turingBenar++`) → **notifikasi wajib** `📢 Soal ini dibuat oleh: 🤖/🧑‍🏫 + <small>why</small>` (kelas `ok`/`info`) → sembunyikan tebak → tampilkan Next.
4. Next → ronde berikut / `finish()` di ronde 5.
5. `finish()` — sembunyikan soal, tampilkan `#turingFinal`: `mathBenar/5`, `score`, `turingBenar/5` + predikat (≥4 Detektif Andal 🕵️ / ≥2 Cukup Jeli 👀 / else Terkecoh Bot 🤖).
6. **Masuk Portofolio** → `#turingGate.open` (fade), `body.gated` dilepas, `sessionStorage.turingPassed=1`, scroll ke `#tentang`. **Main Lagi** → reset semua & acak ulang.

**Skor:** maks 200 (5×20 matematika + 5×20 Turing). Tidak ada syarat nilai minimum — syarat buka adalah menyelesaikan 5 ronde (keputusan desain agar dosen tidak terkunci).

**Kunci akses:** `body.gated{overflow:hidden}` + gate `z-index:500` fullscreen menutup seluruh portofolio.

### F2 — Hero Living Background (`#hero`, `#heroBg`)
Lapisan dari belakang ke depan: `img#heroImg` → `video.hero-video` → `.hero-overlay` → `.sun-glow` → `.mist-a/b/c` → `canvas#particles` → `.hero-grain` → `.hero-vignette` → teks (`z-index:10`).
- Foto: animasi `kenburns` 28s alternate infinite (selalu gerak meski offline).
- Video: `autoplay muted loop playsinline`, fade-in via kelas `.loaded` (event `canplay`/`loadeddata` + fallback timeout 4s), animasi kenburns reverse 32s, opacity .85.
- Kabut: 3 radial-gradient berblur, durasi 26/34/42s arah berlawanan.
- Sun-glow: radial cream, pulse 9s.
- Partikel (`script.js` §2d): 70 (desktop) / 35 (HP) kunang-kunang canvas — warna cream/sage/putih, melayang naik + sinus, twinkle alpha, glow `shadowBlur:8`. Pause saat `body.paused`.
- Parallax: scroll (`translateY(scrollY*.3)` pada `#heroBg`) + mouse (`data-depth` .02/.04/.06, lerp .05, teks berlawanan −18/−14px, hanya `hover:hover`).
- Kontrol: `#motionToggle` (❚❚/▶ Latar) — toggle `body.paused` (freeze semua animasi CSS) + pause/play video.
- Aksesibilitas gerak: `prefers-reduced-motion:reduce` mematikan semua animasi hero.
- Teks: top-label, eyebrow “Halo, saya”, H1 dua baris (RASENDRIYA + italic Muhammad Adisanto), sub, CTA (Lihat Karya + Hubungi Saya), bottom (koordinat Jagakarsa | scroll-hint | MAN 13 + motion toggle).

### F3 — Navigasi
`#navbar` fixed: brand `RMA.` + 5 link (Tentang/Profil/Pendidikan/Karya/Perjalanan) + CTA Hubungi Saya + `#burger`. `.scrolled` (>60px) → latar cream blur + teks brown. Active-link跟踪 via scroll. `#mobileMenu` fullscreen brown-dark.

### F4 — Tentang (`#tentang`)
Split 2 kolom: kiri label `01` + big-serif; kanan lead (nama/kelas/alamat/MAN 13) + paragraf White-Desert + 3 `.stat` (counter animasi 13 & 5 + statis 1CC5) + link-arrow. Bawah: `.img-duo` (1.4fr/1fr, tall −40px offset).

### F5 — Data Diri (`#data-diri`, dark)
Header + `.h-scroll` (snap-x, scrollbar hidden, **drag-to-scroll** pointer events): 4 `.trip-card` (Nama/Kelas 1CC5/Casamora/MAN 13) masing-masing foto + tag + H3 serif + meta pil. Hint geser.

### F6 — Quote
`.quote-section`: tanda petik sage 5rem + blockquote serif + cite — manifesto pemilik.

### F7 — Pendidikan & Skill (`#pendidikan`)
3 `.camp-card` ala “Our Camps” (MAN 13 / Kelas 1CC5 / HTML·CSS·JS + coord) + `.skills` 2×2 bar (HTML 90, CSS 85, JS 75, UI 80) — `.fill[data-w]` terisi saat reveal.

### F8 — Karya (`#karya`, sage)
Filter chips (Semua/Web/Desain/Tugas) → toggle `.hide` pada 6 `.work-card[data-cat]`.

### F9 — Perjalanan (`#perjalanan`, dark) — sesuai revisi user
Kiri: H2 “Dari MAN 13, Menuju lebih jauh.” + `.route` 3 titik (01 MAN 13 Jakarta — Titik Awal / 02 CCIT-FTUI — Pendalaman IT / 03 Kelas 1CC5 — Sekarang). Kanan: `.timeline` 3 `.t-item` (01-Awal MAN 13 / 02-Lanjutan CCIT-FTUI / 03-Kini 1CC5 + narasi) + `.fact-box` olive 3 sel (Tahap 01/02/03).

### F10 — Kontak (`#kontak`)
Split: kiri info + `.contact-list` (Nama/Alamat/Pendidikan MAN 13 → 1CC5); kanan `#contactForm` (nama/email/pesan, `novalidate`, validasi manual: wajib isi + regex email, pesan `#formMsg.ok/.err`, reset setelah sukses).

### F11 — Footer
`.foot-grid` 4 kolom (brand+deskripsi / Navigasi / Profil / Palet 4 dot + hex) + `.foot-bottom` (© 2026 + `#toTop`).

### F12 — Utilitas global (`script.js`)
Preloader % acak + bar (§1), reveal IntersectionObserver `.15` (§4) + counter, custom cursor dot multiply (§8, nonaktif di touch), film modal (§7), back-to-top (§10). Log console hijau olive.

---

## 8. User Flow Utama

```
Buka index.html
  → [GATE] baca objektif → Ronde 1..5: isi jawaban → Enter/Jawab
      → notif benar/salah + kunci → tebak Bot/Guru
      → notif 📢 pembuat (AI/Manusia + alasan) + tepat/meleset → Next
  → Final: skor + predikat → [Masuk Portofolio] → gate fade
  → Hero (video+kabut+partikel) → scroll: Tentang → Data Diri (drag)
  → Quote → Pendidikan (bar terisi) → Karya (filter) → Perjalanan → Kontak (kirim) → Footer
  → (opsional) Main Lagi = reload gerbang via replay
```

---

## 9. Mekanisme Umpan Balik (paragraf output tugas)

> Setiap jawaban matematika langsung memicu notifikasi ganda — (1) benar/salah matematis beserta kunci jawaban, dan (2) identitas pembuat soal (AI/Manusia) beserta alasannya (gaya bahasa & pola angka); tebakan asal-soal lalu dinilai tepat/salah untuk melatih literasi Turing, dan skor akhir membuka akses portofolio.

Implementasi: `#turingNotif` 4 varian (`.ok` hijau benar, `.err` merah salah, `.warn` kuning kosong, `.info` biru reveal-Turing) + animasi `pop`, + progress bar + skor live + predikat akhir.

---

## 10. Spesifikasi Teknis

| Aspek | Detail |
|---|---|
| Bahasa | HTML5 semantik (`header/main/section/article/form/footer`), CSS3 custom (tanpa framework), JS ES6 IIFE, Canvas 2D |
| Responsif | Breakpoint 900px (split→1 kol, camp/work→2 kol, nav→burger) & 560px (1 kol semua) |
| Browser | Chrome/Edge/Firefox/Safari modern; video butuh internet, sisanya offline-safe |
| Performa | Gambar `w=800–2000` Unsplash terkompresi; video lazy `preload=auto` + poster; partikel dibatasi; animasi `transform/opacity` saja |
| Aksesibilitas | `aria-label` burger, fokus input otomatis per ronde, kontras cream-on-brown, tombol ≥44px (kecuali pil kecil), `prefers-reduced-motion` |
| Penyimpanan | Hanya `sessionStorage.turingPassed` (flag non-kritis) |
| Keamanan | Tanpa backend; form tidak mengirim ke mana pun (simulasi `reset()` + pesan); tanpa `innerHTML` dari input user (hanya angka dibandingkan) |

---

## 11. Kriteria Penerimaan (Acceptance Criteria)

- [ ] Buka `index.html` → gerbang menutup seluruh layar, body tidak bisa scroll.
- [ ] 5 ronde selalu berisi ≥1 soal manusia DAN ≥1 soal AI (jaminan `buildRounds`).
- [ ] Contoh user muncul: pool manusia memuat `1+1` dan `2+3`.
- [ ] Setiap klik Jawab → notifikasi matematika + kunci; setiap klik Bot/Guru → notifikasi 📢 AI/Manusia + alasan + tepat/meleset.
- [ ] Selesai 5 ronde → skor/predikat tampil → Masuk Portofolio membuka (fade) + scroll ke Tentang.
- [ ] Hero: video/kabut/partikel bergerak; tombol Latar menjeda; tanpa internet foto tetap Ken Burns.
- [ ] Drag kartu Data Diri, filter Karya, bar skill terisi, form validasi, mobile menu, toTop — semua berfungsi.
- [ ] Palet persis `#6E3511 #91AC67 #597928 #FCECD8`; data diri (nama/kelas/alamat/MAN 13/CCIT/1CC5) tampil konsisten di Tentang, Data Diri, Perjalanan, Kontak, footer.

---

## 12. Risiko & Mitigasi

| Risiko | Dampak | Mitigasi terpasang |
|---|---|---|
| Video Mixkit/Pixabay 404 / offline | Hero hitam | Poster Unsplash + foto Ken Burns di bawah video; `setTimeout(show,4000)` |
| Unsplash lambat | Layout kosong | Latar `brown-dark` + overlay gradien; `object-fit:cover` |
| Dosen terkunci gerbang | Tidak bisa nilai | Syarat buka = selesaikan (bukan nilai minimum); ada Main Lagi |
| Spam form | — | Validasi wajib + regex; tanpa pengiriman nyata |
| Motion sickness | Tidak nyaman | Tombol jeda Latar + `prefers-reduced-motion` |

---

## 13. Rencana Pengembangan (nice-to-have)

1. Timer per soal + nyawa + level kesulitan (1-digit → 2-digit → campuran).
2. Soal manusia bergaya cerita (“Kamu punya 2 apel…”) agar Turing makin menantang.
3. Simpan skor terbaik di `localStorage` + papan peringkat lokal.
4. Ganti video stok dengan `hero.mp4` milik sendiri; tambah `poster` lokal.
5. Mode “Lihat portofolio langsung” ber-PIN untuk presentasi cepat.
6. i18n ID/EN toggle + metadata Open Graph + favicon RMA.

---

## 14. Cara Menjalankan & Mempresentasikan

1. Buka folder `contoh coy`, double-click `index.html`.
2. Mainkan gerbang: jawab `1+1=2`, `2+3=5` saat muncul → perhatikan notifikasi 🧑‍🏫; saat `Hitung: …` perhatikan notifikasi 🤖 → tebak → Next ×5 → Masuk Portofolio.
3. Tunjukkan ke dosen: paragraf umpan balik di bawah arena (= output 1 paragraf), arena itu sendiri (= 1 halaman wireframe hidup).
4. Scroll portofolio sambil sebutkan kaitan White Desert per section.

---

## 15. Lampiran: peta ID penting (untuk demo kode)

`#turingGate #turingQBox #turingQuestion #turingAnswer #turingCheck #turingGuessBox .guess-btn #turingNotif #turingNext #turingFinal #turingEnter` · `#hero #heroBg #heroImg .hero-video .mist-a/b/c #particles #motionToggle` · `#hScroll .trip-card` · `.camp-card .fill` · `#workGrid .work-card .chip` · `.timeline .t-item .fact-box` · `#contactForm #formMsg` · `#preloader #burger #mobileMenu #toTop`
