import { loginReq } from '@/api/user'
import { setToken, removeToken } from '@/utils/auth'
import router, { asyncRoutes } from '@/router'
import { defineStore } from 'pinia'
import { usePermissionStore } from '@/stores/permission'

const resetRouter = () => {
    const asyncRouterNameArr = asyncRoutes.map((mItem) => mItem.name)
    asyncRouterNameArr.forEach((name) => {
        if (router.hasRoute(name)) {
            router.removeRoute(name)
        }
    })
}

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            username: '',
            avatar: '',
            roles: []
        }
    },

    actions: {
        M_username(username) {
            this.$patch((state) => {
                state.username = username
            })
        },

        M_roles(roles) {
            this.$patch((state) => {
                state.roles = roles
            })
        },

        login(data) {
            return new Promise((resolve, reject) => {
                loginReq(data)
                    .then(res => {
                        if (res.code === 0) {
                            setToken(res.data?.accessToken)
                            resolve(null)
                        } else {
                            reject(res)
                        }
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },

        // get user info
        getInfo() {
            return new Promise((resolve, reject) => {
                const data = {}
                data.username = 'testmuchos_admin'

                const rolesArr = localStorage.getItem('roles')
                if (rolesArr) {
                    data.roles = JSON.parse(rolesArr)
                } else {
                    data.roles = ['editor']
                    localStorage.setItem('roles', JSON.stringify(data.roles))
                }

                const {roles, username} = data
                this.M_username(username)
                this.M_roles(roles)

                resolve(data)
            })
        },

        // user logout
        logout() {
            return new Promise((resolve, reject) => {
                this.resetState()
                resolve(null)
            })
        },

        resetState() {
            return new Promise((resolve) => {
                this.M_username('')
                this.M_roles([])
                removeToken() // must remove  token  first
                resetRouter() // reset the router
                localStorage.removeItem('roles')
                const permissionStore = usePermissionStore()
                permissionStore.M_isGetUserInfo(false)
                resolve(null)
            })
        }
    }
})
