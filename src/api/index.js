import axios from 'axios'
// axios在这里可以做拦截
// axios.interceptors.response.use((res)=>{
//  return res.data   // 将res.data返回赋值给res，在接下来的 axios请求中 所有的res都被res.data赋值
// })
axios.defaults.baseURL = 'http://localhost:3000'

export let getSliders = () => {
  return axios.get('/sliders')
}

export let getHotBooks = () => {
  return axios.get('/hot')
}

export let getBook = () => {
  return axios.get('/book')
}
// 删除木一本图书
export let removeBook = (id) => {
  return axios.delete(`/book?id=${id}`)
}
// 获取某一本书
export let findBook = (id) => {
  return axios.get(`/book?id=${id}`)
}
// 更新图书
/*
* return {AxiosPromise}
* */

export let unpdateBook = (id, data) => {
  return axios.put(`/book?id=${id}`, data)
}

export let addBook = (data) => {
  return axios.post('/book', data)
}

// 获取全部axios 基于promise  实现loading
export let getAll = () => {
  return axios.all([getSliders(), getHotBooks()])
}

// 获取更多数据
export let getMoreBooks = (nums) => {
  return axios.get(`/more?offset=${nums}`)
}
