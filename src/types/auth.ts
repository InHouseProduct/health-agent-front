export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  // Add other user fields as needed
}

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    access_token: string;
    user: User;
  };
}

export interface MeResponse {
  status: string;
  message: string;
  data: {
    user: User;
  };
} 