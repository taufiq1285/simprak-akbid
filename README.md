# SIMPRAK AKBID (Sistem Informasi Manajemen Praktikum Akademi Kebidanan)

## 📋 Deskripsi
Sistem manajemen praktikum terintegrasi untuk Akademi Kebidanan yang menangani penjadwalan, peminjaman alat, penilaian, dan dokumentasi praktikum.

## 🚀 Fitur Utama
- Manajemen User (Admin, Dosen, Mahasiswa)
- Penjadwalan Praktikum
- Sistem Peminjaman Alat
- Penilaian Praktikum
- Manajemen Logbook
- Pelaporan dan Dokumentasi

## 🛠️ Teknologi yang Digunakan
- React.js
- Firebase (Authentication, Firestore, Storage)
- Tailwind CSS
- React Router DOM
- Axios
- React Query
- Formik & Yup

## 📦 Prasyarat
Sebelum memulai, pastikan sistem Anda telah memiliki:
- Node.js (versi 14 atau lebih tinggi)
- npm (versi 6 atau lebih tinggi)
- Git

## 🔧 Instalasi

1. Clone repository
```bash
git clone https://github.com/username/simprak-akbid.git
cd simprak-akbid
```

2. Install dependencies
```bash
npm install
```

3. Setup environment variables
```bash
cp .env.example .env
```
Sesuaikan nilai-nilai dalam file .env dengan konfigurasi Anda.

4. Jalankan aplikasi
```bash
npm start
```

## 🏗️ Struktur Proyek
```
simprak-akbid/
├── public/                  # Asset statis
├── src/
│   ├── api/                # Integrasi API
│   ├── components/         # Komponen React
│   ├── contexts/           # React Contexts
│   ├── features/           # Fitur-fitur utama
│   ├── firebase/          # Konfigurasi Firebase
│   ├── hooks/             # Custom hooks
│   ├── layouts/           # Layout komponen
│   ├── services/          # Service layer
│   ├── styles/            # CSS dan styling
│   └── utils/             # Utilitas dan helper
└── tests/                 # Unit dan integration tests
```

## 👥 Pengembangan
1. Buat branch baru untuk fitur/perbaikan
```bash
git checkout -b feature/nama-fitur
```

2. Commit perubahan
```bash
git add .
git commit -m "Deskripsi perubahan"
```

3. Push ke repository
```bash
git push origin feature/nama-fitur
```

## 📝 Testing
```bash
# Menjalankan unit test
npm test

# Menjalankan test dengan coverage
npm test -- --coverage
```

## 🌐 Deployment
1. Build aplikasi
```bash
npm run build
```

2. Deploy ke hosting (contoh menggunakan Firebase Hosting)
```bash
firebase deploy
```

## 📄 Lisensi
[MIT License](LICENSE)

## 👤 Kontak
TAUFIQ - [anditaufiq1285@gmail.com]

