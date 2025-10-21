// src/api.js
import axios from "axios";

// Create an Axios instance
const axiosHelper = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// GET request
export const GET = async (endpoint, params = {}) => {
  try {
    const response = await axiosHelper.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
};

// POST request
export const POST = async (endpoint, payload) => {
  try {
    const response = await axiosHelper.post(endpoint, payload);
    return response.data;
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
};

export default axiosHelper;
