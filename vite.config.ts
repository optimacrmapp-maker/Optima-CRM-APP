import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Optima-CRM-APP/', // Isso garante que o site saiba onde encontrar as imagens e scripts
})
