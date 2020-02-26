// 导入axios
import axios from 'axios'
// 导入操作token的文件
import { getToken } from '@/utilis/token.js'

// 同一个模块接口的部分代码重复，有些冗余
// 克隆一个axios对象indexRequest出来，并设置他的初始基因基地址，以及设置了请求头携带token
// 通过indexRequest这个对象去发请求，就会自动有基地址和自动携带token
let indexRequest = axios.create({
  // 基地址
  baseURL: process.env.VUE_APP_URL,
  // headers:{
  //   //   请求头
  //     token: getToken()
  // }
})

// 手动在每一个请求里加一个请求头太过于麻烦
// 添加请求拦截器
// 以后只要是indexRequest发的 请求都会被拦截下来
indexRequest.interceptors.request.use(function (config) {
  //   config 参数就是被拦截下来的请求配置
  // window.console.log(config)
  // 在config里面的headers加一个token，那么这次发送的请求就会被拦截下来并且会自动加上token了
  config.headers.token = getToken();
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 获取登录用户信息
export function info() {
  // return axios({
  //     url: process.env.VUE_APP_URL + '/info',
  //     method: 'get',
  //   //   传入token
  //     headers:{
  //       //   从本地存储中读取token
  //         token: getToken()
  //     }
  // })

  return indexRequest({
    url: '/info',
    method: 'get',
    // headers:{
    //   //   请求头
    //     token: getToken()
    // }
  })
}

// 退出登录
export function logout() {
  // return axios({
  //     url: process.env.VUE_APP_URL + '/logout',
  //     method: 'get',
  //     headers:{
  //         token:getToken()
  //     }
  // })

  return indexRequest({
    url: '/logout',
    method: 'get',
    // headers:{
    //   //   请求头
    //     token: getToken()
    // }
  })
}

// 注意，axios对象传入的请求头token是有bug的，在界面没有存储过token首次登陆的情况下，进入首页会出现没有出现用户头像和名称的情况，这是因为项目的接口文件（js文件）在项目一打开就会运行，而此时接口axios请求头里的token为unll，登陆后去发送获取用户信息的请求就相当于没有携带token，登陆成功后会报token参数错误的bug
//   但是在登陆后刷新就会获取到数据，这是因为刷新就相当于重启这个项目，而因为上次启动登陆时已经将token存起来了，所以现在是已经有token的，再打开项目运行接口文件是可以读取到token的，发送请求也就没问题
// js文件在项目一打开就会被执行，但是文件中的函数请求还是会在被调用的时候才会被执行
// 解决方法：不能在项目一打开就设置token给请求头，因为那个时候还没有token，应该在发送请求的时候，再来设置token。这个时候就有token了  

