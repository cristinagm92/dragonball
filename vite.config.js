import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/dragonball/', // 👈 Añadimos esta línea
  plugins: [react()],
  server: {
    open: '/',
    watch: {
      usePolling: true
    }
  }
});
