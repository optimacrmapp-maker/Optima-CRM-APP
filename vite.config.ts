import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // A propriedade 'base' é essencial para o GitHub Pages saber em qual pasta o site está.
  // Deve ser o nome exato do seu repositório entre barras.
  base: '/Optima-CRM-APP/',
  
  build: {
    // Isso garante que os arquivos gerados (JS e CSS) fiquem em caminhos que o GitHub entenda.
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
