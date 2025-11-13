// resources/js/Components/Navbar.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '@/Components/ThemeProvider';
import { Link, usePage } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Navbar() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const { auth } = usePage().props;

    return (
        <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex items-center space-x-2">
            <Link href={route('home')} className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Taskflow
            </Link>
        </div>

        <div className="flex items-center space-x-4">
            {/* Dark mode toggle */}
            <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
            title="Toggle theme"
            >
            {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V3a1 1 0 0 1 1-1zM4.22 4.22a1 1 0 0 1 1.42 0L6.34 5a1 1 0 1 1-1.42 1.42L4.22 5.64a1 1 0 0 1 0-1.42zM2 10a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1zm7 7a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H10a1 1 0 0 1-1-1zm6.78-1.78a1 1 0 0 1 0 1.42L15 16.78a1 1 0 0 1-1.42-1.42l.78-.78a1 1 0 0 1 1.42 0zM17 10a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1zm-2.22-5.78a1 1 0 0 1 1.42 1.42l-.78.78A1 1 0 0 1 13 6.78l.78-.78z" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 1 1 6.707 2.707a8.001 8.001 0 0 0 10.586 10.586z" />
                </svg>
            )}
            </button>

            {/* Auth links */}
            {auth?.user ? (
            <Link
                href={route('dashboard')}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            >
                Dashboard
            </Link>
            ) : (
            <>
                <Link
                href={route('login')}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                >
                Log in
                </Link>
                <Link
                href={route('register')}
                className="ml-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
                >
                Sign up
                </Link>
            </>
            )}
        </div>
        </nav>
    );
}
