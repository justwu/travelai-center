import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { useAppStore } from './stores/app'
import './styles/globals.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia).use(router)
useAppStore(pinia).initializeTheme()
app.mount('#app')
