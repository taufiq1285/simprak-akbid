// src/utils/constants/routes.js
export const ROUTES = {
  // Auth routes
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
    FORGOT_PASSWORD: '/forgot-password',
    RESET_PASSWORD: '/reset-password',
  },
  
  // Admin routes
  ADMIN: {
    DASHBOARD: '/admin',
    USERS: '/admin/users',
    PRAKTIKUM: '/admin/praktikum',
    ALAT: '/admin/alat',
    REPORTS: '/admin/reports',
  },
  
  // Dosen routes
  DOSEN: {
    DASHBOARD: '/dosen',
    NILAI: '/dosen/nilai',
    JADWAL: '/dosen/jadwal',
    LOGBOOK: '/dosen/logbook',
  },
  
  // Mahasiswa routes
  MAHASISWA: {
    DASHBOARD: '/mahasiswa',
    PRAKTIKUM: '/mahasiswa/praktikum',
    NILAI: '/mahasiswa/nilai',
    LOGBOOK: '/mahasiswa/logbook',
  },
  
  // Peminjaman routes
  PEMINJAMAN: {
    LIST: '/peminjaman',
    CREATE: '/peminjaman/create',
    DETAIL: '/peminjaman/:id',
  },
};
