import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_ENDPOINT,
  headers: {
    'content-type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    accept: 'application/json,',
    withCredentials: true,
  },
});

api.interceptors.request.use(function (config) {
  return config;
});

export default api;
