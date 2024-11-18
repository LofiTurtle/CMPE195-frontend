import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import istanbul from 'vite-plugin-istanbul'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    istanbul({
      exclude: ['node_modules', 'cypress/'],
      extensions: ['.js', '.jsx'],
      requireEnv: false,
      forceBuildInstrument: true
    })
  ],
  server: {
    host: '127.0.0.1',
    proxy: {
      '/api': 'http://127.0.0.1:5000/'
    }
  },
  build: {
    sourcemap: true
  }
})
