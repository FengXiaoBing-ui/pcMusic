import { createApp,useRouter } from 'vue'
import App from './App.vue'
import router from './router/router'
import '/src/assets/font/iconfont.css'

const app = createApp(App)

app.config.globalProperties.$router = useRouter

app.use(router)
app.mount('#app')
