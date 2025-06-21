// Base API Response structure
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
  statusCode?: number;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors: string[];
  statusCode: number;
  details?: Record<string, any>;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
  statusCode?: number;
}

export interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt?: string;
}

export interface AuditFields {
  createdBy?: string;
  updatedBy?: string;
  createdAt: string;
  updatedAt?: string;
}