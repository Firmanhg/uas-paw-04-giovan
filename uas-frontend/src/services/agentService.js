import axios from 'axios';

const API_URL = 'http://localhost:6543/api';

// Configure axios to send cookies
axios.defaults.withCredentials = true;

/**
 * Get agent statistics
 */
export const getAgentStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/agent/stats`);
    return response.data;
  } catch (error) {
    console.error('Error fetching agent stats:', error);
    throw error.response?.data || { success: false, message: 'Failed to fetch stats' };
  }
};

/**
 * Get agent's properties
 */
export const getAgentProperties = async () => {
  try {
    const response = await axios.get(`${API_URL}/agent/properties`);
    return response.data;
  } catch (error) {
    console.error('Error fetching agent properties:', error);
    throw error.response?.data || { success: false, message: 'Failed to fetch properties' };
  }
};

/**
 * Get inquiries for agent's properties
 */
export const getAgentInquiries = async () => {
  try {
    const response = await axios.get(`${API_URL}/agent/inquiries`);
    return response.data;
  } catch (error) {
    console.error('Error fetching agent inquiries:', error);
    throw error.response?.data || { success: false, message: 'Failed to fetch inquiries' };
  }
};

export default {
  getAgentStats,
  getAgentProperties,
  getAgentInquiries
};
