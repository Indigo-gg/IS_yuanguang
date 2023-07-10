import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/view/index'),
            redirect: '/dataIndex',
            //子路由
            children: [
                {
                    path:'/dataIndex',
                    name:'dataIndex',
                    meta:{
                        icon:'CalendarOutlined',
                      name:'数据索引管理',
                        isShow:true
                    },
                    component: () => import('@/view/dataIndex/index.vue')
                },
                {
                    path:'/contentSource',
                    name:'contentSource',
                    meta:{
                        icon:'ContainerOutlined',
                        name:'内容来源管理',
                        isShow:true
                    },
                    component: () => import('@/view/contentSource/index.vue'),
                },
                {
                    path:'/crawler',
                    name:'crawler',
                    meta:{
                        icon:'BugOutlined',
                        name:'爬虫任务管理',
                        isShow:true
                    },
                    component: () => import('@/view/crawler/index.vue'),
                },
                {
                    path:'/template',
                    name:'template',
                    meta:{
                        icon:'FileProtectOutlined',
                        name:'搜索模板管理',
                        isShow:true
                    },
                    component: () => import('@/view/template/index.vue'),
                },

                {
                    path:'/user',
                    name:'user',
                    meta:{
                        icon:'TeamOutlined',
                        name:'用户管理',
                        isShow:true
                    },
                    component: () => import('@/view/user/user.vue'),
                }

            ]
        },
        {
            path:'/login',
            name:'login',
            component:()=>import('@/view/user/login'),
        }
    ]
})

export default router
