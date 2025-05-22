import axios from 'axios';
import { toast } from 'react-hot-toast';

const API_URL = 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// a request interceptor to include the JWT token in requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async (userData) => {
  const response = await api.post('/users/register/', userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await api.post('/users/token/', credentials);
  if (response.data.access) {
    localStorage.setItem('token', response.data.access);
  }
  return response.data;
};

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem('token');
//       toast.error('Session expired. Please login again.');
//       window.location.href = '/login';
//     }
//     return Promise.reject(error);
//   }
// );

// blog endpoints
export const getAllBlogs = async () => {
  const response = await api.get('/blogs/', {
  //   headers: {
  //     Authorization: `Bearer ${token}`
  //   }
  // }
  });
  return response.data;
};

export const createBlog = async (blogData) => {
  const token = localStorage.getItem('token');
  const response = await api.post('/blogs/', blogData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const updateBlog = async (id, blogData) => {
  const token = localStorage.getItem('token');
  const response = await api.put(`/blogs/${id}/`, blogData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await api.delete(`/blogs/${id}/`);
  return response.data;
};

export default api;