import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ApiErrorResponse } from '../models/common/base.types';

export function setupInterceptors(client: AxiosInstance): void {
  client.interceptors.request.use(
    (config) => {
      const token = typeof window !== 'undefined' 
        ? localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
        : null;
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      config.headers['X-Correlation-ID'] = crypto.randomUUID();
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`, {
          params: config.params,
          data: config.data,
        });
      }

      return config;
    },
    (error) => {
      console.error('Request Error:', error);
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(` ${response.status} ${response.config.url}`, response.data);
      }
      return response;
    },
    (error: AxiosError<ApiErrorResponse>) => {
      const errorResponse: ApiErrorResponse = {
        success: false,
        message: 'An error occurred',
        errors: [],
        statusCode: error.response?.status || 500,
      };

      switch (error.response?.status) {
        case 401:
          errorResponse.message = 'Unauthorized access';
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            sessionStorage.removeItem('authToken');
            window.location.href = '/login';
          }
          break;
        case 403:
          errorResponse.message = 'Access forbidden';
          break;
        case 404:
          errorResponse.message = 'Resource not found';
          break;
        case 422:
          errorResponse.message = 'Validation failed';
          errorResponse.errors = error.response.data?.errors || [];
          break;
        case 500:
          errorResponse.message = 'Internal server error';
          break;
        default:
          errorResponse.message = error.response?.data?.message || error.message;
      }

      console.error('API Error:', errorResponse);
      return Promise.reject(errorResponse);
    }
  );
}