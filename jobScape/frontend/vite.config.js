import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensures app works correctly from the root of your domain
  server: {
    port: 5174,
    strictPort: true,
  },
})
