// frontend/pages/api/auth.ts
import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/auth'; // Adjust the URL as needed
const API_URL = `/api/auth`; // Adjust the URL as needed

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const response = await axios.post(`${API_URL}/register`, req.body);
      res.status(201).json(response.data);
    } catch (error: any) {
      res.status(error.response?.status || 500).json({ message: error.message });
    }
  }
}