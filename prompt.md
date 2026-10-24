# Tugas Codex: Website Company Profile Aranaspice

Bangun website company profile PT. Sari Bhuwana Nusajaya dengan brand Aranaspice di workspace ini. Hasil akhir berupa website yang bisa dijalankan, bukan sekadar rencana, mockup, atau halaman placeholder.

Stack wajib: Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui. Target pengunjung: buyer rempah B2B, importir, distributor, serta calon mitra lokal dan internasional. Konversi utama: inquiry produk melalui WhatsApp dan unduhan company profile/katalog.

## 1. Baca Sumber Sebelum Coding

Lakukan secara berurutan:

1. Baca seluruh `WEBSITE BRIEF.docx`, termasuk gambar yang disisipkan. Ekstrak gambar bila perlu agar referensi desain, SDGs, dan contoh spesifikasi terbaca.
2. Baca seluruh 16 halaman `Compro/Compro SBN 2026.pdf`. Gunakan JPG per halaman di folder yang sama untuk memeriksa visual, spesifikasi, sertifikasi, serta kontak yang tidak terbaca oleh ekstraksi teks.
3. Tinjau seluruh gambar di `Logo` dan `FotoProduk`, termasuk subfoldernya. Cocokkan objek foto dengan produk sebenarnya; jangan hanya mengandalkan nama file.
4. Periksa `https://pratamaspicesid.com/` melalui browser desktop dan mobile sebagai referensi pelengkap. Periksa navigasi, katalog, detail produk, dan kontak yang relevan.
5. Ringkas keputusan visual, pemetaan asset, dan konflik sumber sebelum implementasi. Lanjutkan implementasi dan verifikasi tanpa meminta persetujuan ulang untuk keputusan yang sudah dikunci di sini.

Urutan otoritas: keputusan dalam prompt ini > requirement dan screenshot brief > Compro untuk detail materi > situs live sebagai pelengkap visual. Jika konflik fakta tidak terselesaikan oleh urutan ini, gunakan informasi yang jelas didukung sumber dan laporkan sisanya.

Desain situs live yang diperiksa pada 24 Oktober 2026 berbeda dari screenshot brief. **Screenshot dalam brief adalah acuan visual utama**, bukan tampilan situs live terbaru. Jika situs tidak dapat diakses, lanjutkan dari screenshot brief dan nyatakan keterbatasan inspeksi.

## 2. Arah Desain yang Dikunci

Buat adaptasi visual yang dekat dengan screenshot referensi dalam brief, dengan identitas Aranaspice. Ini bukan tugas membuat template company profile baru dengan interpretasi bebas.

- Pertahankan karakter navigasi pill, hero kolase produk/rempah, heading besar dan tegas, bidang gelap, komposisi foto editorial, ruang antarbagian, peta ekspor, serta kotak spesifikasi yang rapi.
- Sesuaikan isi dan jumlah bagian dengan materi Aranaspice. Gunakan pola layout, skala, ritme, dan interaksi screenshot sebagai bahasa visual bersama.
- Hero memakai foto rempah/produk lokal dan copy tentang rempah Indonesia serta kemitraan ekspor. Pilih kolase seperti screenshot, bukan alternatif scrollytelling yang memperbesar lingkup.
- Loading awal berupa logo Aranaspice dan transisi warna sederhana tanpa persentase. Buat singkat, tidak berulang setiap navigasi, tidak menghalangi konten jika asset gagal dimuat, dan mendukung `prefers-reduced-motion`.
- Animasi reveal dan transisi cukup ringan. Hindari scroll hijacking dan dependensi animasi berat bila CSS sudah cukup.
- Cocokkan karakter tipografi dengan screenshot. Gunakan font berlisensi sesuai dan dukungan Arab/Mandarin yang terbaca; jangan mengganti arah desain dengan font dekoratif yang tidak relevan.
- Teks, kartu, form, dan navigasi harus berupa elemen web nyata, bukan gambar screenshot halaman atau halaman Compro yang ditempel utuh.
- Gunakan identitas, copy, kontak, dan foto Aranaspice sepenuhnya. Jangan membawa identitas Pratama, foto gudang mereka, logo pelanggan, statistik, sertifikasi, atau klaim mereka.

### Palet Wajib

Definisikan sebagai CSS variables dan hubungkan dengan token Tailwind/shadcn/ui:

| Token | Warna | Peran |
| --- | --- | --- |
| Botanical Green | `#45664A` | Brand utama, blok konten, elemen aktif |
| Deep Forest | `#203B2A` | Hero/bidang gelap, footer, heading kuat |
| Spice Gold | `#D9BD00` | Aksen, indikator, CTA dengan teks gelap |
| Warm Ivory | `#F8F7F2` | Permukaan terang utama |
| Soft Sage | `#E9F0E8` | Permukaan sekunder, pemisah bagian |
| Charcoal | `#1F2922` | Teks utama pada bidang terang |

Palet ini menggantikan palet gambar brief bila berbeda. Pertahankan warna alami foto serta warna resmi logo/ikon sertifikasi dan SDGs. Uji kontras; Spice Gold bukan warna teks kecil pada bidang terang. Restyle shadcn/ui sesuai desain, bukan tampilan dashboard bawaan.

## 3. Asset dan Materi

- Logo resmi: `Logo/Logo Aranaspice 1000x1000.png`. Pertahankan bentuk, proporsi, serta warna; jangan menggambar ulang dengan teks atau ikon generik.
- Foto kemasan Ground Spices: `FotoProduk/Ground Spices`. Tinjau file `1.png` sebelum digunakan sebagai komposisi.
- Foto komoditas Whole Spices: `FotoProduk/Whole Spices`. Sudut foto alternatif produk yang sama tidak dihitung sebagai produk berbeda.
- Foto hero, detail bahan, dan komposisi editorial: `FotoProduk/Untuk Design Website`. Tinjau `All Spice 2.png` dan foto DSCF untuk penempatan yang sesuai.
- Foto Spice Mix Powder, Spice Chocolate, pameran, serta materi pendukung yang tidak tersedia terpisah boleh diekstrak/crop dari Compro. Gunakan crop relevan dengan resolusi layak, bukan screenshot satu halaman sebagai satu section.
- Jika background/crop foto bermasalah, pilih alternatif sumber yang lebih bersih. Laporkan jika asset layak tidak tersedia; jangan menutupi masalah dengan foto produk yang salah.
- Optimalkan salinan asset ke `public`, gunakan nama deskriptif dan `next/image` responsif. Beberapa sumber sangat besar; jangan memuat file puluhan MB sebagai hero. Pertahankan seluruh sumber asli.
- Adaptasikan materi menjadi copy web yang natural untuk buyer ekspor, bukan lorem ipsum. Jangan mengganti produk asli dengan foto stok atau AI.

## 4. Struktur Halaman dan Konten

Rute: `/{locale}`, `/{locale}/about`, `/{locale}/products`, `/{locale}/products/[slug]`, `/{locale}/sustainability`, dan `/{locale}/contact`.

### Home

Susun alur: hero kolase dan CTA utama; pengantar/keunggulan perusahaan; sorotan kategori/produk; panduan pemesanan; jangkauan ekspor; sustainability/pemberdayaan; sertifikasi/pameran; FAQ; CTA kontak dan footer.

Gunakan isi dari sumber terkait dan komposisi screenshot brief. Jangan mengubah semua bagian menjadi grid kartu seragam.

### About

Gunakan profil Compro: PT. Sari Bhuwana Nusajaya bergerak di rempah/herbal Indonesia sejak 2018, dengan pemasok lintas provinsi, kolaborasi petani/masyarakat, kualitas, dan rantai pasok berkelanjutan. Tampilkan visi, misi, serta nilai SPICE: Sustainability, Productivity, Innovation, Collaboration, Empowerment.

Keunggulan dapat mencakup kemurnian, pemilihan bahan, kolaborasi langsung, dan composite can sesuai cakupan sumber. Kemasan Ground Spices tidak otomatis menjadi kemasan semua komoditas.

### Products: 16 Produk

Tampilkan tiga kategori dengan filter berfungsi. Setiap produk memiliki foto yang cocok, nama, ringkasan, detail, dan CTA inquiry.

**Whole Spices: 10 produk**

1. Dried Sliced Turmeric
2. Dried Sliced Ginger
3. Dried Sliced Galangal
4. Dried Sliced Curcuma
5. Mace
6. Nutmeg
7. Long Pepper
8. Cubeb
9. Clove
10. Candlenut

**Ground Spices: 5 produk**

1. Turmeric Ground
2. Ginger Ground
3. Red Ginger Ground
4. White Pepper Ground
5. Spice Mix Powder

**Innovative Products: 1 produk**

1. Spice Chocolate

Nama ilmiah hanya digunakan jika didukung sumber dan cocok produknya. Normalisasi typo jelas seperti "Long Paper" menjadi "Long Pepper"; jangan menebak identitas botani atau spesifikasi meragukan.

### Detail Produk

- Gunakan foto utama, ringkasan, kotak spesifikasi, dan inquiry form pada halaman setiap produk.
- Ambil kemasan, shelf life, kapasitas, moisture, grade, loading, komposisi, dan atribut lainnya dari brief/Compro jika tersedia untuk produk terkait.
- Bedakan retail/bulk, gram/kilogram, ton/bulan, MT/tahun, dan pcs/tahun. Kapasitas satu produk bukan kapasitas seluruh perusahaan.
- Harga Compro adalah data dokumen, bukan jaminan harga terkini. Jika ditampilkan, beri konteks harga referensi dan arahkan buyer meminta penawaran terbaru; tidak ada checkout.
- Produk tanpa angka spesifikasi tetap mempunyai deskripsi yang didukung sumber dan CTA meminta spesifikasi/penawaran. Jangan membuat angka, MOQ, lead time, atau tabel kosong.
- Klaim manfaat sumber tidak boleh diperluas menjadi klaim penyembuhan atau jaminan medis.

### Export Markets

Peta dunia menandai 11 tujuan dari brief: Egypt, India, Macau, Japan, Denmark, Hong Kong, Vietnam, Australia, Saudi Arabia, United Kingdom, Nigeria. Brief menjadi daftar utama walaupun daftar di Compro lebih pendek.

Sediakan daftar teks yang terbaca di mobile dan oleh screen reader. Posisi marker/label harus benar dan dapat dipahami tanpa hover. Jangan menggunakan jumlah negara atau jaringan pelanggan situs referensi.

### Sustainability, Sertifikasi, dan Pameran

- Bahas pemberdayaan petani/masyarakat dan rantai pasok bertanggung jawab berdasarkan materi perusahaan.
- Jelaskan relevansi SDGs 4, 5, 6, 8, 12, 17 sesuai ikon brief. Bedakan arah komitmen dari capaian terbukti; jangan mengarang penerima manfaat, program, audit, atau angka dampak.
- Tampilkan HACCP, HALAL, BPOM/GMP sesuai penyebutan sumber. Jangan membuat nomor, cakupan, masa berlaku, atau klaim validitas yang tidak tersedia. Jangan menyamakan izin edar dengan sertifikasi sistem.
- Gunakan foto dan fakta pameran/penghargaan terdokumentasi; jangan mengarang nama acara, tahun, atau penghargaan dari foto yang tidak terbaca.

### Contact dan Footer

Gunakan kontak Compro; periksa ulang ejaan dan digit terhadap halaman 16:

- Perusahaan: PT. Sari Bhuwana Nusajaya.
- Website: `www.saribhuwana.com`.
- Email: `pt.saribhuwana@gmail.com`.
- Telepon utama: `+62 812-3381-141`.
- Telepon kedua: `+62 813-3654-2475`.
- Alamat: Taman Pinang Indah Blok GV/25, Sidoarjo Regency, East Java, Indonesia.
- Instagram: `@saribhuwana`, `@aranaspice.id`.

Sediakan tautan email, telepon, Instagram, WhatsApp, navigasi inti, dan unduhan. Jangan menebak koordinat kantor atau URL embed peta.

## 5. Perilaku Fungsional

### Bahasa

- Dukung `en`, `id`, `zh`, `ar`. Root `/` mengarah ke `/en`; English adalah bahasa awal, bukan hasil deteksi lokasi.
- Terjemahkan navigasi, halaman produk, spesifikasi, form, validasi, FAQ, metadata, dan CTA. Pilihan bahasa tidak boleh hanya mengganti menu.
- Language switcher mempertahankan halaman/produk aktif. Set `lang` sesuai locale dan `dir="rtl"` untuk Arab; pertahankan keterbacaan email, telepon, dan satuan teknis.
- Simpan data produk/dictionary secara terstruktur agar konsisten. Kemampuan Next.js dan dictionary lokal sudah cukup; tidak perlu layanan terjemahan berbayar.

### Inquiry WhatsApp

- Sediakan inquiry form di setiap detail produk, form kontak umum, dan floating WhatsApp yang tidak menutupi konten atau tombol mobile.
- Tujuan default adalah nomor utama Compro: `628123381141`. Pertahankan digit sumber; jangan menambahkan digit yang diasumsikan hilang.
- Field wajib: nama, email valid, negara tujuan, pesan/kebutuhan. Field opsional: perusahaan, jumlah, unit; jumlah yang diisi harus positif. Detail produk menyertakan nama produk otomatis.
- Setelah validasi, buka `https://wa.me/628123381141?text=...` dengan pesan ter-encode berisi kontak dan kebutuhan buyer. Bahasa pesan mengikuti locale aktif. Beri tahu pengguna bahwa inquiry dilanjutkan melalui WhatsApp.
- Pengguna tetap menekan Send di WhatsApp. Jangan mengklaim inquiry sudah terkirim/tersimpan. Sediakan tautan manual jika jendela baru diblokir; pertahankan input.
- Tidak ada penyimpanan lead, API email, database, unggahan file, atau kredensial tambahan. Jangan menyimpan data pribadi form pada URL halaman, analytics, atau browser storage.

### Unduhan

Sediakan Download Catalog dan Download Company Profile dengan label lokal yang sesuai. Kedua CTA menggunakan salinan `Compro/Compro SBN 2026.pdf`, sesuai keputusan pengguna. File harus dapat diunduh; keterangan tidak boleh menyiratkan ada dua dokumen berbeda.

### Pemesanan dan FAQ

Alur ringkas: inquiry kebutuhan, konfirmasi spesifikasi/volume, penawaran/kesepakatan, persiapan/kontrol kualitas, koordinasi dokumen/pengiriman. Posisikan sebagai panduan kerja sama yang perlu dikonfirmasi, bukan SOP resmi atau janji lead time.

FAQ bersumber dari Compro: tujuan pengiriman, fleksibilitas volume, dan perlindungan mutu selama pengiriman. Jangan menjanjikan semua negara selalu dapat dilayani tanpa pengecekan regulasi/logistik.

## 6. Batas Implementasi

- Ikuti instruksi workspace; pertahankan sumber dan perubahan pengguna. Jika project sudah ada, gunakan struktur/dependensi relevan. Jika kosong, inisialisasi stack yang diminta.
- Gunakan versi stabil kompatibel dan dokumentasi resmi saat API belum familier. Tambahkan hanya dependensi yang diperlukan stack/fungsi disetujui.
- Gunakan Server Components untuk konten statis, Client Components hanya untuk interaksi. Data perusahaan/katalog lokal sudah cukup; tidak perlu backend baru.
- Sediakan metadata per locale/produk, canonical domain tujuan, hreflang, sitemap, robots, dan favicon dari identitas tersedia. Structured data hanya memuat fakta sumber.
- Wajib responsif, heading semantik, alt text relevan, label form, focus state, keyboard navigation, dan kontras terbaca. Menu mobile mengelola fokus dengan benar.
- Di luar lingkup: blog, CMS/admin, login, checkout, pembayaran, sinkronisasi stok, deployment produksi, layanan berbayar. Jangan menambahkan testimonial, logo pelanggan, atau statistik tanpa bukti.

## 7. Verifikasi dan Definisi Selesai

Jalankan pemeriksaan project yang tersedia. Hasil harus lolos lint, TypeScript typecheck, production build. Jika script belum ada, sediakan perintah sesuai stack tanpa infrastruktur berlebihan.

Verifikasi minimum:

- Semua halaman inti dan 16 detail produk dapat dibuka dalam empat bahasa. Slug tidak valid mendapat 404 yang benar.
- Root membuka English; switcher mempertahankan konteks; Arab RTL tidak merusak layout atau angka/kontak.
- Filter, menu mobile, FAQ, validasi form, dan pesan WhatsApp berfungsi. Uji karakter khusus, Arab, dan Mandarin tanpa benar-benar mengirim inquiry.
- Kedua unduhan membuka PDF yang benar; asset tampil dan foto tidak tertukar antarproduk.
- Tinggalkan pemeriksaan runnable kecil untuk integritas jumlah produk, kategori, locale, dan pembentukan pesan WhatsApp jika logikanya nontrivial. Gunakan test yang ada atau check sederhana tanpa framework baru.
- Browser QA pada desktop 1440px, tablet 768px, mobile 390px: overflow, crop hero, logo, form, kartu, peta, keyboard, reduced motion. Periksa homepage dan detail produk dalam English/Arab; smoke-check locale lain.
- Bandingkan hasil render dengan screenshot brief, bukan hanya situs live. Simpan screenshot bukti desktop/mobile; build bukan bukti kesesuaian visual.
- Output aktif bebas identitas Pratama, dummy copy, tautan mati, klaim buatan, dan keberhasilan form palsu.

Akhiri dengan laporan ringkas: hasil implementasi, cara menjalankan, pemeriksaan dan hasilnya, lokasi screenshot bukti, serta keterbatasan sumber. Jika pemeriksaan browser tidak tersedia, nyatakan gap; jangan mengklaim visual QA lulus.
