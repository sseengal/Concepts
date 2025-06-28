import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
    base: '/',
    plugins: [react()],
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
        },
        extensions: ['.js', '.jsx', '.json'],
    },
    server: {
        port: 5174,
        strictPort: true,
        hmr: {
            protocol: 'ws',
            host: 'localhost',
            port: 5174,
        },
        watch: {
            usePolling: true,
        },
    },
    preview: {
        port: 5174,
        strictPort: true,
    },
    optimizeDeps: {
        include: ['react', 'react-dom', 'react-router-dom'],
    },
});
