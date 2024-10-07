import axios from 'axios';

export const baseURL = REACT_APP_API_BASE_URL;
console.log('baseURL', baseURL)
console.log('procerss', process.env)
const createAxiosInstance = () => {
  const token = localStorage.getItem('authTokens');
  const headers = token ? { Authorization: `Bearer ${JSON.parse(token).access}` } : {};
  return axios.create({
    baseURL,
    headers
  });
};

export const axiosInstance = createAxiosInstance();