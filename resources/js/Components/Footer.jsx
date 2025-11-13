import React, { useContext } from 'react';
import { ThemeContext } from '@/Components/ThemeProvider';
import { route } from 'ziggy-js';

export default function Navbar() {
    const { theme } = useContext(ThemeContext);

    return (
        <footer className="text-center text-gray-500 dark:text-gray-400 text-sm py-6 mt-auto">
            © {new Date().getFullYear()} Taskflow. All rights reserved.
        </footer>
    )
}