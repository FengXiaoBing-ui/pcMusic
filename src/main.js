import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import utils from './utils/tool.js'
import modTitle from './components/modTitle'
import hoverBox from '@/components/hoverBox.vue';
import '/src/assets/font/iconfont.css'
import request from './api/request'

const app = createApp(App)

app.config.globalProperties.$utils = utils
app.config.globalProperties.$router = router
app.config.globalProperties.$request = request

app.component('modTitle',modTitle)
app.component('hoverBox',hoverBox)

app.use(router)
app.mount('#app')
