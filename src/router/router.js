import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'


const router = createRouter({
    history: process.env.IS_ELECTRON ? createWebHashHistory(process.env.BASE_URL) : createWebHistory(process.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/home',
            name: "/"
        },
        {
            path: '/home',
            component: () => import('/src/views/home.vue'),
            redirect: "/home/recommend",
            name: "home",
            children: [
                {
                    path: "/home/recommend",
                    name: "homeRecommend",
                    component: () => import('/src/views/midContent/recommend.vue'),
                    meta: {
                        keepAlive: true //此页面需要缓存
                    }
                },
                {
                    path: '/home/musicVideo',
                    name: "homeMusicVideo",
                    component: () => import('/src/views/midContent/musicVideo.vue'),
                    meta: {
                        keepAlive: true //此页面需要缓存
                    }
                },
                {
                    path: '/home/musicHome',
                    name: "homeMusicHome",
                    component: () => import('/src/views/midContent/musicHome.vue'),
                    meta: {
                        keepAlive: true //此页面需要缓存
                    }
                },
                {
                    path: '/home/theme',
                    name: "homeTheme",
                    component: () => import('/src/views/midContent/theme.vue'),
                    meta: {
                        keepAlive: true //此页面需要缓存
                    }
                },
                {
                    path: '/home/searchResult',
                    name: "homeSearchResult",
                    component: () => import('/src/views/midContent/searchResult.vue')
                }
            ]
        },
        {
            path: '/ball',
            name: "ball",
            component: () => import('/src/views/ball.vue')
        },
        {
            path: "/:pathMatch(.*)*",
            name: "notFound",
            component: () => import('/src/views/notFound.vue'),  // 引入 组件
        },

    ]
})


export default router