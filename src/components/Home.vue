<template>
    <div>
      <Header :back="false">首页</Header>
      <div class="content">
        <Loading v-if="loading"></Loading>
        <template v-else>
          <Swiperdemo :swiperSlides="dataSliders"></Swiperdemo>
          <div class="list" v-for=" (book , key) in hotBooks" :key="key">
            <img :src="book.bookCover" alt="">
            <div class="info" :id="book.bookId">
              <p>{{book.bookName}}</p>
              <p>{{book.bookInfo}}</p>
              <p>{{book.bookPrice}}</p>
              <p>{{book.bookOldPrice}}</p>
            </div>
          </div>
        </template>

      </div>

    </div>
</template>

<script>
import Header from '@/base/Header.vue'
import Swiperdemo from '@/base/Swiperdemo.vue'
import Loading from '@/base/Loading.vue'
// import {getSliders, getHotBooks} from '../api/index.js'
import {getAll} from '../api/index.js'
export default {
  data () {
    return {
      dataSliders: {},
      hotBooks: {},
      loading: true
    }
  },
  components: {
    Header,
    Swiperdemo,
    Loading
  },
  created () {
    /**
     * this._getSliders()
     this._getHotBooks()
     * */
    this._getDate()
  },
  methods: {
    async _getDate () {
      let [dataSliders, hotBooks] = await getAll()// 返回的是数组[dataSliders,hotBooks]
      this.dataSliders = dataSliders.data
      this.hotBooks = hotBooks.data
      this.loading = false
      /**
       * 轮播图和热门图书获取完成
       async _getSliders () {
        let {data} = await getSliders()
         this.dataSliders = data
        },
       async _getHotBooks () {
        let {data} = await getHotBooks()
         this.hotBooks = data
       }
       */
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
    }
    .info{
      width:50%;
      p{
        text-align:left;
        padding: 10px 0;
      }
    }
  }
</style>
