// 导入抽取出去的对象
import request from '@/utilis/request'

// 封装获取科学列表的接口
export function subjectList(params){
    return request({
        url: '/subject/list',
        method: 'get',
        // get请求传数据不能用data
        params
    })
}

// 封装学科状态接口
export function subjectStatus(data){
    return request({
        url: '/subject/status',
        method: 'post',
        data
    })
}

// 封装添加学科接口
export function subjectAdd(data){
    return request({
        url: '/subject/add',
        method: 'post',
        data
    })
}

// 封装编辑学科接口
export function subjectEdit(data){
    return request({
        url: '/subject/edit',
        method: 'post',
        data
    })
}

// 封装删除学科接口
export function subjectDel(data){
    return request({
        url: '/subject/remove',
        method: 'post',
        data
    })
}