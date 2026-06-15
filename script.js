// --- DATABASE SOAL ---
const daftarSoal = [
    { pertanyaan: "1. Apa itu Komputasi Pervasif?", opsi: ["Komputasi di mana-mana", "Hardware kuno", "Bahasa pemrograman"], jawaban: 0 },
    { pertanyaan: "2. Sensor apa yang cocok untuk mendeteksi keberadaan (presence)?", opsi: ["Sensor Suhu", "Motion Sensor / PIR", "Sensor Cahaya"], jawaban: 1 },
    { pertanyaan: "3. Apa kepanjangan dari API?", opsi: ["Application Programming Interface", "Advanced Program Integration", "Automated Process Input"], jawaban: 0 },
    { pertanyaan: "4. Bagaimana cara JavaScript mendeteksi tab disembunyikan?", opsi: ["window.close", "document.hidden", "screen.width"], jawaban: 1 },
    { pertanyaan: "5. Manakah yang termasuk framework JavaScript?", opsi: ["Laravel", "Django", "React"], jawaban: 2 }
];

// --- VARIABEL GLOBAL ---
let waktuTersisa = 60;
let timerInterval;
let idleTimeout;
let jumlahPindahTab = 0;
let jumlahAFK = 0;
let totalWaktuAFK = 0;
let afkMulai = 0;
let isUjianAktif = false;
let isAFK = false;

// --- NAVIGASI HALAMAN ---
function gantiHalaman(idHalaman) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(idHalaman).classList.add('active');
}

// --- ALUR MULAI UJIAN ---
function mulaiUjian() {
    const nama = document.getElementById('nama').value;
    const nim = document.getElementById('nim').value;

    if (nama === "" || nim === "") {
        alert("Nama dan NIM wajib diisi!");
        return;
    }

    document.getElementById('hasil-nama').innerText = nama;
    document.getElementById('hasil-nim').innerText = nim;

    renderSoal();
    gantiHalaman('exam-page');
    isUjianAktif = true;
    
    jalankanTimer();
    resetIdleTimer(); // Mulai memantau aktivitas mouse/keyboard
}

function renderSoal() {
    const container = document.getElementById('soal-container');
    container.innerHTML = '';

    daftarSoal.forEach((soal, indexSoal) => {
        let htmlSoal = `<div class="soal-item"><p><strong>${soal.pertanyaan}</strong></p>`;
        soal.opsi.forEach((pilihan, indexOpsi) => {
            htmlSoal += `
                <label>
                    <input type="radio" name="soal${indexSoal}" value="${indexOpsi}">
                    ${pilihan}
                </label>
            `;
        });
        htmlSoal += `</div>`;
        container.innerHTML += htmlSoal;
    });
}

function jalankanTimer() {
    timerInterval = setInterval(() => {
        if (!isAFK) { // Timer hanya berjalan jika user TIDAK AFK (Fitur Pervasif)
            waktuTersisa--;
            document.getElementById('waktu').innerText = waktuTersisa;

            if (waktuTersisa <= 0) {
                selesaiUjian();
            }
        }
    }, 1000);
}

// ==========================================
// FITUR PERVASIF 1: ANTI-CHEATING (TAB VISIBILITY)
// ==========================================
document.addEventListener("visibilitychange", () => {
    if (isUjianAktif && document.hidden) {
        jumlahPindahTab++;
        alert(`PERINGATAN! Anda terdeteksi berpindah tab. (Pelanggaran ke-${jumlahPindahTab})`);
    }
});

// ==========================================
// FITUR PERVASIF 2: PRESENCE TRACKER (IDLE/AFK)
// ==========================================
function setModeAFK() {
    if (!isUjianAktif || isAFK) return;
    
    isAFK = true;
    jumlahAFK++;
    afkMulai = Date.now();
    
    // Ubah status visual kecil di pojok
    const statusText = document.getElementById('status-text');
    statusText.innerText = "User is Away From Keyboard";
    statusText.className = "status-afk";

    // MUNCULKAN OVERLAY BESAR DI LAYAR
    document.getElementById('afk-overlay').classList.add('show');
}

function resetIdleTimer() {
    if (!isUjianAktif) return;

    // Jika user kembali dari AFK, hitung durasinya dan sembunyikan overlay
    if (isAFK) {
        isAFK = false;
        let durasiAFKSekarang = Math.floor((Date.now() - afkMulai) / 1000);
        totalWaktuAFK += durasiAFKSekarang;

        const statusText = document.getElementById('status-text');
        statusText.innerText = "Aktif";
        statusText.className = "status-aktif";

        // SEMBUNYIKAN OVERLAY DARI LAYAR
        document.getElementById('afk-overlay').classList.remove('show');
    }

    // Reset hitungan mundur AFK
    clearTimeout(idleTimeout);
    idleTimeout = setTimeout(setModeAFK, 15000); // Trigger AFK setelah 15 detik tanpa aktivitas
}

// Pantau pergerakan mouse dan ketikan keyboard
window.addEventListener('mousemove', resetIdleTimer);
window.addEventListener('keydown', resetIdleTimer);
// ==========================================

// --- ALUR SELESAI UJIAN ---
function selesaiUjian() {
    isUjianAktif = false;
    clearInterval(timerInterval);
    clearTimeout(idleTimeout);

    // Hitung Skor
    let skor = 0;
    daftarSoal.forEach((soal, indexSoal) => {
        const jawabanUser = document.querySelector(`input[name="soal${indexSoal}"]:checked`);
        if (jawabanUser && parseInt(jawabanUser.value) === soal.jawaban) {
            skor += 20; // 5 soal x 20 = 100
        }
    });

    document.getElementById('skor').innerText = skor;

    // Cetak Log Perilaku Pervasif
    const logList = document.getElementById('log-list');
    logList.innerHTML = `
        <li>Pindah Tab Browser: <strong>${jumlahPindahTab} kali</strong></li>
        <li>Jumlah AFK Terdeteksi: <strong>${jumlahAFK} kali</strong></li>
        <li>Total Waktu AFK (Ujian Dijeda): <strong>${totalWaktuAFK} detik</strong></li>
    `;

    gantiHalaman('result-page');
}