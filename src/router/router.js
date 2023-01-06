import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory("/"),
    routes: [
        {
            path: '/',
            redirect:'/home',
            name:"/",
            meta:{
                keepAlive: true //此页面需要缓存
            }
        },
        {
            path: '/home',
            component: () => import('/src/views/home.vue'),
            redirect:"/home/recommend",
            name:"home",
            children:[
                {
                    path:"/home/recommend",
                    name:"homeRecommend",
                    component: () => import('/src/views/midContent/recommend.vue'),
                    meta:{
                        keepAlive: true //此页面需要缓存
                    }
                },
                {
                    path: '/home/musicVideo',
                    name:"homeMusicVideo",
                    component: () => import('/src/views/midContent/musicVideo.vue'),
                    meta:{
                        keepAlive: true //此页面需要缓存
                    }
                },
                {
                    path: '/home/musicHome',
                    name:"homeMusicHome",
                    component: () => import('/src/views/midContent/musicHome.vue'),
                    meta:{
                        keepAlive: true //此页面需要缓存
                    }
                },
                {
                    path: '/home/theme',
                    name:"homeTheme",
                    component: () => import('/src/views/midContent/theme.vue'),
                    meta:{
                        keepAlive: true //此页面需要缓存
                    }
                }
            ],
            meta:{
                keepAlive: true //此页面需要缓存
            }
        },
        {
            path: '/ball',
            name:"ball",
            component: () => import('/src/views/ball.vue')
        }
    ]
})

export default router