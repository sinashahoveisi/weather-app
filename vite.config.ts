import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {VitePWA} from 'vite-plugin-pwa';
// import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
// import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        short_name: 'WeatherApp',
        name: 'WeatherApplication',
        lang: 'en',
        dir: 'ltr',
        start_url: '/',
        scope: '.',
        display: 'standalone',
        orientation: 'portrait',
        theme_color: '#ffffff',
        background_color: '#171923',
        icons: [
          {
            src: './images/android/48.png',
            type: 'image/png',
            sizes: '48x48',
            purpose: 'any maskable'
          },
          {
            src: './images/android/72.png',
            type: 'image/png',
            sizes: '72x72',
            purpose: 'any maskable'
          },
          {
            src: './images/android/96.png',
            type: 'image/png',
            sizes: '96x96',
            purpose: 'any maskable'
          },
          {
            src: './images/android/144.png',
            type: 'image/png',
            sizes: '144x144',
            purpose: 'any maskable'
          },
          {
            src: './images/android/192.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'any maskable'
          },
          {
            src: './images/android/512.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000
  }
});
