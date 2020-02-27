// 导入vue
import Vue from 'vue';
// 导入NProgress进度条包（先下包npm install --save nprogress）
import NProgress from 'nprogress'
// 导入进度条样式包
import 'nprogress/nprogress.css'
// 导入axios
import { info } from '@/api/index.js'
// 导入单独引用消息提示框
import { Message } from 'element-ui';
// 导入操作删除token的工具
import { removeToken } from '@/utilis/token.js'
// 导入vuex对象
import store from '../store/index'

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
  // meta 路由元信息，在后置钩子取出
  { path: "/login", component: 
  login,meta: { title: '登录'} },
  // 路由重定向
  { path: "/", redirect: '/login' },

  {
    path: '/index',
    component: index,
    meta: { title: '登录'},
    // 设置首页的子路由，直接在设置首页路由后面设置吗规则，并且地址不用加/
    children: [
      { path: 'user', component: user,meta: { title: '首页'} },
      { path: 'business', component: business,meta: { title: '企业列表'} },
      { path: 'chart', component: chart,meta: { title: '数据概览'} },
      { path: 'question', component: question,meta: { title: '题库列表'} },
      { path: 'subject', component: subject,meta: { title: '学科列表'} }
    ]
  }
];

// 创建路由对象
const router = new VueRouter({
  routes
});

// 路由白名单，里面放不需要做验证的路径
let whiteList = ['/login']

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
  // // 判断token是否正确
  // if(to.path == '/login'){
  //   // 登录页面。直接通过
  //   next();

  // 白名单里包含要去的页面，直接通过  includes: 数组有没有包含某个元素
  if (whiteList.includes(to.path)) {
    next();
  } else {
    // 其他页面要做token的判断
    info().then(res => {
      console.log(res);
      // 判断登录的token是否正确
      if (res.data.code == 200) {
        // token是正确的，直接通过

        // 把服务器返回的用户名取出存入vuex
          store.commit('changeUsername',res.data.data.username);
        // 返回的头像  地址要拼接基地址和  /
          store.commit('changeAvatar',process.env.VUE_APP_URL+ '/' +res.data.data.avatar);

        next();
      } else {
        // 注意： 在路由的js文件里，this不是vue的实例，所有没有this.$message,直接用会报错
        // 可以用element里的单独引用的消息提示
        // this.$message.error('登录异常，请重新登录');
        Message.error('登录异常，请重新登录');

        // 删除token
        removeToken();

        // 主动完成进度条
        NProgress.done();

        // 返回登录 next的参数填指定路径放行
        next('/login');
      }
    },
    );
  }
})

// 后置钩子回调函数，是在跳转路由之后调用的
// to:跳到哪个路由
// from:从哪个路由跳转
router.afterEach((to) => {

  // 结束进度条
  NProgress.done();

  // 取出当前要跳转页面的标签，设置给tite
  document.title = to.meta.title;
})
// 暴露出去
export default router;