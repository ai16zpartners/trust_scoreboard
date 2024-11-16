import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_NEST_API_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercept requests and add the authorization token if it exists
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export const get = (url, config = {}) => axiosInstance.get(url, config);
// export const post = (url, data, config = {}) => axiosInstance.post(url, data, config);
// export const put = (url, data, config = {}) => axiosInstance.put(url, data, config);
// export const patch = (url, data, config = {}) => axiosInstance.patch(url, data, config);
// export const del = (url, config = {}) => axiosInstance.delete(url, config);