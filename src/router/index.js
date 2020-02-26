// 导入vue
import Vue from 'vue';
// 导入NProgress进度条包（先下包npm install --save nprogress）
import NProgress from 'nprogress'
// 导入进度条样式包
import 'nprogress/nprogress.css'

// 导入路由
import VueRouter from 'vue-router'
Vue.config.productionTip = false
// 注册路由
Vue.use(VueRouter)

// 准备组件
// 登陆组件
import login from "../views/login/index.vue"
// 首页组件
import index from "../views/index/index.vue"
// 导入首页子组件
// 用户列表
import user from '../views/index/user/user.vue'
// 企业列表
import business from '../views/index/business/business.vue'
// 数据概览
import chart from '../views/index/chart/chart.vue'
// 题库列表
import question from '../views/index/question/question.vue'
// 学科列表
import subject from '../views/index/subject/subject.vue'


// 设置路由规则
const routes = [
  {
    path: "/login",
    component: login,
  },

  {
    path: '/index',
    component: index,
    // 设置首页的子路由，直接在设置首页路由后面设置吗规则，并且地址不用加/
    children: [
      {path: 'user',component: user,},
      {path: 'business',component: business,},
      {path: 'chart',component: chart,},
      {path: 'question',component: question,},
      {path: 'subject',component: subject,}
    ]
  }
];

// 创建路由对象
const router = new VueRouter({
  routes
});

// 导航守卫要写在创建router对象后面
// 这个回调函数是在即将跳转路由之前调用的
// to:跳到哪个路由
// from:从哪个路由跳转
// 他们两都是一个对象，对象里的path属性就是他们的路径
// next:一个函数，调用函数就通过跳转，否则阻止跳转
// next调用的时候不传参数，代表原来要跳转到哪就通过跳转到哪
router.beforeEach((to, from, next) => {
  // console.log(调用)
  // console.log(to);
  // console.log(from);
  // console.log(next);
  // 开启进度条
  NProgress.start();
  next();
})

// 后置钩子回调函数，是在跳转路由之后调用的
router.afterEach(() => {
  
  // 结束进度条
  NProgress.done();
})
// 暴露出去
export default router;