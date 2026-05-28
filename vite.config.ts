import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5174, host: true },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // GSAP + plugins are heavy and rarely change — split so they cache forever.
          gsap: ['gsap', '@gsap/react'],
          // React + ReactDOM together, also stable.
          react: ['react', 'react-dom'],
        },
      },
    },
  },
})
