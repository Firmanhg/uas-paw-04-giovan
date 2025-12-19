// GET INQUIRY BY ID
export const getInquiryById = async (id) => {
  return await API.get(`/inquiries/${id}`);
};
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:6543/api",
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

export default API;

// GET ALL PROPERTIES (with optional filters)
export const getAllProperties = async (filters = {}) => {
  const params = new URLSearchParams();
  
  if (filters.min_price) params.append('min_price', filters.min_price);
  if (filters.max_price) params.append('max_price', filters.max_price);
  if (filters.property_type) params.append('property_type', filters.property_type);
  if (filters.location) params.append('location', filters.location);
  if (filters.min_bedrooms) params.append('min_bedrooms', filters.min_bedrooms);
  if (filters.max_bedrooms) params.append('max_bedrooms', filters.max_bedrooms);
  if (filters.min_bathrooms) params.append('min_bathrooms', filters.min_bathrooms);
  if (filters.agent_id) params.append('agent_id', filters.agent_id);
  
  const queryString = params.toString();
  return await API.get(`/properties${queryString ? '?' + queryString : ''}`);
};

// GET PROPERTY BY ID
export const getPropertyById = async (id) => {
  return await API.get(`/properties/${id}`);
};

// ADD PROPERTY
export const addProperty = async (data) => {
  return await API.post("/properties", data, {
    headers: { "Content-Type": "application/json" }
  });
};

// UPDATE PROPERTY
export const updateProperty = async (id, data) => {
  return await API.put(`/properties/${id}`, data, {
    headers: { "Content-Type": "application/json" }
  });
};

// DELETE PROPERTY
export const deleteProperty = async (id, agentId) => {
  return await API.delete(`/properties/${id}?agent_id=${agentId}`);
};
// ============= AGENT ENDPOINTS =============

// GET ALL AGENTS
export const getAllAgents = async () => {
  return await API.get("/agents");
};

// GET AGENT PROFILE BY ID
export const getAgentProfile = async (id) => {
  return await API.get(`/agents/${id}`);
};

// UPDATE AGENT PROFILE
export const updateAgentProfile = async (id, data) => {
  return await API.put(`/agents/${id}`, data, {
    headers: { "Content-Type": "application/json" }
  });
};

// ============= FAVORITES ENDPOINTS =============

// GET USER FAVORITES
export const getFavorites = async () => {
  return await API.get("/favorites");
};

// ADD TO FAVORITES
export const addToFavorites = async (propertyId) => {
  return await API.post("/favorites", { property_id: propertyId });
};

// REMOVE FROM FAVORITES
export const removeFavorite = async (favoriteId) => {
  return await API.delete(`/favorites/${favoriteId}`);
};

// ============= INQUIRIES ENDPOINTS =============

// GET AGENT INQUIRIES
export const getAgentInquiries = async () => {
  return await API.get("/agent/inquiries");
};

// GET CHAT MESSAGES
export const getChatMessages = async (inquiryId) => {
  return await API.get(`/inquiries/${inquiryId}/messages`);
};

// SEND CHAT MESSAGE
export const sendChatMessage = async (inquiryId, messageData) => {
  return await API.post(`/inquiries/${inquiryId}/messages`, messageData);
};