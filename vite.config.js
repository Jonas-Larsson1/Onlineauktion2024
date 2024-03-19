import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig({

  plugins: [react()],

  server: {

    proxy: {

      // localhost:5173/api -> localhost:3000/

      '/api': {

        // url som vi vill skicka till, från vår react app

        target: 'http://localhost:3000',

        changeOrigin: true,

        // tar bort /api/ från vår path

        rewrite: (path) => path.replace(/^\/api/, '')

      },

    }

  }

})