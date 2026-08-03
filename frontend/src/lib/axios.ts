// frontend/src/lib/axios.ts
import axios from 'axios';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: API_URL,
  withCredentials: true, // sends cookies automatically
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor – attach access token from cookie if present
apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = getCookie('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor – handle token refresh on 401
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token using httpOnly cookie
        const { data } = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );
        const newAccessToken = data.accessToken;
        setCookie('accessToken', newAccessToken, {
          maxAge: 15 * 60, // 15 minutes
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
        });
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed – force logout
        deleteCookie('accessToken');
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
