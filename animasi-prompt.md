# Tugas Codex: Scroll Animation Aranaspice

Tambahkan scroll animation pada website Aranaspice yang sudah ada. Kerjakan implementasinya sampai terverifikasi, bukan hanya memberi saran atau membuat demo terpisah.

Tujuan: setiap section mempunyai perilaku animasi yang cocok dengan isi dan komposisinya, terlihat berbeda, smooth, serta terasa sebagai satu sistem motion editorial yang seimbang. Pengunjung tetap bisa membaca, bernavigasi, dan mengirim inquiry tanpa harus menunggu animasi.

## 1. Lingkup dan Batas Perubahan

- Cakupan seluruh website: homepage, About, Products/katalog, seluruh detail produk, Sustainability, Contact, dan footer, pada bahasa English, Indonesia, Mandarin, serta Arab RTL.
- Ini **animation-only enhancement**, bukan redesign. Pertahankan layout, urutan section, ukuran, spacing, warna, tipografi, foto, crop final, copy, data produk, breakpoint, serta seluruh rute dan perilaku bisnis existing.
- Pertahankan menu mobile, header/navbar, filter kategori, accordion FAQ, validasi form, inquiry WhatsApp, language switcher, dan unduhan PDF. Tidak ada perubahan API, backend, SEO/content, atau deployment.
- Gunakan CSS dan IntersectionObserver dengan dependensi existing. Tidak perlu Framer Motion, GSAP, AOS, Lenis, atau library baru. Jangan menambahkan scroll hijacking, pinned section, parallax kontinu, horizontal-scroll section, ticker, atau efek berulang tanpa henti.
- Hasil akhir animasi harus identik dengan posisi/layout existing. Jangan menambahkan dekorasi, section baru, garis rute ekspor, atau elemen visual baru hanya untuk menyediakan objek animasi.
- Pertahankan pekerjaan pengguna dan file lain yang sudah berubah. Perubahan cukup pada integrasi motion, CSS terkait, dan pemeriksaan yang diperlukan.

## 2. Inspeksi dan Baseline Sebelum Mengedit

1. Ikuti instruksi workspace. Tinjau source terbaru, bukan mengasumsikan website masih sama dengan brief awal.
2. Mulai dari `src/components/sections.tsx`, `src/components/interactive.tsx`, `src/app/globals.css`, layout locale, dan halaman dalam `src/app/[locale]`. Pastikan nama komponen/selector masih sesuai sebelum dipakai.
3. Inventarisasi section dan interaksi existing. Homepage saat prompt disusun berisi Hero, Intro, ProductHighlights, OrderGuide, ExportMap, SustainabilitySection, CompanyDocumentation, FaqSection, dan ContactCta. Footer dipakai bersama; halaman lain memakai PageHeading, AboutContent, Catalog, ProductDetail, dan ContactContent.
4. Periksa entrance hero `rise-in`, BootSplash, hover transform, sticky header, serta aturan reduced motion existing. Gabungkan atau ganti animasi entrance yang berkonflik; jangan menumpuk dua animasi pada properti/elemen yang sama.
5. Jalankan website lokal dan ambil baseline desktop/mobile, termasuk satu halaman detail produk dan Arabic RTL. Asset screenshot lama boleh menjadi pelengkap, bukan bukti render source terkini.
6. Buat daftar singkat section, target gerak, trigger, dan batas mobile. Setelah itu langsung implementasikan sesuai keputusan berikut.

## 3. Koreografi Wajib: Berbeda Sesuai Section

Jangan membungkus semua section dengan satu efek fade-up yang identik. Gunakan variasi di bawah sebagai keputusan motion; sesuaikan selector dengan struktur existing tanpa mengubah desain.

| Bagian | Koreografi |
| --- | --- |
| Hero | Entrance saat halaman dibuka: foto kolase masuk bergantian dari offset pendek yang berbeda; sebagian foto memakai rotasi maksimal sekitar 3 derajat lalu kembali ke rotasi existing. Headline dan CTA menyusul dengan rise pendek. Koordinasikan dengan BootSplash agar entrance tidak habis dimainkan di balik splash. Jangan memainkan entrance hero kedua kalinya lewat observer. |
| Intro | Reveal foto lewat mask pada frame existing, dari bawah ke atas; teks masuk lembut dari arah inline berlawanan. Origin stamp mendapat rotasi kecil menuju posisi existing lalu diam. Angka 2018 tetap statis, bukan counter. |
| ProductHighlights | Foto kategori utama zoom-out ringan menuju scale existing; kategori Ground Spices masuk dari inline-end dan Innovative Products rise pendek dengan jeda. Heading dan CTA tetap mudah dibaca. Tiga panel tidak memakai gerak seragam. |
| OrderGuide | Step muncul berurutan mengikuti arah baca. Desktop boleh berupa urutan horizontal singkat; mobile dipicu per langkah yang mendekati viewport, bukan menunggu semua langkah terpicu dari section induk. Jangan menambahkan garis dekoratif baru. |
| ExportMap | Dasar peta fade-in, kemudian marker existing muncul bertahap dalam kelompok singkat; daftar negara menyusul dengan stagger ringan. Koordinat, label, angka, dan isi peta tetap persis. Jangan menggeser seluruh peta atau membuat marker berkedip terus-menerus. |
| SustainabilitySection | Heading dan narasi masuk berlapis dengan jeda pendek. Ikon SDGs memakai scale-settle ringan, bukan flip atau bounce. Pada halaman Sustainability penuh, item teks/ikon dipicu per baris viewport agar konten panjang tidak muncul sekaligus. |
| CompanyDocumentation | Sertifikasi fade-in sebagai satu kelompok; foto pameran mendapatkan reveal dari sisi berbeda pada frame masing-masing. Teks dokumentasi memakai rise pendek. Logo dan teks sertifikasi tidak diputar atau dipotong. |
| FaqSection | Heading memakai fade dengan pergeseran minimal; baris pertanyaan memakai stagger singkat. Setelah terlihat, biarkan accordion existing mengatur buka/tutup; jawaban yang dibuka tidak diperlakukan sebagai scroll reveal baru. |
| ContactCta | Headline masuk horizontal pendek dari inline-start; copy dan tombol menyusul dari arah berlawanan dengan offset lebih kecil. Background dan ukuran blok CTA tidak bergerak. |
| Footer | Kolom muncul dengan opacity stagger pendek; gerak minimal, bukan efek hero kedua. Semua tautan segera dapat difokuskan; footer tidak disembunyikan hanya karena pengguna mencapai akhir halaman dengan cepat. |

### Halaman Selain Homepage

- **PageHeading:** entrance singkat untuk eyebrow, judul, dan deskripsi, tanpa menduplikasi entrance hero atau mengulang heading yang sudah terlihat saat hydration.
- **AboutContent:** foto/narasi memakai arah berlawanan; visi dan misi berurutan; nilai SPICE stagger per baris. Hindari menganimasikan blok induk dan setiap anak sekaligus.
- **Catalog:** kartu rise dengan scale sangat kecil menuju ukuran existing. Stagger mengikuti baris/kelompok yang masuk viewport, bukan indeks global 16 produk. Ketika kategori diganti, animasikan hasil yang baru masuk; kartu yang tetap terlihat tidak menghilang atau mengulang reveal. Pertahankan posisi scroll, state filter, dan fokus.
- **ProductDetail:** foto scale-settle, ringkasan slide inline pendek, kotak spesifikasi fade sebagai satu kelompok, related products stagger per baris. Jangan membuat setiap angka spesifikasi bergerak sendiri. Anchor ke inquiry harus langsung memperlihatkan tujuan.
- **ContactContent dan inquiry:** kelompok informasi kontak muncul bergantian; teks pengantar form boleh reveal. Form, label, input, pesan validasi, dan tombol submit tetap stabil serta tidak dianimasikan per field. Fokus atau aktivitas mengetik tidak boleh mereset animasi atau state form.

## 4. Motion Tokens dan Trigger

- Karakter: editorial seimbang, terlihat tetapi tidak teatrikal. Gunakan easing dasar `cubic-bezier(0.22, 1, 0.36, 1)` tanpa elastic overshoot/bounce.
- Durasi desktop umumnya 450-800 ms. Durasi mobile sekitar 350-600 ms dengan perpindahan lebih kecil; bukan animasi desktop yang sekadar diperkecil lewat transform.
- Offset translasi desktop 16-32 px, mobile 8-16 px. Scale media sekitar 1.03 menuju scale existing; scale-settle ikon/kartu sekitar 0.98 menuju 1. Rotasi hanya untuk elemen dekoratif yang ditentukan, bukan teks/logo sertifikasi.
- Stagger 60-100 ms dengan total delay maksimal 250 ms per kelompok. Saat kelompok panjang, pecah berdasarkan viewport/baris; jangan membuat item akhir menunggu beberapa detik.
- Trigger ketika target mulai masuk bagian bawah viewport, bukan tepat ketika seluruh section selesai dilewati. Gunakan target kecil atau threshold rendah agar section lebih tinggi dari viewport tetap terpicu.
- Setiap target reveal berjalan sekali selama mount halaman. Scroll balik tidak menyembunyikan atau memutar ulang target yang selesai. Navigasi menuju halaman baru boleh menjalankan entrance halaman baru sekali.
- Pengguna yang scroll cepat, memakai anchor, atau memulihkan posisi scroll browser harus segera melihat konten relevan. Jangan menyisakan antrean delay panjang atau target transparan setelah viewport berpindah jauh.
- Pertahankan ritme antarbagian melalui easing/token bersama, bukan menjadikan semua bagian memakai koreografi sama. Pilih satu animasi dominan per section dan gerak pendukung seperlunya.

## 5. Implementasi Minimal dan Aman

- Pertahankan Server Components untuk markup/konten statis. Batasi Client Components pada registrasi target dan lifecycle motion; jangan mengubah seluruh aplikasi menjadi client-rendered hanya untuk animasi.
- Gunakan observer yang dibagi bila memungkinkan, variasi CSS terbatas, dan penanda/ref yang jelas. Hindari registry/config generik berlebihan, pemindaian DOM setiap frame, serta handler scroll yang terus memicu React state.
- Bersihkan observer/listener pada unmount. Target baru akibat navigasi locale/route dan filter katalog harus terdaftar; target lama dilepas. Utamakan lifecycle React, bukan global MutationObserver bila tidak diperlukan.
- Utamakan transform dan opacity. Mask/clip-path hanya pada sedikit frame media yang membutuhkan reveal dan tidak mengubah layout atau memotong focus ring. Jangan menganimasikan width, height, margin, top, atau left untuk entrance.
- Jaga tinggi/aspect ratio media existing. Jangan menambah wrapper yang mengubah grid/flex sizing, sticky behavior, stacking context header, atau layout SVG.
- Pisahkan layer reveal dari hover/transform existing agar keduanya tidak saling menimpa. Transform marker SVG tidak boleh mengubah posisi geografis; pilih opacity bila origin transform tidak aman.
- Hindari `will-change` permanen pada semua elemen, blur/filter berat, dan terlalu banyak animasi paralel. Jangan mengejar keunikan dengan menambah beban grafis.
- Tidak boleh ada konten yang berkedip dari terlihat menjadi tersembunyi saat hydration atau efek mount terlambat. Jangan menyembunyikan seluruh halaman dengan opacity pada body/main atau parent section besar.
- Simpan source website sebagai dasar hasil akhir; tugas ini tidak memerlukan membaca ulang atau mengubah katalog, terjemahan, asset sumber, maupun PDF.

## 6. Aksesibilitas, Bahasa, dan Fallback

- `prefers-reduced-motion: reduce`: tampilkan semua konten pada posisi akhir tanpa translasi, mask, rotasi, scale, atau stagger. Jika preferensi berubah saat halaman terbuka, hentikan motion dan tampilkan target yang belum selesai.
- Tanpa JavaScript atau IntersectionObserver, seluruh konten tetap terlihat dan dapat dipakai. Kondisi enhancement gagal tidak boleh meninggalkan `opacity: 0`, clipping tertutup, maupun pointer interaction yang terblokir.
- Keyboard focus, skip link, dan anchor jump harus membuka target tersembunyi segera, tanpa menunggu delay. Jangan mengubah `tabindex`, `aria-hidden`, atau `display` semantik hanya untuk efek visual.
- Arah horizontal mengikuti `dir`/arah baca. Arab RTL tetap benar; jangan membalik foto produk, peta geografis, nomor telepon, atau data spesifikasi.
- Teks Arab/Mandarin tidak dipecah per karakter demi animasi. Gunakan elemen heading/kalimat existing sehingga shaping, line break, seleksi teks, dan screen reader tidak rusak.
- Konten tetap terbaca pada zoom 200%, viewport sempit, koneksi lambat, serta gambar yang gagal dimuat. Tidak ada overlay animasi yang menghalangi CTA, menu, atau floating WhatsApp.

## 7. Verifikasi Wajib

### Pemeriksaan Project

Gunakan script existing: `npm run lint`, `npm run typecheck`, `npm run check`, dan `npm run build`. Jalankan `npm run smoke` setelah server tersedia. Baca hasil sebenarnya; pisahkan kegagalan pre-existing dari regresi perubahan ini dan jangan memperbaiki hal di luar lingkup.

Tambahkan satu pemeriksaan runnable kecil pada fasilitas test/check yang tersedia untuk perilaku motion nontrivial, minimal batas stagger dan reduced-motion/fallback jika ada helper terkait. Verifikasi lifecycle/reveal melalui browser; jangan menambah framework test baru.

### Browser QA

1. Periksa homepage, About, katalog, satu detail produk, Sustainability, dan Contact pada desktop 1440px, tablet 768px, serta mobile 390px. Periksa tambahan viewport 320px untuk overflow.
2. Lakukan scroll lambat, cepat hingga footer, scroll balik, reload di tengah halaman, anchor menuju story/inquiry, serta navigasi route/locale. Tidak boleh ada target tersangkut transparan, animasi berulang, layout shift, atau flash.
3. Periksa English dan Arab RTL pada seluruh pola komponen, lalu smoke-check Indonesia/Mandarin. Pastikan arah motion, line wrapping, nomor, dan peta tidak rusak.
4. Uji filter katalog berulang, keyboard/tab, menu mobile, accordion, unduhan PDF, dan input/validasi form. Intersep tautan WhatsApp saat pengujian; jangan benar-benar mengirim inquiry.
5. Uji reduced motion sejak load dan saat preferensi berubah. Uji JavaScript nonaktif serta fallback observer tidak tersedia; konten dan form HTML dasar tetap terbaca, dengan batas interaksi tanpa JS dinyatakan jujur.
6. Bandingkan screenshot baseline dengan posisi akhir animasi. Layout, copy, asset, warna, dimensi, dan urutan section harus tetap sama; jangan menyebut perubahan visual yang tidak diminta sebagai peningkatan.
7. Rekam video pendek atau bukti beberapa frame berurutan saat scrolling untuk menilai timing, stagger, dan smoothness. Screenshot tunggal atau build sukses bukan bukti kualitas animasi.
8. Periksa console dan performance trace singkat. Tidak ada hydration error, listener/observer terus bertambah setelah navigasi, atau long task berulang yang berasal dari motion. Laporkan perangkat/browser dan keterbatasan bukti; jangan menjamin 60 fps tanpa pengukuran.

## 8. Definisi Selesai dan Laporan

Selesai jika seluruh section/halaman tercakup, koreografi utama berbeda sesuai tabel, layout existing tetap utuh, interaksi berfungsi, reduced motion/fallback aman, serta pemeriksaan dan browser QA mempunyai bukti.

Laporan akhir cukup memuat file yang berubah, ringkasan perilaku per section, hasil check/build/smoke/browser QA, lokasi screenshot/rekaman, dan gap yang belum terverifikasi. Jika browser tidak tersedia, nyatakan visual/motion QA belum dilakukan; jangan mengklaim animasi sudah smooth hanya dari pemeriksaan statis.
