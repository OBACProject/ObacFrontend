import axios, { AxiosInstance } from "axios";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL_V1 || "http://localhost:5111/api";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL_V2 || "http://localhost:5111/api";
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, 
});

export default apiClient;
