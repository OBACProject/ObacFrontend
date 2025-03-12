import axios, { AxiosInstance } from "axios";

const API_BASE_URL = process.env.API_URL_V1;

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // optional: request timeout
});

// Add request interceptor (e.g., for adding headers)
// api.interceptors.request.use(
//   (config: AxiosRequestConfig) => {
//     const token = localStorage.getItem("accessToken"); // or retrieve token from cookies
//     if (token) {
//       config.headers = {
//         ...config.headers,
//         Authorization: `Bearer ${token}`,
//       };
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Add response interceptor (e.g., for handling errors globally)
// api.interceptors.response.use(
//   (response: AxiosResponse) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Handle unauthorized error (optional)
//       console.log("Unauthorized! Redirecting to login...");
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
