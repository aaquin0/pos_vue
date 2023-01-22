import request from '@/utils/axiosReq'

export function loginReq(data) {
    return request({
        url: '/auth/login',
        data,
        method: 'post',
        bfLoading: false,
        isAlertErrorMsg: false
    })
}