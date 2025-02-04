'use client'

import { useMutation } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { LoginCredentials } from '@/types/auth';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const router = useRouter();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (response) => {
      // Store token
      localStorage.setItem('token', response.data.token);
      // Redirect to dashboard
      router.push('/dashboard');
    },
  });

  return {
    login: loginMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
  };
}; 