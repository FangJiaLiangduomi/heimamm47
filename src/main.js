import Vue from 'vue'
import App from './App.vue'
// 导入 Element-ui
import ElementUI from 'element-ui';
// 导入 Element-ui的样式
import 'element-ui/lib/theme-chalk/index.css';
// 导入样式
import "./style/base.css"
// 导入vuex对象
import store from './store/index'

// 导入路由
import router from './router/index'

Vue.config.productionTip = false
// 注册 Element-ui
Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  // 挂载到Vue实例上
  router,
  store
  // 挂载到id为app的div上
}).$mount('#app')
