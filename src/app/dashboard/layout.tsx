'use client'

import { useState, useEffect } from 'react';
import {
    HomeIcon,
    UsersIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    ArrowLeftOnRectangleIcon,
    UserCircleIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '@/hooks/useAuth';

const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Users', href: '/dashboard/users', icon: UsersIcon },
    { name: 'Analytics', href: '/dashboard/analytics', icon: ChartBarIcon },
    { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout, refetchUser } = useAuth();

    // Fetch user data when component mounts
    useEffect(() => {
        refetchUser();
    }, [refetchUser]);

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
                <div className="flex h-full flex-col">
                    {/* User info */}
                    <div className="flex items-center space-x-3 p-4 border-b border-gray-200">
                        <UserCircleIcon className="h-8 w-8 text-gray-400" />
                        <div>
                            <p className="text-sm font-medium text-gray-900">
                                {user?.name || 'Loading...'}
                            </p>
                            <p className="text-xs text-gray-500">
                                {user?.email || ''}
                            </p>
                        </div>
                    </div>

                    {/* Sidebar header */}
                    <div className="flex h-16 items-center justify-center border-b border-gray-200">
                        <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 px-2 py-4">
                        {navigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            >
                                <item.icon
                                    className="mr-3 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                                    aria-hidden="true"
                                />
                                {item.name}
                            </a>
                        ))}
                    </nav>

                    {/* Logout button */}
                    <div className="border-t border-gray-200 p-4">
                        <button
                            onClick={logout}
                            className="group flex w-full items-center px-2 py-2 text-sm font-medium rounded-md text-red-600 hover:bg-red-50"
                        >
                            <ArrowLeftOnRectangleIcon
                                className="mr-3 h-6 w-6 flex-shrink-0 text-red-400 group-hover:text-red-500"
                                aria-hidden="true"
                            />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="pl-64">
                <main className="py-10">
                    <div className="px-4 sm:px-6 lg:px-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
} 