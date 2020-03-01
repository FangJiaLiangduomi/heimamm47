import request from '@/utilis/request'

// 封装用户列表接口
export function userList(params){
    return request({
        url: '/user/list',
        method: 'get',
        // get请求传数据不能用data
        params
    })
}

// 封装新增用户接口
export function userAdd(data){
    return request({
        url: '/user/add',
        method: 'post',
        data
    })
}

// 封装编辑用户接口
export function userEdit(data){
    return request({
        url: '/user/edit',
        method: 'post',
        data
    })
}

// 封装删除用户接口
export function userRemove(data){
    return request({
        url: '/user/remove',
        method: 'post',
        data
    })
}
// 封装获取用户状态接口
export function userStatus(data){
    return request({
        url: '/user/status',
        method: 'post',
        data
    })
}
