import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // A 'base' precisa ser o nome exato do seu repositório entre barras.
  // Isso garante que o GitHub saiba onde buscar os arquivos JS e CSS.
  base: '/Optima-CRM-APP/',

  build: {
    // Define a pasta de saída para o deploy
    outDir: 'dist',
    // Garante que os arquivos de assets fiquem organizados
    assetsDir: 'assets',
    // Melhora a compatibilidade do build
    sourcemap: false
  },
  
  resolve: {
    alias: {
      // Isso ajuda a evitar erros de caminhos de arquivos
      "@": "/src",
    },
  },
})
