import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import './style.css'
import App from './App.vue'
import router from './routes/router'

createApp(App).use(router).mount('#app')
