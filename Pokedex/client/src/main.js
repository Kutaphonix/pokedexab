import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'

// Import stylów - zostawiamy tylko to
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// USUŃ: import * as components i directives!
// Inicjalizujemy puste Vuetify, bo vite.config.js zajmie się resztą
const vuetify = createVuetify()

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(vuetify)

app.mount('#app')
