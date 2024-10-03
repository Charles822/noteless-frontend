import axios from 'axios';

export const baseURL = 'http://127.0.0.1:8000';

const createAxiosInstance = () => {
  const token = localStorage.getItem('authToken');
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  return axios.create({
    baseURL,
    headers
  });
};

export const axiosInstance = createAxiosInstance();




// import axios from 'axios';

// const token = import.meta.env.VITE_API_TOKEN;

// export const baseURL = 'http://127.0.0.1:8000';


// export default axios.create({
//   baseURL,
//   headers: {
//     Authorization: `Bearer ${token}`
//   }
// });