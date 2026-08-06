import { defineConfig } from 'vite';

export default defineConfig({
    base: '/movie-tv-explorer/',
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',
                home: 'src/pages/home.html',
                search: 'src/pages/search.html',
                details: 'src/pages/details.html',
                favorites: 'src/pages/favorites.html'
            }
        }
    }
});