import axios from 'axios';

const API_URL = 'http://localhost:6543/api';

// Configure axios untuk include credentials (cookies)
axios.defaults.withCredentials = true;

/**
 * Register new user
 * @param {Object} userData - { name, email, password, role, phone }
 * @returns {Promise<Object>} Response with success status and user data
 */
export const register = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Registration failed'
    };
  }
};

/**
 * Login user
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} Response with success status, user data, and token
 */
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    if (response.data.success) {
      // Save user data and token to localStorage
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.user.role);
    }
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed'
    };
  }
};

/**
 * Logout user
 * @returns {Promise<Object>} Response with success status
 */
export const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    // Clear localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    return response.data;
  } catch (error) {
    // Clear localStorage even if API call fails
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    return {
      success: false,
      message: error.response?.data?.message || 'Logout failed'
    };
  }
};

/**
 * Get current logged in user
 * @returns {Promise<Object>} Response with success status and user data
 */
export const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`);
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to get user info'
    };
  }
};

/**
 * Check if user is logged in
 * @returns {boolean} True if user is logged in
 */
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

/**
 * Get user from localStorage
 * @returns {Object|null} User object or null
 */
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};