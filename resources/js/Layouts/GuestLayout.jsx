// resources/js/Layouts/GuestLayout.jsx
import React from 'react';
import Navbar from '@/Components/Navbar';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow rounded p-6">
            {children}
            </div>
        </main>
        <footer className="text-center py-6 text-sm text-gray-500 dark:text-gray-400">
            © 2025 Taskflow
        </footer>
        </div>
    );
}
