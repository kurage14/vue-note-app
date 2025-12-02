import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes/router'
import { createPinia } from 'pinia'
const app = createApp(App)
app.config.devtools = true;
app.use(createPinia()).use(router).mount('#app')
