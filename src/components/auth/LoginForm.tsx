'use client'

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { LoginCredentials } from '@/types/auth';

const loginSchema = yup.object({
    email: yup
        .string()
        .required('Email is required')
        .email('Please enter a valid email')
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'Invalid email format'
        )
        .trim(),
    password: yup
        .string()
        .required('Password is required')
        .min(6, 'Password must be at least 6 characters')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).*$/,
            'Password must contain at least one uppercase letter, one lowercase letter, and one number'
        ),
});

export const LoginForm = () => {
    const { login, isLoading, error } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isDirty, isValid },
        reset,
    } = useForm<LoginCredentials>({
        resolver: yupResolver(loginSchema),
        mode: 'onChange',
    });

    const onSubmit = async (data: LoginCredentials) => {
        try {
            await login(data);
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
                <div className="bg-red-50 p-4 rounded-md">
                    <p className="text-red-500 text-sm">
                        {error instanceof Error ? error.message : 'An error occurred during login'}
                    </p>
                </div>
            )}

            <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                {...register('email')}
                error={errors.email}
                aria-invalid={errors.email ? 'true' : 'false'}
            />

            <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                {...register('password')}
                error={errors.password}
                aria-invalid={errors.password ? 'true' : 'false'}
            />

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                    </label>
                </div>

                <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot your password?
                    </a>
                </div>
            </div>

            <button
                type="submit"
                disabled={isLoading || isSubmitting || !isDirty || !isValid}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white
                    ${isLoading || isSubmitting || !isDirty || !isValid
                        ? 'bg-indigo-400 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                    }
                `}
            >
                {isLoading || isSubmitting ? (
                    <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Signing in...
                    </span>
                ) : (
                    'Sign in'
                )}
            </button>

            <div className="text-center">
                <p className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign up
                    </a>
                </p>
            </div>
        </form>
    );
}; 