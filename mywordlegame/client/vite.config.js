import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
        '/api': 'http://localhost:8080/'
        //  /api means every prefix /api/* should be targeted to the 8080 server not mounting at different server
    }
  }

  
})
