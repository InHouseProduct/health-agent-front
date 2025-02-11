'use client'

import { useMutation, useQuery } from '@tanstack/react-query';
import { authService } from '@/services/auth.service';
import { LoginCredentials, User } from '@/types/auth';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  // Query for fetching user data
  const { data: userData, refetch: refetchUser } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      try {
        const response = await authService.me();
        return response.data;
      } catch (error) {
        return null;
      }
    },
    enabled: false, // Don't fetch automatically
  });

  // Update user state when userData changes
  useEffect(() => {
    if (userData) {
      setUser(userData);
    }
  }, [userData]);

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: async (response) => {
      const token = response.data.access_token;
      
      if (token) {
        localStorage.setItem('token', token);
        document.cookie = `token=${token}; path=/`;
        
        // Fetch user data after successful login
        await refetchUser();
        
        toast.success('Login successful!');
        router.push('/dashboard');
      } else {
        toast.error('No authentication token received');
      }
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Login failed');
    },
  });

  const logout = async () => {
    try {
      await authService.logout();
      localStorage.removeItem('token');
      document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      setUser(null);
      toast.success('Logged out successfully');
      router.push('/login');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return {
    user,
    login: loginMutation.mutate,
    logout,
    isLoading: loginMutation.isPending,
    refetchUser,
  };
}; 