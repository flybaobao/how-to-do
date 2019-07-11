<template>
    <div>
      <Header :back="true">上拉加载|下拉刷新</Header>
      <div class="dark" v-if="isloading">
        <Loading></Loading>
      </div>
      <div class="content" ref="scroll" @scroll="loadMore">
        <ul>
          <router-link class="list" v-for=" (book , key) in books" :key="key" :to="{name:'listdetail',params:{id:book.bookId}}" tag="li">
            <img v-lazy="book.bookCover" alt="">
            <div class="info" :id="book.bookId">
              <p>{{book.bookName}}</p>
              <p>{{book.bookInfo}}</p>
              <p>{{book.bookPrice}}</p>
              <p>{{book.bookOldPrice}}
              </p>
            </div>
          </router-link>
          <div v-if="hasMore&&!isloading" @click="loadings" class="more">加载更多0....</div>
        </ul>
      </div>
    </div>
</template>

<script>
import Header from '@/base/Header.vue'
import Loading from '@/base/Loading.vue'
import {getMoreBooks} from '../api'
export default {
  data () {
    return {
      books: [],
      loading: true,
      offset: 0,
      hasMore: true,
      isloading: false, // 判断正在加载中认为不可刷新 的 判断条件
      timer: null
    }
  },
  components: {
    Header,
    Loading
  },
  created () {
    this._getData()
  },
  mounted () {
    let scroll = this.$refs.scroll // 获取需要拖拽的元素
    let top = scroll.offsetTop
    let flag = false
    scroll.addEventListener('touchstart', (e) => {
      console.log(scroll.offsetTop)
      if (scroll.scrollTop !== 0 && scroll.offsetTop !== top) {
        // 判断它的滚动条在 0这个位置 和 判断在顶部时候 下拉刷新
        return
      }
      let start = e.touches[0].pageY
      let distance = 0
      let move = (e) => {
        flag = true
        let corrent = e.touches[0].pageY
        distance = corrent - start
        if (distance > 0) {
          if (distance <= 50) {
            scroll.style.top = distance + top + 'px'
          } else {
            distance = 50
            scroll.style.top = top + 50 + 'px'
          }
        } else {
          // 如果不在考虑范围内 移掉 move 和  end 事件
          scroll.removeEventListener('touchmove', move)
          scroll.removeEventListener('touchend', end)
        }
      }
      let end = (e) => {
        if (!flag) {
          return
        }
        flag = false
        clearInterval(this.timer)
        this.timer = setInterval(() => {
          if (distance <= 0) {
            clearInterval(this.timer)
            distance = 0
            scroll.style.top = top + 'px'
            scroll.addEventListener('touchmove', move)
            scroll.addEventListener('touchend', end)
            this.books = []
            this.offset = 0
            this._getData()
            return
          }
          distance -= 1
          scroll.style.top = top + distance + 'px'
        }, 1)
      }
      scroll.addEventListener('touchmove', move)
      scroll.addEventListener('touchend', end)
    }, false)
  },
  methods: {
    loadMore () {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        let {scrollTop, clientHeight, scrollHeight} = this.$refs.scroll
        if (scrollTop + clientHeight >= scrollHeight) {
          this._getData()
        }
      }, 13)
      // 上去的高度，当前可见区域的 高度， 总共的高度
      // 触发scroll事件可能会触发多次，先来一个定时器，下一次触发时清除上一次定时器
      // 可以避免抖屏，节流，不然没滚动都要求值性能不好
    },
    loadings () {
      this._getData()
    },
    async _getData () {
      if (this.hasMore && !this.isloading) {
        this.isloading = true
        let data = await getMoreBooks(this.offset)
        this.books = this.books.concat(data.data.morebooks)
        this.hasMore = data.data.hasMore
        this.offset = this.books.length
        this.loading = false
        this.isloading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
  .list{
    border-bottom: 1px solid #ccc;
    margin: 10px 0;
    display: flex;
    flex:1;
    justify-content: center;
  img{
    width:40%;
    height: 100%;
    margin: 5px 10px;
    text-align:left ;
  }
  .info{
    width:50%;
  p{
    text-align:left;
    padding: 10px 0;
  }
  }
  }
  .more{
    height:30px;
  }
  .dark{
    position:fixed;
    top:40px;
    bottom:50px;
    width:100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 100;
  }
</style>
