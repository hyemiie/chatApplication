import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 10000, // or any other port Render expects
    host: '0.0.0.0', // Listen on all interfaces
  },

})
