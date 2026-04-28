import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/', 
  
  plugins: [
    vue()
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: {
    // TĄ LINIJKĄ WYŁĄCZAMY ZGNIATANIE KODU, KTÓRE PSUJE VUETIFY:
    minify: false, 
    
    emptyOutDir: true,
    assetsDir: 'assets',
  }
})
