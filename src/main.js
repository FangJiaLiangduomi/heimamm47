import Vue from 'vue'
import App from './App.vue'

// 导入路由
import router from './index.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载到Vue实例上
  router
  // 挂载到id为app的div上
}).$mount('#app')
