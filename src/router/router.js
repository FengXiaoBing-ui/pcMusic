import { createRouter, createWebHistory } from 'vue-router'
import ball from "/src/components/ball"
import home from "/src/views/home"

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: home
        },
        {
            path: '/ball',
            component: ball
        }
    ]
})

export default router