let getters = {
  count: (state) => state.carList.reduce((prev, next) => prev + next.count, 0),
  allPrice: (state) => state.carList.reduce((prev, next) => prev + next.count * next.bookPrice, 0)
}

export default getters
