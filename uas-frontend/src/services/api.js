import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // ubah sesuai backend kamu
});

// ADD PROPERTY
export const addProperty = async (data) => {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return await API.post("/properties", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};

// GET PROPERTY BY ID
export const getPropertyById = async (id) => {
  return await API.get(`/properties/${id}`);
};

// UPDATE PROPERTY
export const updateProperty = async (id, data) => {
  const formData = new FormData();
  for (let key in data) {
    formData.append(key, data[key]);
  }

  return await API.put(`/properties/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });
};
