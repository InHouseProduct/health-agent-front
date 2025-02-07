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
      console.log('Login successful, response:', response); // Debug log
      const token = response.data.access_token;
      
      if (token) {
        localStorage.setItem('token', token);
        toast.success('Login successful!');
        
        // Add a small delay before navigation
        setTimeout(() => {
          console.log('Attempting to navigate to dashboard...'); // Debug log
          router.push('/dashboard');
          // Force a hard navigation if router.push doesn't work
          window.location.href = '/dashboard';
        }, 100);
      } else {
        console.error('No token in response:', response); // Debug log
        toast.error('No authentication token received');
      }
    },
    onError: (error: Error) => {
      console.error('Login error:', error); // Debug log
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
  };
}; 