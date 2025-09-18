// src/lib/api.ts
import axios, { AxiosError } from 'axios';

const api = axios.create({
  // Prefer env, else default to /api so Vite proxy (dev) and same-origin (prod) both work
  baseURL: '/api',
  withCredentials: false, // set to false if you don't use cookies
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
});

// Attach Bearer token if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized error handling
api.interceptors.response.use(
  (res) => res,
  (error: AxiosError) => {
    // Example global handling:
    // if (error.response?.status === 401) { /* logout or redirect to /login */ }
    // if (error.code === 'ECONNABORTED') { /* request timeout */ }
    return Promise.reject(error);
  }
);

export default api;
