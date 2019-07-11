<template>
    <div>
      <Header :back="true">list</Header>
      <div class="content">
        <router-link class="list" v-for=" (book , key) in books" :key="key" :to="{name:'listdetail',params:{id:book.bookId}}" tag="div">
          <img :src="book.bookCover" alt="">
          <div class="info" :id="book.bookId">
            <p>{{book.bookName}}</p>
            <p>{{book.bookInfo}}</p>
            <p>{{book.bookPrice}}</p>
            <p>{{book.bookOldPrice}}</p>
            <div class="bottom">
              <button @click.stop="addCart(book)">添加</button>
              <DeleteButton :deleteId="book.bookId" :das.sync="books"></DeleteButton>
            </div>
          </div>
        </router-link>
      </div>
    </div>
</template>

<script>
import Header from '@/base/Header.vue'
import DeleteButton from '@/base/DeleteButton.vue'
import {getBook} from '../api'
import * as Types from '../store/mutations.type'
export default {
  data () {
    return {
      books: []
    }
  },
  components: {
    Header,
    DeleteButton
  },
  created () {
    this._getData()
  },
  methods: {
    addCart (book) {
      this.$store.commit(Types.ADD_CART, book)
    },
    async _getData () {
      let {data} = await getBook()
      this.books = data
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
    padding: 5px 0;
  }
    .bottom{
      display: flex;
      justify-content: space-around;
      margin-bottom: 10px;
    }
  }
  }
</style>
