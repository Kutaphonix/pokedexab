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
    minify: false, // 1. Wyłącza zgniatanie (psucie Vuetify pod literkę 'e')
    target: 'esnext', // 2. Zapobiega błędom eksportów
    commonjsOptions: {
      transformMixedEsModules: true, // 3. Naprawia błąd '__exportAll' w Axiosie
    },
    emptyOutDir: true,
  }
})
