import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia' // Dodaj to
import { createVuetify } from 'vuetify'

// Import stylów
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)
const pinia = createPinia() // Stwórz instancję

app.use(pinia)   // Zarejestruj Pinię przed routerem
app.use(router)
app.use(vuetify)

app.mount('#app')
