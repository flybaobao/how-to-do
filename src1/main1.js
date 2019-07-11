// 未拆分的main.js
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import logger from 'vuex/dist/logger' // 打印日志插件

Vue.use(Vuex)
// 加入状态 state（数据）
const state = {
  count: 0
}
// 加入mutation更改 state 突变方法
const mutations = {
  add (state, count) { // 自动加入state。 默认是当前的state
    // 传递参数，第一个参数 state，第二个参数是组件传过来的 参数
    state.count += count
  },
  cut (state, count) { // 自动加入state。 默认是当前的state
    // 传递参数，第一个参数 state，第二个参数是组件传过来的 参数
    state.count -= count
  }
}
// 加入容器store
const store = new Vuex.Store({
  state,
  mutations,
  plugins: [logger()], // 将打印日志 ，插到 store 中页面 控制台会打印
  strict: true // 只能通过 mutation 来进行突变更改 state，mutation不支持异步
})
// eslint-disable-next-line
new Vue({
  el: '#app',
  ...App,
  store // store 被注册到实例上（类似路由用法） 所有组件都会有一个属性 this.$store
})

// vuex 平级组件交互 跨组件交互
