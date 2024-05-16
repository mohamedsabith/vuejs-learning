import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App.vue'
import vue3GoogleLogin from 'vue3-google-login'
import router from './routes/router'
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

const app = createApp(App)

app.use(router)

app.use(Toast, {
  position: POSITION.TOP_RIGHT,
  timeout: 3000,
});

app.use(vue3GoogleLogin, {
  clientId: '885861646042-g61v356ajtjaknmiku5hko9ae73b70e6.apps.googleusercontent.com'
})

app.mount('#app')