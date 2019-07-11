import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'vuex/dist/logger' // 打印日志插件
import state from './state'
import mutations from './mutations'

Vue.use(Vuex)
const getters = {
  val: (state) => state.count % 2 ? '奇数' : '偶数'
}
// 加入容器store
export default new Vuex.Store({
  state,
  mutations,
  getters,
  plugins: [logger()], // 将打印日志 ，插到 store 中页面 控制台会打印
  strict: true // 只能通过 mutation 来进行突变更改 state，mutation不支持异步
})
