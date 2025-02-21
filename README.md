# SIMPRAK - Sistem Informasi Manajemen Praktikum

SIMPRAK adalah aplikasi manajemen praktikum berbasis web yang dibangun menggunakan React.js dan Firebase. Aplikasi ini dirancang untuk memudahkan pengelolaan praktikum di institusi pendidikan.

## Fitur Utama

### Frontend
- Autentikasi (Login/Register) dengan multiple role (Admin/Dosen/Mahasiswa)
- Dashboard khusus untuk setiap role
- Manajemen praktikum (pendaftaran, penjadwalan, penilaian)
- Sistem notifikasi real-time
- Responsif untuk semua ukuran layar
- Progressive Web App (PWA)

### Backend (Firebase)
- Authentication dengan Firebase Auth
- Database real-time menggunakan Firebase Realtime Database
- Push notifications menggunakan Firebase Cloud Messaging
- File storage menggunakan Firebase Storage

## Teknologi yang Digunakan

### Frontend
- React.js 18
- React Router v6
- Tailwind CSS
- Firebase SDK
- Context API untuk state management
- Progressive Web App (PWA)

### Backend
- Firebase Authentication
- Firebase Realtime Database
- Firebase Cloud Messaging
- Firebase Storage
- Firebase Cloud Functions

## Struktur Proyek

```
SIMPRAK-FRONTEND/
├── src/
│   ├── assets/              # Gambar, icons, dll
│   ├── components/          # Komponen yang dapat digunakan kembali
│   │   ├── common/         # Komponen umum (Button, Input, dll)
│   │   ├── layout/         # Komponen layout
│   │   └── modules/        # Komponen spesifik modul
│   ├── context/            # React Context
│   ├── hooks/              # Custom hooks
│   ├── pages/              # Halaman aplikasi
│   ├── utils/              # Fungsi utilitas
│   └── App.js              # Komponen utama
```

## Persyaratan Sistem

- Node.js >= 14.0.0
- npm >= 6.14.0
- Firebase project
- Modern web browser

## Instalasi

1. Clone repository
```bash
git clone https://github.com/username/simprak.git
cd simprak
```

2. Install dependensi
```bash
npm install
```

3. Konfigurasi Firebase
- Buat proyek di Firebase Console
- Salin konfigurasi Firebase ke `.env`:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

4. Jalankan aplikasi
```bash
npm start
```

## Penggunaan

### Akun Development
- Admin: admin@simprak.com
- Dosen: dosen@simprak.com
- Mahasiswa: mahasiswa@simprak.com
Password: password123 (untuk semua akun)

### Role dan Fitur

#### Admin
- Manajemen pengguna (dosen dan mahasiswa)
- Pengaturan praktikum
- Manajemen jadwal
- Laporan dan statistik

#### Dosen
- Input nilai praktikum
- Manajemen jadwal mengajar
- Melihat daftar mahasiswa
- Pengumuman praktikum

#### Mahasiswa
- Pendaftaran praktikum
- Melihat jadwal
- Melihat nilai
- Mengunduh materi

## Deployment

1. Build aplikasi
```bash
npm run build
```

2. Deploy ke Firebase Hosting
```bash
firebase deploy
```

## Backend Setup (Firebase)

### 1. Authentication
- Aktifkan Email/Password authentication
- Konfigurasi custom claims untuk role

### 2. Database Rules
```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid || root.child('users/'+auth.uid+'/role').val() === 'admin'",
        ".write": "auth.uid === $uid || root.child('users/'+auth.uid+'/role').val() === 'admin'"
      }
    },
    "praktikum": {
      ".read": "auth != null",
      ".write": "root.child('users/'+auth.uid+'/role').val() === 'admin' || root.child('users/'+auth.uid+'/role').val() === 'dosen'"
    }
  }
}
```

### 3. Storage Rules
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin' ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'dosen');
    }
  }
}
```

### 4. Cloud Functions
Fungsi-fungsi yang perlu diimplementasikan:
- Notifikasi pendaftaran praktikum
- Update otomatis status praktikum
- Kalkulasi nilai akhir
- Backup database otomatis

## Kontribusi

1. Fork repositori
2. Buat branch fitur (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## Lisensi

Distributed under the MIT License. See `LICENSE` for more information.

## Kontak

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/username/simprak](https://github.com/username/simprak)# simprak-akbid
