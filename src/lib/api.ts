import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // proxy will forward this to backend
  withCredentials: true,
});

export default api;
