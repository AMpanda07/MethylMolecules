import API from './api';
import { API_ENDPOINTS, STORAGE_KEYS } from '../constants/api';
import { storage } from '../utils/storage';

export const authService = {
  /**
   * Log in user with email and password
   * @param {{ email: string, password: string }} credentials
   * @returns {Promise<{ user: object, token: string }>}
   */
  login: async (credentials) => {
    const response = await API.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    const { token, user } = response.data;
    if (token) {
      storage.set(STORAGE_KEYS.TOKEN, token);
      storage.set(STORAGE_KEYS.USER, user);
    }
    return response.data;
  },

  /**
   * Register a new user
   * @param {{ name: string, email: string, password: string }} userData
   * @returns {Promise<{ user: object, token: string }>}
   */
  register: async (userData) => {
    const response = await API.post(API_ENDPOINTS.AUTH.REGISTER, userData);
    const { token, user } = response.data;
    if (token) {
      storage.set(STORAGE_KEYS.TOKEN, token);
      storage.set(STORAGE_KEYS.USER, user);
    }
    return response.data;
  },

  /**
   * Fetch current authenticated user's profile
   * @returns {Promise<{ user: object }>}
   */
  getMe: async () => {
    const response = await API.get(API_ENDPOINTS.AUTH.ME);
    const { user } = response.data;
    if (user) {
      storage.set(STORAGE_KEYS.USER, user);
    }
    return response.data;
  },

  /**
   * Clear local session credentials
   */
  logout: () => {
    storage.remove(STORAGE_KEYS.TOKEN);
    storage.remove(STORAGE_KEYS.USER);
  },

  /**
   * Get cached user or null
   */
  getCurrentUser: () => {
    return storage.get(STORAGE_KEYS.USER, null);
  },

  /**
   * Check if token exists in storage
   */
  hasToken: () => {
    return Boolean(storage.get(STORAGE_KEYS.TOKEN));
  },
};

export default authService;

