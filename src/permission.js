import router, { asyncRoutes } from '@/router'
import settings from './settings'
import { getToken, setToken } from '@/utils/auth'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
import 'nprogress/nprogress.css'
import getPageTitle from '@/utils/getPageTitle'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from "@/stores/permission";

const whiteList = ['/login', '/404'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
    // start progress bar
    if (settings.isNeedNprogress) NProgress.start()
    // set page title
    document.title = getPageTitle(to.meta.title)
    if (!settings.isNeedLogin) setToken(settings.tmpToken)
    const hasToken = getToken()

    const userStore = useUserStore()
    const permissionStore = usePermissionStore()
    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
        } else {
            //isGetUserInfo
            const isGetUserInfo = permissionStore.isGetUserInfo
            if (isGetUserInfo) {
                next()
            } else {
                try {
                    let accessRoutes = []
                    if (settings.isNeedLogin) {
                        // get user info
                        // note: roles must be object array! such as: ['admin'] or ,['developer','editor']
                        const { roles } = await userStore.getInfo()
                        accessRoutes = await permissionStore.generateRoutes(roles)
                    } else {
                        accessRoutes = asyncRoutes
                    }
                    // setting constRouters and accessRoutes to vuex , in order to sideBar used
                    permissionStore.M_routes(accessRoutes)
                    // dynamically add accessible routes
                    accessRoutes.forEach((route) => {
                        router.addRoute(route)
                    })
                    //set get userInfo to true
                    permissionStore.M_isGetUserInfo(true)
                    // hack method to ensure that addRoutes is complete
                    // set the replace: true, so the navigation will not leave a history record
                    next({ ...to, replace: true })
                } catch (err) {
                    await userStore.resetState()
                    next(`/login?redirect=${to.path}`)
                    if (settings.isNeedNprogress) NProgress.done()
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`)
            if (settings.isNeedNprogress) NProgress.done()
        }
    }
})

router.afterEach(() => {
    if (settings.isNeedNprogress) NProgress.done()
})
