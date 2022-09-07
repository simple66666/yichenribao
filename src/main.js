import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant';
// 导入vuex
import store from "./store";
import 'vant/lib/index.css';
import './axios/axios.js';
//需要引入moment
import moment from 'moment'
// 导入全局样式表
import './assets/css/global.css'
// 2.导入qs ，解决前端向后端发送数据时，显示xx is required
import qs from 'qs'

// 3.把qs挂载到全局
Vue.prototype.qs = qs 


//进行全局挂载moment
// 定义全局时间戳过滤器
// Vue.filter('formatDate', function (value, format = 'YYYY-MM-DD HH:mm:ss') {
//   return Moment(value).utc().format(format)
// })

// 定义一个全局过滤器实现日期格式化
Vue.filter('datefmt', function (input, fmtstring) {
  return moment.unix(input).format(fmtstring)
})

Vue.filter('mainsexFilter',function(value){
  if(value ==0){
    return '男'
}
else{
    return '女'
}
})


// 将vant作为插件插入vue
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
