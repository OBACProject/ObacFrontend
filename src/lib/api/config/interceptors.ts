'use client';
import { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import { ApiErrorResponse } from '../models/common/base.types';
import Cookies from 'js-cookie';

export function setupInterceptors(client: AxiosInstance): void {

  const flagged = client as AxiosInstance & { __authInterceptorsAttached?: boolean };
  if (flagged.__authInterceptorsAttached) return;
  flagged.__authInterceptorsAttached = true;

  client.interceptors.request.use(
    (config) => {
      const token = Cookies.get('token');
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      config.headers['X-Correlation-ID'] = crypto.randomUUID();
      

      return config;
    },
    (error) => {
      console.error('Request Error:', error);
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError<ApiErrorResponse>) => {
      const errorResponse: ApiErrorResponse = {
        message: 'An error occurred',
        errors: [],
        statusCode: error.response?.status || 500,
      };

      switch (error.response?.status) {
        case 401:
          errorResponse.message = 'Unauthorized access';
          if (typeof window !== 'undefined') {

            Cookies.remove('token');
            Cookies.remove('role');
            Cookies.remove('name');
            Cookies.remove('userId');
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