-- ============================================================
-- data.sql — Database untuk landing page portofolio
-- Pemilik : Rasendriya Muhammad Adisanto (1CC5, CCIT-FTUI)
-- Cara pakai: mysql -u root -p < data.sql
-- ============================================================

CREATE DATABASE IF NOT EXISTS portofolio_rma
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE portofolio_rma;

-- ------------------------------------------------------------
-- 1. Profil pemilik (section Tentang + Kontak + Footer)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profile (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nama        VARCHAR(100) NOT NULL,
  nama_pendek VARCHAR(50)  NOT NULL,
  kelas       VARCHAR(20)  NOT NULL,
  alamat      VARCHAR(150) NOT NULL,
  pendidikan  VARCHAR(150) NOT NULL,
  whatsapp    VARCHAR(20)  NOT NULL,
  email       VARCHAR(100) NOT NULL,
  github      VARCHAR(150) NOT NULL,
  quote       TEXT         NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO profile (nama, nama_pendek, kelas, alamat, pendidikan, whatsapp, email, github, quote) VALUES
('Rasendriya Muhammad Adisanto', 'Rasen', '1CC5',
 'Perumahan Casamora, Jagakarsa, Jakarta Selatan',
 'MAN 13 Jakarta Selatan → CCIT-FTUI (1CC5)',
 '0852-1211-4058', 'sendriya072@gmail.com', 'https://github.com/senkirss',
 'Ketenangan bukan berarti diam. Ia adalah cara saya mendengar dunia lebih jernih, lalu bergerak dengan yakin.');

-- ------------------------------------------------------------
-- 2. Kartu Data Diri / Profil Singkat (section #data-diri)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS profile_cards (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  urutan      INT NOT NULL,
  tag         VARCHAR(50)  NOT NULL,
  judul       VARCHAR(100) NOT NULL,
  deskripsi   VARCHAR(255) NOT NULL,
  meta        VARCHAR(100) NOT NULL,
  gambar      VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO profile_cards (urutan, tag, judul, deskripsi, meta, gambar) VALUES
(1, 'Identitas', 'Nama Lengkap', 'Rasendriya Muhammad Adisanto', '1CC5 • Mahasiswa', 'assets/rasen.jpeg'),
(2, 'Akademik', 'Kelas 1CC5', 'Fokus pada dasar komputasi, kolaborasi, dan disiplin belajar.', 'Aktif • Semester Awal', 'assets/open ccit.jpeg'),
(3, 'Domisili', 'Casamora Jagakarsa', 'Perumahan Casamora, Jagakarsa, Jakarta Selatan.', '6°18'' S, 106°49'' E', 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop'),
(4, 'Pendidikan Terakhir', 'MAN 13 Jakarta Selatan', 'Madrasah Aliyah Negeri 13 Jakarta Selatan — fondasi akademik & karakter.', 'Alumni • Lulus', 'assets/MAN 13 JAKARTA.jpg');

-- ------------------------------------------------------------
-- 3. Pendidikan / Basecamp (section #pendidikan)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS education (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  urutan      INT NOT NULL,
  tag         VARCHAR(50)  NOT NULL,
  institusi   VARCHAR(100) NOT NULL,
  deskripsi   VARCHAR(255) NOT NULL,
  status      VARCHAR(100) NOT NULL,
  gambar      VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO education (urutan, tag, institusi, deskripsi, status, gambar) VALUES
(1, 'Pendidikan Terakhir', 'MAN 13 Jakarta Selatan', 'Pendidikan menengah — disiplin, nilai agama, dan akademik yang seimbang.', 'Alumni • Lulus', 'assets/MAN 13 JAKARTA.jpg'),
(2, 'Basecamp Aktif', 'Kelas 1CC5', 'Sekarang — mendalami komputasi, logika, dan kerja tim lewat proyek nyata.', 'CCIT-FTUI • Semester Awal', 'assets/image.png'),
(3, 'Skill Set', 'HTML • CSS • JS', 'Senjata utama — membangun website native yang cepat dan elegan dari nol.', 'Native Stack • 100% Vanilla', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=900&auto=format&fit=crop');

-- ------------------------------------------------------------
-- 4. Keahlian / skill bar (section #pendidikan)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS skills (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  urutan  INT NOT NULL,
  nama    VARCHAR(50) NOT NULL,
  persen  INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO skills (urutan, nama, persen) VALUES
(1, 'HTML', 90),
(2, 'CSS', 85),
(3, 'JavaScript', 75),
(4, 'Desain / UI', 80);

-- ------------------------------------------------------------
-- 5. Karya (section #karya) + badge teknologi
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS works (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  urutan      INT NOT NULL,
  kategori    ENUM('web','desain','tugas') NOT NULL,
  judul       VARCHAR(100) NOT NULL,
  deskripsi   VARCHAR(255) NOT NULL,
  gambar      VARCHAR(255) NOT NULL,
  link_label  VARCHAR(100) NULL,
  link_url    VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO works (urutan, kategori, judul, deskripsi, gambar, link_label, link_url) VALUES
(1, 'web', 'Landing Page Alam', 'Latihan hero fullscreen + parallax sinematik ala White Desert.', 'assets/koding.png', NULL, NULL),
(2, 'tugas', 'Tugas Kelas 1CC5', 'Dokumentasi & presentasi tugas — rapi dan terstruktur.', 'assets/open ccit.jpeg', NULL, NULL),
(3, 'desain', 'Poster & Layout', 'Eksplorasi tipografi serif + palet warna earthy.', 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=900&auto=format&fit=crop', NULL, NULL),
(4, 'web', 'Portofolio Native', 'Website ini — 100% HTML, CSS, JS tanpa framework.', 'assets/rasenma.png', 'Lihat source →', 'https://github.com/senkirss/portofolio-'),
(5, 'desain', 'Fotografi Jagakarsa', 'Potret suasana tenang sekitar Casamora.', 'assets/csamora.webp', NULL, NULL),
(6, 'tugas', 'Catatan Belajar', 'Rangkuman materi komputasi dasar kelas 1CC5.', 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=900&auto=format&fit=crop', NULL, NULL);

CREATE TABLE IF NOT EXISTS work_techs (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  work_id INT NOT NULL,
  tech    VARCHAR(50) NOT NULL,
  FOREIGN KEY (work_id) REFERENCES works(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO work_techs (work_id, tech) VALUES
(1, 'HTML'), (1, 'CSS'), (1, 'JS'),
(2, 'Dokumentasi'), (2, 'Presentasi'),
(3, 'Tipografi'), (3, 'Layout'),
(4, 'HTML'), (4, 'CSS'), (4, 'JS'), (4, 'Git'),
(5, 'Fotografi'),
(6, 'Komputasi Dasar');

-- ------------------------------------------------------------
-- 6. Perjalanan karier (section #perjalanan)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS journey (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  urutan      INT NOT NULL,
  kode        VARCHAR(20)  NOT NULL,
  judul       VARCHAR(100) NOT NULL,
  deskripsi   VARCHAR(255) NOT NULL,
  tahap_label VARCHAR(100) NOT NULL,
  tahap_desc  VARCHAR(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO journey (urutan, kode, judul, deskripsi, tahap_label, tahap_desc) VALUES
(1, '01 — Awal', 'MAN 13 Jakarta', 'Lulus dari MAN 13 Jakarta Selatan dengan fondasi akademik, disiplin, dan karakter yang kuat sebagai bekal awal karier.', 'Tahap 01', 'MAN 13 Jakarta — Fondasi'),
(2, '02 — Lanjutan', 'CCIT-FTUI', 'Melanjutkan ke CCIT-FTUI (Fakultas Teknik Universitas Indonesia) untuk mendalami ilmu komputer dan teknologi informasi secara praktis.', 'Tahap 02', 'CCIT-FTUI — Pendalaman IT'),
(3, '03 — Kini', 'Kelas 1CC5', 'Saat ini berada di kelas 1CC5 — fokus pada komputasi dasar, kolaborasi tim, dan membangun portofolio web native dengan HTML, CSS, dan JS.', 'Tahap 03', 'Kelas 1CC5 — Praktik & Karya');

-- ------------------------------------------------------------
-- 7. Navigasi + pengaturan situs (warna, menu)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS nav_links (
  id     INT AUTO_INCREMENT PRIMARY KEY,
  urutan INT NOT NULL,
  label  VARCHAR(50)  NOT NULL,
  href   VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO nav_links (urutan, label, href) VALUES
(1, 'Tentang', '#tentang'),
(2, 'Profil', '#data-diri'),
(3, 'Pendidikan', '#pendidikan'),
(4, 'Karya', '#karya'),
(5, 'Perjalanan', '#perjalanan'),
(6, 'Ulasan', '#ulasan'),
(7, 'Hubungi Saya', '#kontak');

CREATE TABLE IF NOT EXISTS site_settings (
  kunci VARCHAR(50) PRIMARY KEY,
  nilai VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO site_settings (kunci, nilai) VALUES
('brand', 'RMA.'),
('warna_brown', '#6E3511'),
('warna_sage', '#91AC67'),
('warna_olive', '#597928'),
('warna_cream', '#FCECD8'),
('copyright', '© 2026 Rasendriya Muhammad Adisanto');

-- ------------------------------------------------------------
-- 8. Ulasan / rating (section #ulasan)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS reviews (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  nama    VARCHAR(100) NOT NULL,
  peran   VARCHAR(100) NOT NULL DEFAULT 'Pengunjung',
  rating  TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  pesan   TEXT NOT NULL,
  tanggal DATE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO reviews (nama, peran, rating, pesan, tanggal) VALUES
('Rizky', 'Rekan 1CC5', 5, 'Webnya cepat dan rapi. Bagian tanda tangannya keren, kayak ditulis beneran.', '2026-09-20'),
('Salsa', 'Rekan 1CC5', 5, 'Navigasinya gampang, warnanya enak dilihat. Cocok buat contoh portofolio tugas.', '2026-09-22'),
('Fajar', 'Teman MAN 13', 4, 'Sudah bagus dan niat. Saran saya tambah mode gelap biar makin mantap.', '2026-09-25');
