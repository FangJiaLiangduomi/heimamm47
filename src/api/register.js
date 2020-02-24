// 放所有跟注册有关的接口

// 导入axios
import axios from 'axios'

// 准备封装的请求方法

// 获取手机验证码
// export,封装的方法暴露出去，别人可能要调用这个方法
// 把接口需要的数据当做data参数传进来
export function sendSMS(data){
    // axios({
    //     url:process.env.VUE_APP_URL + '/sendsms',
    //     method: 'post',
    //     data,
    //     withCredentials:true
    // })
    // .then(res=>{
    //     如果在这里写.then的代码，会把响应体写死
    //     alert(res)
    // })
    return axios({
        url:process.env.VUE_APP_URL + '/sendsms',
        method: 'post',
        data,
        withCredentials:true
    })
    // 是对axios调用后的返回值.then
    // axios(参数).then()
}

// 发注册账号的接口请求
export function register(data){
    return axios({
        url:process.env.VUE_APP_URL + '/register',
        method: 'post',
        data,
        withCredentials:true
    })
}