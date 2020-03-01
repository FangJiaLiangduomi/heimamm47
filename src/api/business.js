// 导入抽取出去的对象
import request from '@/utilis/request'

// 封装企业列表接口
export function businessList(params){
    return request({
        url: '/enterprise/list',
        method: 'get',
        // get请求传数据不能用data
        params
    })
}


// 封装企业添加接口
export function businessAdd(data){
    return request({
        url: '/enterprise/add',
        method: 'post',
        data
    })
}

// 封装企业删除接口
export function businessRemove(data){
    return request({
        url: '/enterprise/remove',
        method: 'post',
        data
    })
}

// 封装企业状态接口
export function businessStatus(data){
    return request({
        url: '/enterprise/status',
        method: 'post',
        data
    })
}

// 封装企业编辑接口
export function businessEdit(data){
    return request({
        url: '/enterprise/edit',
        method: 'post',
        data
    })
}