# my

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 安装less less-loader axio vuex bootstrap
## 热门图书的功能
- 先写服务器，确保数据能够正常返回
- 增加api 方法，实现调取数据的功能
- 在那个组件中应用这api 如果是一个基础组件需要用到这些数据，在使用这个组件的父级组件中调用这个方法，将数据传递给基础组件
- 写一个基础组件，
 + 1.创建一个.vue文件
 + 2.在需要使用这个组件的父级中引用这个组件
 + 3.在组件中注册
 + 4.以标签的形式引入  
## 路由元信息
- 访问页面  希望有缓存 router.vuejs.org
## 路由动画
## 下拉加载功能
- 默认每次加5条，前端告诉后台现在 要从第几条开始给我
- /more？offset = 5
- 后台返回还要告诉 前端是否需要 更多数据 hasMore：false

vue 上拉下刷 都有插件，GitHub vue-pull-refresh
## 图片懒加载 onload
- vue-lazyload
```
$ npm i vue-lazyload -S
// https://github.com/hilongjw/vue-lazyload
```
## 项目发布
- 代码分割
- coding split        router.vuejs.org

路由中动态 加载组件   脚手架中自带
https://router.vuejs.org/zh/guide/advanced/lazy-loading.html
之前是静态 先加载组件

- 打包完毕之后生成要上线的 dist文件
- 此时 本地 运行的server 要有静态服务 便于 读取本地  dist文件夹里面的 文件
- see to 扔至服务器，运行server即可
```
ssh yonghuming@fuwuqi
shurumima
cd /home/
cd mock/
node server.js // (本地启动不可一直挂着)  所以

pm2 start server.js
```
- 访问 fuwuqi:3000/index.html
- src1 vuex
## vuex
- // vuex 平级组件交互 跨组件交互
- vuex 为了大型项目 主要是状态管理，将数据统一管理
- this.$store 所有组件都会拥有此属性
- vuex是单项数据流，当数据渲染到页面上的时候，不可以直接反过来更改
```
state->vuecomponent ->action ->mutation(突变)-》state
```
```
let a = 'b'
let obj = {a: '1'}
console.log(obj) // {a: '1'}

let obj1 = {[a]: '1'}
console.log(obj1) // {b: '1'}
```
- 使用vuex 将数据都提取出去了，那么这里的数据不在组件中，该怎么去计算属性的呢/
 + getter
  * 在sotre 容器中可以加入 getter这个属性进行计算 state
  ```
  const getters = {
    val (state) => state.count%2?‘奇数'：’偶数‘
  }
  // 组件中使用 val
  $store.getter.val
  ```
