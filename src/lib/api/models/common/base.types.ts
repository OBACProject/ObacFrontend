// Base API Response structure
export interface ApiResponse<T = any> {
  responseCode: string;
  responseMessage: string;
  data: T;
  error?: {
    code: string;
    message: string;
  };
}

export interface ApiErrorResponse {
  message: string;
  responseCode?: string;
  responseMessage?: string;
  statusCode?: number;
  errors?: Array<{ field?: string; message: string }>;
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
