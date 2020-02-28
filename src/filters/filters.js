import Vue from 'vue'
// 导入moment
import moment from 'moment'

// 准备过滤器
// 参数1： 过滤器的名字
// 参数2： 过滤器的具体实现
Vue.filter('formatTime',function(value){
//     value是日期，要处理成年月日的格式  YYY-MM-DD格式
//     要处理日期这种类型的字符串，会用到moment （需要先下包 npm i moment）
return moment(value).format('YYY-MM-DD')
})