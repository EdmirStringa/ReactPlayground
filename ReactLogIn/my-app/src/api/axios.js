import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7025/api', // match your .NET project's actual port
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;