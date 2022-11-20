import { createApp } from 'vue'
import App from './App.vue'
import "./common/base.css"
import router from "./router/index"

createApp(App).use(router).mount('#app')

