import apiClient from '@/config/axios';
import { ApiResponse, PaginatedResponse } from '@/types/api';

export class ApiService {
  constructor(private readonly baseUrl: string) {}

  async get<T>(endpoint: string) {
    const { data } = await apiClient.get<ApiResponse<T>>(`${this.baseUrl}${endpoint}`);
    return data;
  }

  async getPaginated<T>(endpoint: string) {
    const { data } = await apiClient.get<PaginatedResponse<T>>(`${this.baseUrl}${endpoint}`);
    return data;
  }

  async post<T>(endpoint: string, payload: any) {
    const { data } = await apiClient.post<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, payload);
    return data;
  }

  async put<T>(endpoint: string, payload: any) {
    const { data } = await apiClient.put<ApiResponse<T>>(`${this.baseUrl}${endpoint}`, payload);
    return data;
  }

  async delete<T>(endpoint: string) {
    const { data } = await apiClient.delete<ApiResponse<T>>(`${this.baseUrl}${endpoint}`);
    return data;
  }
} 