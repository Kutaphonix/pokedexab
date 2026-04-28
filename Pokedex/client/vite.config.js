import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineConfig({
  base: '/', 
  
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    vuetify({
      autoImport: true,
    }),
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: {
    // 1. Zmusza serwer do użycia nowoczesnego JS'a
    target: 'esnext', 
    
    // 2. MAGIA: Tłumaczy problematyczne moduły (takie jak Axios) bez wywalania błędu __exportAll
    commonjsOptions: {
      transformMixedEsModules: true, 
    },
    
    emptyOutDir: true,
  }
})
