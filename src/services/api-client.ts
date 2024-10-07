import axios from 'axios';

export const baseURL = process.env.REACT_APP_API_BASE_URL_PROD;

const createAxiosInstance = () => {
  const token = localStorage.getItem('authTokens');
  const headers = token ? { Authorization: `Bearer ${JSON.parse(token).access}` } : {};
  return axios.create({
    baseURL,
    headers
  });
};

export const axiosInstance = createAxiosInstance();