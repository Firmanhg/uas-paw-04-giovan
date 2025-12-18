import api from './api';

export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    
    if (response.data.success) {
      localStorage.setItem('user', JSON.stringify(response.data.user));
      // Trigger custom event to update Navbar
      window.dispatchEvent(new Event('userChanged'));
    }
    
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
    localStorage.removeItem('user');
    // Trigger custom event to update Navbar
    window.dispatchEvent(new Event('userChanged'));
  } catch (error) {
    localStorage.removeItem('user');
    window.dispatchEvent(new Event('userChanged'));
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const isAuthenticated = () => {
  return getCurrentUser() !== null;
};

export const isAgent = () => {
  const user = getCurrentUser();
  return user?.role === 'agent';
};

export const isBuyer = () => {
  const user = getCurrentUser();
  return user?.role === 'buyer';
};