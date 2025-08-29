import axios from 'axios';

// ✅ Dynamically use API URL from env
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // allow cookies if backend sets them
  timeout: 20000,        // prevent hanging requests
});

// ✅ Attach token if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    let errorMessage = 'An unexpected error occurred';

    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;

      if (status === 401) {
        errorMessage = 'Your session has expired. Please log in again.';
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      } else if (status === 403) {
        errorMessage = 'You do not have permission to perform this action';
      } else if (status === 404) {
        errorMessage = 'The requested resource was not found';
      } else if (status >= 400 && status < 500) {
        errorMessage = data.message || 'Invalid request';
      } else if (status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      }
    } else if (error.request) {
      errorMessage = 'No response from server. Please check your connection.';
      console.error('Network error:', error);
    }

    console.error('API Error:', errorMessage);
    return Promise.reject(error);
  }
);

export default api;
