import Vue from 'vue'
import App from './App.vue'
// 引入拆出去的 store
import store from './store'
// eslint-disable-next-line
new Vue({
  el: '#app',
  ...App,
  store // store 被注册到实例上（类似路由用法） 所有组件都会有一个属性 this.$store
})

// vuex 平级组件交互 跨组件交互
