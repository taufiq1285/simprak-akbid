import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS, STORAGE_KEYS } from './constants';
import { storage } from './helpers';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = storage.get(STORAGE_KEYS.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = storage.get(STORAGE_KEYS.REFRESH_TOKEN);
        const response = await api.post(API_ENDPOINTS.REFRESH_TOKEN, { refreshToken });
        
        const { token } = response.data;
        storage.set(STORAGE_KEYS.TOKEN, token);
        
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      } catch (refreshError) {
        storage.remove(STORAGE_KEYS.TOKEN);
        storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
        storage.remove(STORAGE_KEYS.USER);
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post(API_ENDPOINTS.LOGIN, credentials),
  register: (userData) => api.post(API_ENDPOINTS.REGISTER, userData),
  logout: () => api.post(API_ENDPOINTS.LOGOUT),
  getUserProfile: () => api.get(API_ENDPOINTS.USER_PROFILE)
};

// User API
export const userAPI = {
  getAll: () => api.get(API_ENDPOINTS.USERS),
  getById: (id) => api.get(`${API_ENDPOINTS.USERS}/${id}`),
  create: (data) => api.post(API_ENDPOINTS.USERS, data),
  update: (id, data) => api.put(`${API_ENDPOINTS.USERS}/${id}`, data),
  delete: (id) => api.delete(`${API_ENDPOINTS.USERS}/${id}`)
};

// Praktikum API
export const praktikumAPI = {
  getAll: () => api.get(API_ENDPOINTS.PRAKTIKUM),
  getById: (id) => api.get(`${API_ENDPOINTS.PRAKTIKUM}/${id}`),
  create: (data) => api.post(API_ENDPOINTS.PRAKTIKUM, data),
  update: (id, data) => api.put(`${API_ENDPOINTS.PRAKTIKUM}/${id}`, data),
  delete: (id) => api.delete(`${API_ENDPOINTS.PRAKTIKUM}/${id}`),
  enroll: (id) => api.post(API_ENDPOINTS.PRAKTIKUM_ENROLL(id)),
  submitAssignment: (id, formData) => api.post(
    API_ENDPOINTS.PRAKTIKUM_SUBMIT(id), 
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
  )
};

// Nilai API
export const nilaiAPI = {
  getAll: () => api.get(API_ENDPOINTS.NILAI),
  getByPraktikum: (praktikumId) => api.get(API_ENDPOINTS.NILAI_BY_PRAKTIKUM(praktikumId)),
  getByStudent: (studentId) => api.get(API_ENDPOINTS.NILAI_BY_STUDENT(studentId)),
  update: (id, data) => api.put(`${API_ENDPOINTS.NILAI}/${id}`, data)
};

export default api;