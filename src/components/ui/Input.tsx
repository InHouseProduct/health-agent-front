'use client'

import { forwardRef } from 'react';
import { FieldError } from 'react-hook-form';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: FieldError;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, ...props }, ref) => {
        return (
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    {label}
                </label>
                <input
                    ref={ref}
                    className={`block w-full rounded-md shadow-sm
                        px-4 py-3 text-base text-gray-900
                        bg-white
                        focus:border-indigo-500 focus:ring-indigo-500
                        ${error
                            ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                            : 'border-gray-300'
                        }
                    `}
                    {...props}
                />
                {error && (
                    <p className="text-red-500 text-xs mt-1">{error.message}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input'; 