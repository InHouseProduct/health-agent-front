export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: {
    user: {
      id: number;
      name: string;
      email: string;
      access_token: string;
      // Add other user fields as needed
    };
  };
} 