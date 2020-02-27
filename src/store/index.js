// 导入vue
import Vue from 'vue'
// 导入vuex
import Vuex from 'vuex'

// 注册vuex
Vue.use(Vuex)

// 创建vuex对象
const store = new Vuex.Store({
    // 数据
    state:{
    //   用户名
    username: '',
    // 头像
    avatar: ''
    },
    // 方法
    mutations:{
        // 修改用户名
        changeUsername(state,val){
            state.username = val;
        },
        // 修改用户头像
        changeAvatar(state,val){
            state.avatar = val;
        }
    }
})

// 挂载到vue实例，但是这里没有vue实例，需要暴露到main.js再挂载到vue实例
export default store;
