import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// 图片懒加载
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562778531292&di=f87c9657cea16f349202c06b927b2561&imgtype=0&src=http%3A%2F%2Fimg1.juimg.com%2F161122%2F330846-161122230S845.jpg',
  loading: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1562778578916&di=a19970bbad9f0e3ad3fd04c85ce6f1b5&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01f3a657902ac20000012e7e5e2fed.gif',
  attempt: 1
})

Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false
// eslint-disable-next-line
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
