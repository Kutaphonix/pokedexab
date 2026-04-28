import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineConfig({
  // Dla Rendera "/" to poprawna ścieżka główna
  base: '/', 
  
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // Vuetify z auto-importem jest kluczowe dla poprawnych stylów
    vuetify({
      autoImport: true,
    }),
  ],

  resolve: {
    alias: {
      // Pozwala na używanie skrótu "@" zamiast "./src"
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },

  build: {
    // To wymusza czyszczenie folderu dist przed każdym budowaniem
    emptyOutDir: true,
    // To zapewnia, że pliki będą miały przewidywalną strukturę
    assetsDir: 'assets',
  }
})
