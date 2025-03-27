// frontend/utils/api.ts (Create a utility file for API calls)
import axios from 'axios';

const isServer = typeof window === 'undefined';
const BASE_URL = isServer ? 'http://13.201.137.93:5000' : '';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to handle auth tokens
api.interceptors.request.use((config) => {
  if (!isServer) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem('authToken');
};

// Example function to add to cart
export const addToCart = async (productId: string, quantity: number) => {
  const token = getToken();
  const response = await axios.post(
    `${BASE_URL}/api/cart/add`,
    { productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    }
  );
  return response.data;
};