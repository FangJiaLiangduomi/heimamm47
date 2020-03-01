import axios from 'axios'
// 导入token
import { getToken } from '@/utilis/token.js'

// 创建对象
let request = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})

// 请求拦截
request.interceptors.request.use(function(config){
    // 请求之前做什么
    config.headers.token = getToken();
    return config;
},function(error){
    // 请求之后做什么
    return Promise.reject(error);
}
);

// 暴露出去
export default request;