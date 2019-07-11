<template>
    <div class="detail">
      <Header :back="true">详情</Header>
      <div class="content" v-if="book.bookName">
        <img :src="book.bookCover" alt="">
        <div class="info" :id="book.bookId">
          <p>{{book.bookName}}</p>
          <p>{{book.bookInfo}}</p>
          <p>{{book.bookPrice}}</p>
          <p>{{book.bookOldPrice}}</p>
        </div>
        <ul>
          <li>
            <label for="bookname">更改书名</label>
            <input type="text" id="bookname" v-model="book.bookName">
          </li>
          <li>
            <label for="bookInfo">更改介绍</label>
            <input type="text" id="bookInfo" v-model="book.bookInfo">
          </li>
          <li>
            <label for="bookPrice">现价更改</label>
            <input type="number" id="bookPrice"  v-model="book.bookPrice">
          </li>
          <li>
            <label for="bookOldPrice">更改原价</label>
            <input type="number" id="bookOldPrice" v-model="book.bookOldPrice">
          </li>
        </ul>
        <button @click="update">提交</button>
      </div>

    </div>
</template>

<script>
import Header from '@/base/Header.vue'
import {findBook, unpdateBook} from '../api'
export default {
  data () {
    return {
      book: {}
    }
  },
  watch: {
    // 监听参数发生变化 页面就刷新
    $route () {
      this._getBook()
    }
  },
  components: {
    Header
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  },
  created () {
    this._getBook()
  },
  methods: {
    async _getBook () {
      let {data} = await findBook(this.id)
      this.book = data
      // 检测对象是不是空
      Object.keys(this.book).length > 0 ? void 0 : this.$router.push('/list')
    },
    async update () {
      await unpdateBook(this.id, this.book)
      // 修改完成后跳转页面  到list
      this.$router.push('/list')
    }
  },
  mounted () {
  }
}
</script>

<style scoped lang="less">
  .detail{
    position: absolute;
    left:0;
    top:0;
    bottom: 0;
    right:0;
    background-color: #fff;
    z-index:99;
  }
    img{
      width:40%;
      margin: 5px 10px;
    }
    .info{
      width:50%;
      p{
        text-align:left;
        padding: 10px 0;
      }
    }

  li{margin:10px 0}
</style>
