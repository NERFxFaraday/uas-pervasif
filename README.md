# Context-Aware Smart Exam 🎓

[cite_start]Aplikasi Simulasi E-Ujian (Mini Online Exam Platform) berbasis web yang dilengkapi dengan fitur pengawasan cerdas sadar konteks (*context-aware*)[cite: 5, 7]. [cite_start]Proyek ini dibuat untuk memenuhi Tugas Mata Kuliah Komputasi Pervasif[cite: 5].

[cite_start]Aplikasi ini tidak hanya menampilkan soal ujian, tetapi juga mampu mendeteksi keberadaan (*presence*) dan perhatian (*attention*) pengguna secara *real-time* menggunakan Web API bawaan peramban[cite: 6, 7].

## 🌟 Fitur Utama (Pervasive Computing)

1. [cite_start]**Tab Visibility Monitor (Anti-Cheating)** [cite: 17]
   [cite_start]Sistem akan mendeteksi jika mahasiswa berpindah ke tab lain di *browser* (misalnya untuk mencari jawaban)[cite: 18]. [cite_start]Sistem akan langsung memberikan peringatan visual dan mencatat jumlah pelanggaran ke dalam log[cite: 19].

2. [cite_start]**User Inactivity / Idle Detector (Presence Tracker)** [cite: 20]
   [cite_start]Sistem akan mendeteksi jika laptop ditinggal pergi oleh penggunanya[cite: 21]. [cite_start]Jika tidak ada pergerakan *mouse* atau aktivitas *keyboard* selama 15 detik, sistem akan memunculkan *overlay* peringatan secara otomatis dan menjeda (*pause*) waktu ujian agar tidak terbuang sia-sia[cite: 21, 22].

3. **Log Perilaku Otomatis**
   [cite_start]Di akhir sesi ujian, sistem akan menampilkan skor akhir beserta riwayat aktivitas pervasif pengguna selama ujian berlangsung[cite: 27].

## 🛠️ Teknologi yang Digunakan

[cite_start]Proyek ini dibangun murni di sisi *client* tanpa memerlukan konfigurasi *server* yang rumit[cite: 9]:
- **HTML5** untuk struktur antarmuka.
- **CSS3** untuk tata letak dan animasi *overlay*.
- **Vanilla JavaScript** untuk logika ujian, manipulasi DOM, dan integrasi sensor pervasif (`visibilitychange`, `mousemove`, `keydown`, `setTimeout`).

## 🚀 Cara Menjalankan Aplikasi Secara Lokal

Karena aplikasi ini sepenuhnya berbasis *client-side*, kamu bisa menjalankannya dengan sangat mudah:

1. *Clone repository* ini ke komputer kamu:
   ```bash
   git clone [https://github.com/USERNAME_KAMU/NAMA_REPOSITORY.git](https://github.com/USERNAME_KAMU/NAMA_REPOSITORY.git)