import * as Types from './mutatuions.type'

// 加入mutation更改 state 突变方法
const mutations = {
  [Types.INCREMENT] (state, count) { // 自动加入state。 默认是当前的state
    // 传递参数，第一个参数 state，第二个参数是组件传过来的 参数
    state.count += count
  },
  [Types.DECREMENT] (state, count) { // 自动加入state。 默认是当前的state
    // 传递参数，第一个参数 state，第二个参数是组件传过来的 参数
    state.count -= count
  }
}
export default mutations

// 宏 快捷键 ---》方法  mutations-types
