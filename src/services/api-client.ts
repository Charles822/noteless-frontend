import axios from 'axios';

export const baseURL = 'http://127.0.0.1:8000';

const createAxiosInstance = () => {
  const token = localStorage.getItem('authTokens');
  const headers = token ? { Authorization: `Bearer ${JSON.parse(token).access}` } : {};
  return axios.create({
    baseURL,
    headers
  });
};

export const axiosInstance = createAxiosInstance();