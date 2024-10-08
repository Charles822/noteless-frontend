import axios from 'axios';

export const baseURL = import.meta.env.VITE_API_BASE_URL;
console.log('baseURL', baseURL)
const createAxiosInstance = () => {
  const token = localStorage.getItem('authTokens');
  const headers = token ? { Authorization: `Bearer ${JSON.parse(token).access}` } : {};
  return axios.create({
    baseURL,
    headers
  });
};

export const axiosInstance = createAxiosInstance();