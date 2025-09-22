// src/api/doctorApi.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';


console.log('API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('doctorToken');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (config.method === 'get') config.params = { ...config.params, _t: Date.now() };
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('doctorToken');
      window.location.replace('/doctor/login');
    }
    return Promise.reject(error);
  }
);

// --- API Functions ---

export const getDoctorProfile = async () => {
  try {
    const { data } = await api.get('/doctors/profile');
    return { success: true, data, message: 'Profile loaded successfully' };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message, status: error.response?.status };
  }
};

// Update doctor profile
export const updateDoctorProfile = async (profileData) => {
  try {
    const { data } = await api.put('/doctors/profile', profileData);
    return { success: true, data, message: 'Profile updated successfully' };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message, status: error.response?.status };
  }
};

// Change doctor password
export const changeDoctorPassword = async (oldPassword, newPassword) => {
  try {
    const { data } = await api.put('/doctors/change-password', { oldPassword, newPassword });
    return { success: true, data, message: 'Password changed successfully' };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || error.message, status: error.response?.status };
  }
};

export const testConnection = async () => {
  try {
    const { data } = await api.get('/health');
    return { success: true, data };
  } catch (error) {
    return { success: false, message: 'Cannot connect to server', status: error.response?.status };
  }
};

export default api;
