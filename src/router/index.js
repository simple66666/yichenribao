import Vue from 'vue'
import VueRouter from 'vue-router'
// 1.导入主页
import Home from '../components/Home.vue'
// 2.导入详情页
import Detail from '../components/Detail.vue'
// 3.导入评论页
import Review from '../components/Review.vue'
// 4.导入账号注销页面
import AdminDelete from '../components/AdminDelete.vue'
// 5.导入第三方收集个人信息页面
import Other from '../components/Other.vue'
// 6.导入证照中心页面
import Center from '../components/Center.vue'
Vue.use(VueRouter)



//解决重复点击动态路由跳转报错问题 

// 获取原型对象的push函数
const originalPush = VueRouter.prototype.push
// 修改 原型对象中的push方法
VueRouter.prototype.push = function push(location){
  return originalPush.call(this,location).catch(err=>err)
}


const routes = [
  {
    // 重定向，直接打开的时候访问的是home页面
    path: '/',
    redirect: '/Home'
  },
  {
    // 主页路由
    path: '/Home',
    component: Home,
  },
  // 详情页路由
  {
        path: '/Detail/:id',
        name: 'Detail',
        component: Detail,
  },
  // 评论页面路由
  {
        path: '/Detail/:id/Review',
        name: 'Review',
        component: Review
  },
  {
        path: '/AdminDelete',
        name: 'AdminDelete',
        component: AdminDelete
  },
  {
    path: '/Other',
    name: 'Other',
    component: Other
  },
  // 证照中心
  {
    path: '/Center',
    name: 'Center',
    component: Center
  }
]




const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
