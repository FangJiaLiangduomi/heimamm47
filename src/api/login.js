import axios from 'axios'

// 暴露一个登陆的方法出去
export function login(data) {
    // 发送请求
    return axios({
        url: process.env.VUE_APP_URL + '/login',
        method: 'post',
        data,
        withCredentials:true
    })
}