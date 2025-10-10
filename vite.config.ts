import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/', // 👈 Esto es clave para dominios personalizados
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
