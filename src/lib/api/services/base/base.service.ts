import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { apiClient } from '../../config/axios-config';
import { setupInterceptors } from '../../config/interceptors';
import { ApiResponse } from '../../models/common/base.types';

export abstract class BaseService {
  protected client: AxiosInstance;

  constructor(customClient?: AxiosInstance) {
    this.client = customClient || apiClient;
    setupInterceptors(this.client);
  }

  protected async get<T>(
    url: string, 
    params?: any, 
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.get<ApiResponse<T>>(url, {
      params,
      ...config,
    });
    return this.handleResponse(response);
  }

  protected async post<T>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<ApiResponse<T>>(url, data, config);
    return this.handleResponse(response);
  }

  protected async put<T>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.put<ApiResponse<T>>(url, data, config);
    return this.handleResponse(response);
  }

  protected async patch<T>(
    url: string, 
    data?: any, 
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.patch<ApiResponse<T>>(url, data, config);
    return this.handleResponse(response);
  }

  protected async delete<T>(
    url: string, 
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.delete<ApiResponse<T>>(url, {
      ...config,
      data,
    });
    return this.handleResponse(response);
  }

  private handleResponse<T>(response: AxiosResponse<ApiResponse<T>>): T {
    const { data } = response;

    if (data.responseCode !== '200') {
      throw new Error(data.responseMessage || 'API request failed');
    }

    return data.data;
  }

}