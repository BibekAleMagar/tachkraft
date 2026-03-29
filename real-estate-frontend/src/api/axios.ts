import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_APP_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Or wherever you store your JWT
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});