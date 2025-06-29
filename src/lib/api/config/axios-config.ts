import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface ApiConfig {
  baseURL: string;
  timeout: number;
  // withCredentials: boolean;
}

export const defaultApiConfig: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL_V2 || 'http://localhost:3000/api/v2',
  timeout: 30000,
  // withCredentials: true,
};

export function createAxiosInstance(config: Partial<ApiConfig> = {}): AxiosInstance {
  const finalConfig = { ...defaultApiConfig, ...config };
  
  const instance = axios.create({
    baseURL: finalConfig.baseURL,
    timeout: finalConfig.timeout,
    // withCredentials: finalConfig.withCredentials,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  return instance;
}

export const apiClient = createAxiosInstance();