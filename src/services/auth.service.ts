import { ApiService } from './api.service';
import { AuthResponse, LoginCredentials } from '@/types/auth';

class AuthService extends ApiService {
  constructor() {
    super('/auth'); // Base URL for auth endpoints
  }

  async login(credentials: LoginCredentials) {
    try {
      const response = await this.post<AuthResponse>('/login', credentials);
      return response;
    } catch (error: any) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error('An error occurred during login');
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