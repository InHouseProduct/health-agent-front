import { ApiService } from './api.service';
import { AuthResponse, LoginCredentials } from '@/types/auth';

class AuthService extends ApiService {
  constructor() {
    super('/auth'); // Base URL for auth endpoints
  }

  async login(credentials: LoginCredentials) {
    return this.post<AuthResponse>('/login', credentials);
  }

  async logout() {
    return this.post('/logout', {});
  }
}

export const authService = new AuthService(); 