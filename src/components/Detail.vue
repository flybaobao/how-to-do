<template>
    <div>
      <Header :back="true">
        shopping</Header>
      <ul class="content">
        <li class="list" v-for=" (book , key) in carList" :key="key">
          <img :src="book.bookCover" alt="">
          <div class="info" :id="book.bookId">
            <p>{{book.bookName}}</p>
            <p>{{book.bookInfo}}</p>
            <p>{{book.bookPrice}}</p>
            <p>{{book.bookOldPrice}}</p>
            <p class="bottom">
              <span>数量:</span>
              <span>
                <button @click.stop="">+</button>
                <span>{{book.count}}</span>
                <button @click.stop="">-</button>
                <button>删除</button>
              </span>
            </p>
            <p>小计: {{book.count*book.bookPrice + '￥'}}</p>
          </div>
        </li>
        <li>共计{{count}}本，总价:{{allPrice + '￥'}}</li>
      </ul>
    </div>
</template>

<script>
import Header from '@/base/Header.vue'
// 辅助函数解决 vuex里面的数据 简洁
import {mapState, mapGetters} from 'vuex'
// console.log(mapState(['carList']))
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState(['carList']), // 展开这里面的对象
    ...mapGetters(['count']),
    ...mapGetters(['allPrice'])
  },
  components: {
    Header
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
