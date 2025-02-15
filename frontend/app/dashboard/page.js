import ProtectedRoute from '@/components/ProtectedRoute'
import React from 'react'

const page = () => {
    return (
        <ProtectedRoute>
            <div className="flex items-center justify-center min-h-screen bg-background text-foreground">
                Dashboard
            </div>
        </ProtectedRoute>
    )
}

export default page