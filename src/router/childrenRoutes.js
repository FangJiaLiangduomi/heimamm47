// 导入用户列表子组件
import user from '../views/index/user/user.vue'
// 导入企业列表子组件
import business from '../views/index/business/business.vue'
// 导入数据概览子组件
import chart from '../views/index/chart/chart.vue'
// 导入题库列表子组件
import question from '../views/index/question/question.vue'
// 导入学科列表子组件
import subject from '../views/index/subject/subject.vue'

export default [
  { path: 'chart', component: chart, meta: { title: '数据概览', roles: ['超级管理员', '管理员'], icon: 'el-icon-pie-chart' } },

  { path: 'user', component: user, meta: { title: '用户列表', roles: ['超级管理员', '管理员'], icon: 'el-icon-user' } },

  { path: 'question', component: question, meta: { title: '题库列表', roles: ['超级管理员', '管理员', '老师', '学生'], icon: 'el-icon-edit-outline' } },

  { path: 'business', component: business, meta: { title: '企业列表', roles: ['超级管理员', '管理员', '老师'], icon: 'el-icon-office-building' } },

  { path: 'subject', component: subject, meta: { title: '学科列表', roles: ['超级管理员', '管理员', '老师', '学生'], icon: 'el-icon-notebook-2' } }
]