// src/api/doctorAuth.js
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth"; // adjust if deployed

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add request interceptor to include auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("doctorToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// API functions
export const doctorAuthAPI = {
  login: async (email, password) => {
    try {
      const response = await api.post("/login", { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post("/register", userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },

  // You can add more API calls here as needed
  // For example:
  getProfile: async () => {
    try {
      const response = await api.get("/profile");
      return response.data;
    } catch (error) {
      throw error.response?.data || error;
    }
  },
};

export default api;