'use client'

import { QueryClient, QueryClientProvider as TanstackQueryClientProvider } from "@tanstack/react-query"
import { useState } from "react"
import { Toaster } from 'react-hot-toast';

export default function QueryClientProvider({
    children
}: {
    children: React.ReactNode
}) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: 1,
            },
        },
    }))

    return (
        <TanstackQueryClientProvider client={queryClient}>
            <Toaster position="top-right" />
            {children}
        </TanstackQueryClientProvider>
    )
} 