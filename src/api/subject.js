import axios from 'axios'
// 导入token
import { getToken } from '@/utilis/token.js'

// 创建对象
let subjectRequest = axios.create({
    baseURL: process.env.VUE_APP_URL,
    withCredentials: true
})

// 请求拦截
subjectRequest.interceptors.request.use(function(config){
    // 请求之前做什么
    config.headers.token = getToken();
    return config;
},function(error){
    // 请求之后做什么
    return Promise.reject(error);
}
);

// 封装获取科学列表的接口
export function subjectList(params){
    return subjectRequest({
        url: '/subject/list',
        method: 'get',
        // get请求传数据不能用data
        params
    })
}

// 封装学科状态接口
export function subjectStatus(data){
    return subjectRequest({
        url: '/subject/status',
        method: 'post',
        data
    })
}

// 封装添加学科接口
export function subjectAdd(data){
    return subjectRequest({
        url: '/subject/add',
        method: 'post',
        data
    })
}

// 封装编辑学科接口
export function subjectEdit(data){
    return subjectRequest({
        url: '/subject/edit',
        method: 'post',
        data
    })
}

// 封装删除学科接口
export function subjectDel(data){
    return subjectRequest({
        url: '/subject/remove',
        method: 'post',
        data
    })
}