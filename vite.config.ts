import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Optima-CRM-APP/', // Adicione o nome do seu repositório aqui entre barras
})
