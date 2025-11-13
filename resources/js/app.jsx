// resources/js/app.jsx

import '../css/app.css';
import { createInertiaApp } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ThemeProvider from '@/Components/ThemeProvider';
import { route } from 'ziggy-js';
import { Ziggy } from './ziggy';

window.Ziggy = Ziggy;
window.route = (name, params, absolute) => route(name, params, absolute, Ziggy);


const appName = import.meta.env.VITE_APP_NAME || 'Taskflow';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        createRoot(el).render(
        <ThemeProvider>
            <App {...props} />
        </ThemeProvider>
        );
    },
});
