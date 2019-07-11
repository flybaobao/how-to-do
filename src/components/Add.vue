<template>
  <div>
    <Header :back="true">详情</Header>
    <div class="content">
      <ul>
        <li>
          <label for="bookcover">输入封面</label>
          <input type="text" id="bookcover" v-model="book.bookCover">
        </li>
        <li>
          <label for="bookname">输入书名</label>
          <input type="text" id="bookname" v-model="book.bookName">
        </li>
        <li>
          <label for="bookInfo">输入介绍</label>
          <input type="text" id="bookInfo" v-model="book.bookInfo">
        </li>
        <li>
          <label for="bookPrice">输入现价</label>
          <input type="number" id="bookPrice"  v-model="book.bookPrice">
        </li>
        <li>
          <label for="bookOldPrice">输入原价</label>
          <input type="number" id="bookOldPrice" v-model="book.bookOldPrice">
        </li>
      </ul>
      <button @click="add">添加</button>
    </div>

  </div>
</template>

<script>
import Header from '@/base/Header.vue'
import {addBook} from '../api'
export default {
  data () {
    return {
      book: {},
      msg: '111'
    }
  },
  watch: {

  },
  components: {
    Header
  },
  computed: {

  },
  created () {

  },
  methods: {
    async add () {
      await addBook(this.book)
      this.$router.push('/list')
    }
  },
  mounted () {

  }
}
</script>

<style scoped lang="less">
  img{
    width:40%;
    margin: 5px 10px;
  }
  .info{
    p{
      text-align:left;
      padding: 10px 0;
    }
  }
  li{margin:10px 0}
</style>
