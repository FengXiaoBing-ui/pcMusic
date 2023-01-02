import { createRouter, createWebHistory } from 'vue-router'
import ball from "/src/views/ball"
import home from "/src/views/home"
import musicVideo from "/src/views/midContent/musicVideo"
import musicHome from "/src/views/midContent/musicHome"
import theme from "/src/views/midContent/theme"
import recommend from "/src/views/midContent/recommend"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect:'/home',
            component: home
        },
        {
            path: '/home',
            component: home,
            redirect:"/home/recommend",
            children:[
                {
                    path:"/home/recommend",
                    component: recommend
                },
                {
                    path: '/home/musicVideo',
                    component: musicVideo
                },
                {
                    path: '/home/musicHome',
                    component: musicHome
                },
                {
                    path: '/home/theme',
                    component: theme
                }
            ]
        },
        {
            path: '/ball',
            component: ball
        }
    ]
})

export default router