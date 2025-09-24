import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

console.log('API Base URL:', API_BASE_URL);

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('doctorToken') || localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response Success: ${response.config.url}`, response.status);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message
    });
    
    // Handle 401 Unauthorized errors
    if (error.response?.status === 401) {
      clearDoctorData();
      if (!window.location.pathname.includes('/login')) {
        setTimeout(() => {
          window.location.replace('/login?sessionExpired=true');
        }, 1000);
      }
    }
    
    return Promise.reject(error);
  }
);

// ===== TOKEN MANAGEMENT =====
export const getDoctorToken = () => {
  return localStorage.getItem('doctorToken') || localStorage.getItem('token');
};

export const setDoctorToken = (token) => {
  if (token) {
    localStorage.setItem('doctorToken', token);
    localStorage.setItem('token', token);
  }
};

export const clearDoctorData = () => {
  const itemsToRemove = ['doctorToken', 'token', 'doctorProfile', 'lastAuthCheck', 'doctorProfileDraft'];
  itemsToRemove.forEach(item => localStorage.removeItem(item));
};

export const isTokenExpired = () => {
  const token = getDoctorToken();
  if (!token) return true;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 < Date.now();
  } catch (error) {
    console.error('❌ Token validation error:', error);
    return true;
  }
};

export const checkAuthStatus = () => {
  return !isTokenExpired() && getDoctorToken() !== null;
};

// ===== PROFILE MANAGEMENT =====
export const getStoredDoctorProfile = () => {
  try {
    const profile = localStorage.getItem('doctorProfile');
    return profile ? JSON.parse(profile) : null;
  } catch (error) {
    console.error('❌ Error parsing stored profile:', error);
    return null;
  }
};

export const storeDoctorProfile = (profile) => {
  try {
    if (profile) {
      localStorage.setItem('doctorProfile', JSON.stringify(profile));
      localStorage.setItem('lastAuthCheck', Date.now().toString());
    }
  } catch (error) {
    console.error('❌ Error storing profile:', error);
  }
};

// ===== AUTHENTICATION API FUNCTIONS =====
export const loginDoctor = async (credentials) => {
  try {
    const { data } = await api.post('/doctors/login', credentials);
    
    if (data.token && data.doctor) {
      setDoctorToken(data.token);
      storeDoctorProfile(data.doctor);
    }
    
    return { 
      success: true, 
      data, 
      message: 'Login successful' 
    };
  } catch (error) {
    const message = error.response?.data?.message || 
                   error.response?.data?.error ||
                   'Login failed. Please check your credentials.';
    
    return { 
      success: false, 
      message,
      status: error.response?.status,
      error: true 
    };
  }
};

export const registerDoctor = async (doctorData) => {
  try {
    const { data } = await api.post('/doctors/register', doctorData);
    
    if (data.token && data.doctor) {
      setDoctorToken(data.token);
      storeDoctorProfile(data.doctor);
    }
    
    return { 
      success: true, 
      data, 
      message: 'Registration successful' 
    };
  } catch (error) {
    const message = error.response?.data?.message || 
                   error.response?.data?.error ||
                   'Registration failed. Please try again.';
    
    return { 
      success: false, 
      message,
      status: error.response?.status,
      error: true 
    };
  }
};

export const forgotPassword = async (email) => {
  try {
    const { data } = await api.post('/doctors/forgot-password', { email });
    
    return { 
      success: true, 
      data, 
      message: 'Password reset instructions sent to your email' 
    };
  } catch (error) {
    const message = error.response?.data?.message || 
                   error.response?.data?.error ||
                   'Failed to process password reset request. Please try again.';
    
    return { 
      success: false, 
      message,
      status: error.response?.status,
      error: true 
    };
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const { data } = await api.post('/doctors/reset-password', { 
      token, 
      newPassword 
    });
    
    return { 
      success: true, 
      data, 
      message: 'Password reset successfully' 
    };
  } catch (error) {
    const message = error.response?.data?.message || 
                   error.response?.data?.error ||
                   'Failed to reset password. Please try again.';
    
    return { 
      success: false, 
      message,
      status: error.response?.status,
      error: true 
    };
  }
};

// ===== UTILITY FUNCTIONS =====
export const testConnection = async () => {
  try {
    const { data } = await api.get('/health');
    return { 
      success: true, 
      data,
      message: 'Connected to server successfully'
    };
  } catch (error) {
    return { 
      success: false, 
      message: 'Cannot connect to server', 
      status: error.response?.status,
      error: true 
    };
  }
};

// Export the axios instance for direct use if needed
export default api;

// Named export for authentication functions
export const doctorAuthAPI = {
  login: loginDoctor,
  register: registerDoctor,
  forgotPassword: forgotPassword,
  resetPassword: resetPassword,
  getStoredDoctorProfile,
  storeDoctorProfile,
  getDoctorToken,
  setDoctorToken,
  clearDoctorData,
  isTokenExpired,
  checkAuthStatus,
  testConnection
};