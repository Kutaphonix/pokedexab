import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Tylko podstawowe importy Vuetify (CSS i główna funkcja)
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css' // Jeśli używasz ikon

// Tworzymy pustą instancję Vuetify. 
// Komponenty zaimportują się SAME dzięki vite.config.js!
const vuetify = createVuetify()

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
