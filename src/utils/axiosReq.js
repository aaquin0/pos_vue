import axios from 'axios'
import router from '@/router'
import { getToken, setToken } from '@/utils/auth'
import { useUserStore } from '@/stores/user'
let reqConfig
let loadingE

const service = axios.create()

// request interception
service.interceptors.request.use(
    (request) => {
        console.log('request', request)
        // token setting
        request.headers['Authorization'] = `Bearer ${getToken()}`
        /* download file*/
        if (request.isDownLoadFile) {
            request.responseType = 'blob'
        }
        /* upload file*/
        if (request.isUploadFile) {
            request.headers['Content-Type'] = 'multipart/form-data'
        }
        reqConfig = request
        if (request.bfLoading) {
            // data loader
            // loadingE =
        }
        /*
         *params will be spliced to the url
         * */
        if (request.isParams) {
            request.params = request.data
            request.data = {}
        }
        return request
    },
    (err) => {
        Promise.reject(err)
    }
)
// response interception
service.interceptors.response.use(
    (res) => {
        if (reqConfig.afHLoading && loadingE) {
            // loadingE.close()
        }
        // If it is a download file, return directly
        if (reqConfig.isDownLoadFile) {
            return res
        }
        const { flag, msg, isNeedUpdateToken, updateToken, code } = res.data
        //Update token to stay logged in
        if (isNeedUpdateToken) {
            setToken(updateToken)
        }
        const successCode = '0,200,20000'
        if (successCode.includes(code)) {
            return res.data
        } else {
            if (code === 403) {
                alert.confirm('please login again', {
                    confirmButtonText: 're-register',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    const userStore = useUserStore()
                    userStore.resetState().then(() => {
                        router.push({ path: '/login' })
                    })
                })
            }
            if (reqConfig.isAlertErrorMsg) {

                alert({
                    message: msg,
                    type: 'error',
                    duration: 2 * 1000
                })
            }
            //return error message
            //If not catch, go to unhandled rejection for collection
            //Note: If there is no return, it will be put back into the request method. Then, the returned res is undefined
            return Promise.reject(res.data)
        }
    },
    (err) => {
        /*http error handling, handling cross-domain, 404, 401, 500*/
        // if (loadingE) loadingE.close()

        alert({
            message: err,
            type: 'error',
            duration: 2 * 1000
        })

        //If it is cross domain
        //Network Error,cross origin
        const errObj = {
            msg: err.toString(),
            reqUrl: reqConfig.baseURL + reqConfig.url,
            params: reqConfig.isParams ? reqConfig.params : reqConfig.data
        }
        return Promise.reject(JSON.stringify(errObj))
    }
)

export function axiosReq({
     url,
     data,
     method,
     isParams,
     bfLoading,
     afHLoading,
     isUploadFile,
     isDownLoadFile,
     baseURL,
     timeout,
     isAlertErrorMsg = true
 }) {
    return service({
        url: url,
        method: method ?? 'get',
        data: data ?? {},
        isParams: isParams ?? false,
        bfLoading: bfLoading ?? false,
        afHLoading: afHLoading ?? true,
        isUploadFile: isUploadFile ?? false,
        isDownLoadFile: isDownLoadFile ?? false,
        isAlertErrorMsg: isAlertErrorMsg,
        baseURL: baseURL ?? import.meta.env.VITE_APP_BASE_URL,
        timeout: timeout ?? 15000
    })
}

export default axiosReq