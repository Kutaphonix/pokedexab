import { createApp } from 'vue'
import App from './App.vue'
import { registerPlugins } from './plugins'

const vuetify = createVuetify({
  theme: {
    defaultTheme: 'dark'
  }
})

const app = createApp(App)

registerPlugins(app)

app.mount('#app')
