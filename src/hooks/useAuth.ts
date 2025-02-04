'use client'

import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { LoginCredentials } from '@/types/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export const useAuth = () => {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (response) => {
      // Store token
      localStorage.setItem('token', response.data.token);
      
      // Show success message
      toast.success('Login successful!');
      
      // Redirect to dashboard
      router.push('/dashboard');
    },
    onError: (error: Error) => {
      // Show error message
      toast.error(error.message || 'Login failed');
    },
  });

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return {
    login: loginMutation.mutate,
    logout,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
}; 