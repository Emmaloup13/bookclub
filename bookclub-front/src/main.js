import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootswatch/dist/journal/bootstrap.min.css'

const app = createApp(App);
app.use(router).mount('#app');