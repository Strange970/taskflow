// resources/js/Layouts/AuthenticatedLayout.jsx
import React from 'react';
import Navbar from '@/Components/Navbar';

export default function AuthenticatedLayout({ children }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex flex-col">
        <Navbar />
        <div className="flex flex-grow">
            {/* Optional future sidebar for Boards, Tasks, etc. */}
            <aside className="hidden md:block w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
            <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">
                Boards
            </h2>
            <ul className="space-y-2 text-sm">
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                My Tasks
                </li>
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                Personal
                </li>
                <li className="hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer">
                Team
                </li>
            </ul>
            </aside>

            <main className="flex-grow p-6">{children}</main>
        </div>
        </div>
    );
}
