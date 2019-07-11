import Vue from 'vue'
import Vuex from 'vuex'
import logger from 'vuex/dist/logger'
import mutations from './mutations'
import getters from './getters'
Vue.use(Vuex)
let state = {
  carList: []
}
// store
// eslint-disable-next-line
export default new Vuex.Store({
  state,
  mutations,
  getters,
  plugins: [logger()],
  strict: true
})
