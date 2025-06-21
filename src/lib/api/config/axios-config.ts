import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface ApiConfig {
  baseURL: string;
  timeout: number;
  withCredentials: boolean;
}

export const defaultApiConfig: ApiConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://localhost:5001',
  timeout: 30000,
  withCredentials: true,
};

export function createAxiosInstance(config: Partial<ApiConfig> = {}): AxiosInstance {
  const finalConfig = { ...defaultApiConfig, ...config };
  
  const instance = axios.create({
    baseURL: finalConfig.baseURL,
    timeout: finalConfig.timeout,
    withCredentials: finalConfig.withCredentials,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  return instance;
}

// Main API instance
export const apiClient = createAxiosInstance();