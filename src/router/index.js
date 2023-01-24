import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/layout/Layout.vue'

export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path(.*)',
                component: () => import('@/views/redirect')
            }
        ]
    },
    {
        path: '/login',
        component: () => import('@/views/auth/Login.vue'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404.vue'),
        hidden: true
    },
    {
        path: "/",
        component: Layout,
        redirect: '/home',
        icon: 'home',
        children: [
            {
                path: "home",
                name: "HOME",
                component: () => import('@/views/home/index.vue')
            }
        ]
    }

];

export const asyncRoutes = [
    {
        path: "/",
        component: Layout,
        redirect: '/dine-in',
        icon: "table",
        meta: {
            roles: ['editor']
        },
        children: [
            {
                path: "dine-in",
                name: "DINE-IN",
                component: () => import('@/views/account/test1.vue'),
                meta: {
                    roles: ['editor']
                }
            }
        ]
    },
    {
        path: "/",
        component: Layout,
        redirect: '/services/pending',
        icon: "clock",
        meta: {
            roles: ['editor']
        },
        children: [
            {
                path: "services/pending",
                name: "PENDING",
                component: () => import('@/views/account/test1.vue'),
                meta: {
                    roles: ['editor']
                }
            }
        ]
    },
    {
        path: "/",
        component: Layout,
        redirect: '/settings/bill',
        icon: "cog",
        meta: {
            roles: ['editor']
        },
        children: [
            {
                path: "settings/bill",
                name: "SETTINGS",
                component: () => import('@/views/account/test1.vue'),
                meta: {
                    roles: ['editor']
                }
            }
        ]
    },

    { path: '/:pathMatch(.*)', redirect: '/404', hidden: true }
];

const router = createRouter({
    history: createWebHashHistory(),
    scrollBehavior: () => ({ top: 0 }),
    routes: constantRoutes
})

export default router
