// API Endpoints
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  // Auth
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  LOGOUT: '/auth/logout',
  REFRESH_TOKEN: '/auth/refresh',
  
  // Users
  USERS: '/users',
  USER_PROFILE: '/users/profile',
  
  // Praktikum
  PRAKTIKUM: '/praktikum',
  PRAKTIKUM_ENROLL: (id) => `/praktikum/${id}/enroll`,
  PRAKTIKUM_SUBMIT: (id) => `/praktikum/${id}/submit`,
  
  // Nilai
  NILAI: '/nilai',
  NILAI_BY_PRAKTIKUM: (id) => `/nilai/praktikum/${id}`,
  NILAI_BY_STUDENT: (id) => `/nilai/student/${id}`,
};

// User Roles
export const ROLES = {
  ADMIN: 'admin',
  DOSEN: 'dosen',
  MAHASISWA: 'mahasiswa'
};

// Status Types
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  PENDING: 'pending',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

// Grade Scale
export const GRADE_SCALE = {
  A: { min: 85, max: 100, label: 'Excellent' },
  B: { min: 75, max: 84, label: 'Good' },
  C: { min: 65, max: 74, label: 'Satisfactory' },
  D: { min: 50, max: 64, label: 'Poor' },
  E: { min: 0, max: 49, label: 'Failed' }
};

// Form Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 6,
  NAME_MIN_LENGTH: 3,
  FILE_MAX_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_FILE_TYPES: ['pdf', 'doc', 'docx']
};

// Navigation Items
export const NAV_ITEMS = {
  admin: [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Users', path: '/admin/users' },
    { label: 'Praktikum', path: '/admin/praktikum' }
  ],
  dosen: [
    { label: 'Dashboard', path: '/dosen/dashboard' },
    { label: 'Praktikum', path: '/dosen/praktikum' },
    { label: 'Nilai', path: '/dosen/nilai' }
  ],
  mahasiswa: [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Praktikum', path: '/praktikum' },
    { label: 'Nilai', path: '/nilai' }
  ]
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  REFRESH_TOKEN: 'refreshToken',
  USER: 'user'
};

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`,
  PASSWORDS_DONT_MATCH: 'Passwords do not match',
  INVALID_FILE_TYPE: 'Invalid file type',
  FILE_TOO_LARGE: 'File is too large',
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNAUTHORIZED: 'Unauthorized access',
  SESSION_EXPIRED: 'Your session has expired. Please login again.'
};