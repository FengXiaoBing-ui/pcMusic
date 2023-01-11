import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import utils from './utils/tool.js'
import store from "./store/index";
import VueCookies from 'vue-cookies'


import modTitle from './components/modTitle'
import hoverBox from '@/components/hoverBox.vue';
import playMusicList from "@/components/playMusicList";


import '/src/assets/font/iconfont.css'


import request from './api/QQApi'
import NeteaseCloudApi from "@/api/NeteaseCloudApi";

const app = createApp(App)

app.config.globalProperties.$utils = utils
app.config.globalProperties.$router = router
app.config.globalProperties.$QQrequest = request
app.config.globalProperties.$NeteaseCloudrequest = NeteaseCloudApi
app.config.globalProperties.store = store
app.config.globalProperties.$cookies = VueCookies

app.component('modTitle',modTitle)
app.component('hoverBox',hoverBox)
app.component('playMusicList',playMusicList)

app.use(router)
app.use(store)
app.use(VueCookies)
app.mount('#app')
