// src/services/favoriteService.js

const API_BASE = 'http://localhost:6543/api';

export const checkIfFavorite = async (propertyId) => {
  try {
    const res = await fetch(`${API_BASE}/favorites/${propertyId}`, {
      method: 'GET',
      credentials: 'include'
    });
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error('Error checking favorite:', err);
    return false;
  }
};

export const addToFavorites = async (propertyId) => {
  try {
    const res = await fetch(`${API_BASE}/favorites`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ property_id: propertyId }),
      credentials: 'include'
    });
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error('Error adding favorite:', err);
    return false;
  }
};

export const removeFromFavorites = async (propertyId) => {
  try {
    const res = await fetch(`${API_BASE}/favorites/${propertyId}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error('Error removing favorite:', err);
    return false;
  }
};