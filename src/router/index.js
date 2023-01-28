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
        children: [
            {
                path: "services/pending",
                name: "PENDING",
                component: () => import('@/views/account/test1.vue'),
            }
        ]
    },
    {
        path: "/",
        component: Layout,
        redirect: "/settings",
        icon: "cog",
        children: [
            {
                path: "settings",
                name: "SETTINGS",
                redirect: "/settings/bill",
                component: () => import('@/views/settings/index.vue'),
                children: [
                    {
                        path: "day-end",
                        name: "Day End",
                        component: () => import('@/views/settings/DayEnd.vue')
                    },
                    {
                        path: "shift-change",
                        name: "Shift Change",
                        component: () => import('@/views/settings/ShiftChange.vue')
                    },
                    {
                        path: "printer",
                        name: "Printer Settings",
                        component: () => import('@/views/settings/PrinterSettings.vue')
                    },
                    {
                        path: "items",
                        name: "Items",
                        component: () => import('@/views/settings/Items.vue')
                    },
                    {
                        path: "tables",
                        name: "Tables",
                        component: () => import('@/views/settings/Tables.vue')
                    },
                    {
                        path: "reports",
                        name: "Reports",
                        component: () => import('@/views/settings/Reports.vue')
                    },
                    {
                        path: "bill",
                        name: "Bill",
                        component: () => import('@/views/settings/Bill.vue')
                    },
                    {
                        path: "imin",
                        name: "IMIN Settings",
                        component: () => import('@/views/settings/IminSettings.vue')
                    }
                ]
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
