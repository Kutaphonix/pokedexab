import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from './plugins'
import { createVuetify } from 'vuetify'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark'
  }
})

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
