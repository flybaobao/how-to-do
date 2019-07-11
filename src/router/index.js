import Vue from 'vue'
import Router from 'vue-router'
// import Add from '@/components/Add.vue'  下方使用路由懒加载
// import Detail from '@/components/Detail.vue'
// import ListDetail from '@/components/ListDetail.vue'
import Home from '@/components/Home.vue'
import List from '@/components/List.vue'
import ListMore from '@/components/ListMore.vue'

Vue.use(Router)

export default new Router({
  // mode: 'history'
  // 这种模式不会出现# 号  但是会有风险就是，在放地址栏回车 会报错
  // 如果使用这种模式，build打包以后，要在后台做出对应的，地址传过来的pathname 做出 静态处理
  // 但是本地 npm run dev线上测试不会出问题
  mode: 'history',
  routes: [
    {
      path: '*',
      redirect: '/home'
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {keepAlive: true}// 这个功能是告诉浏览器实现该页面  缓存
      // this.$route.meta.keepAlive 看他的值是true就是缓存 跳至APP.vue看缓存
    },
    {
      path: '/list',
      name: 'list',
      component: List
    },
    {
      path: '/listmore',
      name: 'listmore',
      component: ListMore
    },
    {
      path: '/add',
      name: 'add',
      component: () => import('@/components/Add.vue')
    },
    {
      path: '/detail',
      name: 'detail',
      component: () => import('@/components/Detail.vue')
    },
    {
      path: '/listdetail/:id',
      name: 'listdetail',
      component: () => import('@/components/ListDetail.vue')
    }
  ]
})
