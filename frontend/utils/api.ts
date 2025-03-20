// frontend/utils/api.ts (Create a utility file for API calls)
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL; // Ensure this is set in your .env file

// Function to get the token from localStorage
const getToken = () => {
  return localStorage.getItem('authToken');
};

// Example function to add to cart
export const addToCart = async (productId: string, quantity: number) => {
  const token = getToken();
  const response = await axios.post(
    `${API_URL}/api/cart/add`,
    { productId, quantity },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    }
  );
  return response.data;
};