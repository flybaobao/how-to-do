import * as Types from './mutations.type'

const mutations = {
  [Types.CHANGE_CART] () {
    // 改变商品数

  },
  [Types.DEL_CART] () {
    // 清空购物车

  },
  [Types.REMOVE_CART] () {
    // 删除商品

  },
  [Types.ADD_CART] (state, book) {
    // 增加商品
    // book是添加的一本图书，如果 数据里有这本书，则累加数量；如果没有这本书，则+1
    let product = state.carList.find(item => item.bookId === book.bookId)
    if (product) {
      product.count += 1
      state.carList = [...state.carList]
    } else {
      book.count = 1
      // state.carList.push(book)
      state.carList = [...state.carList, book]
    }
  }
}
export default mutations
