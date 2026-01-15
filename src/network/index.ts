import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// Backend API response structure
export interface BackendResponse {
  status?: boolean;
  message?: string;
  [key: string]: unknown; // Allow additional fields
}

// Custom API Error class to preserve response data
export class ApiError extends Error {
  response?: AxiosResponse;
  status?: number;
  data: BackendResponse; // Backend response data

  constructor(message: string, response?: AxiosResponse) {
    super(message);
    this.name = "ApiError";
    this.response = response;
    this.status = response?.status;
    this.data = (response?.data as BackendResponse) || {};
  }
}

// Type helper for error handling in components
export type APIError = {
  message: string;
  data: BackendResponse;
  status?: number;
};

// Base API configuration
const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Response interceptor - global error handling
api.interceptors.response.use(
  (response) => {
    if (
      response.data &&
      typeof response.data.status === "boolean" &&
      !response.data.status
    ) {
      console.error("API Error:", response.data);

      const error = new ApiError(
        response.data.message || "Request failed",
        response
      );
      return Promise.reject(error);
    }
    return response;
  },
  (error: AxiosError) => {
    // Global error handling for network errors
    console.error("Network Error:", error.response?.data || error.message);

    // Preserve the full error with response data
    if (error.response) {
      const responseData = error.response.data as BackendResponse;
      const apiError = new ApiError(
        responseData?.message || error.message || "Network error",
        error.response
      );
      return Promise.reject(apiError);
    }

    // No response (network failure, timeout, etc.)
    return Promise.reject(new ApiError(error.message || "Network error"));
  }
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const get = <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return api.get<T>(url, config);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const post = <T = any>(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return api.post<T>(url, data, config);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const put = <T = any>(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return api.put<T>(url, data, config);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const patch = <T = any>(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return api.patch<T>(url, data, config);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const del = <T = any>(
  url: string,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return api.delete<T>(url, config);
};

export default api;
