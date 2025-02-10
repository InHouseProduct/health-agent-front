import { ApiService } from './api.service';
import { AuthResponse, LoginCredentials, MeResponse } from '@/types/auth';

class AuthService extends ApiService {
  constructor() {
    // Since we're already setting baseURL in axios config, we don't need /api here
    super(''); // Empty string as we'll use full paths
  }

  async login(credentials: LoginCredentials) {
    try {
      const response = await this.post<AuthResponse>('/login', credentials);
      console.log('Login response:', response);
      return response;
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('An error occurred during login');
    }
  }

  async me() {
    try {
      const response = await this.get<MeResponse>('/me');
      console.log('Me response:', response);
      return response;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Failed to fetch user data');
    }
  }

  async logout() {
    try {
      return await this.post('/logout', {});
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Logout failed');
    }
  }
}

export const authService = new AuthService(); 