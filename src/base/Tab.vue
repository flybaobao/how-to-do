<template>
    <div class="footer">
      <router-link to="/home"><i class="iconfont icon-shouye"></i>home</router-link>
      <router-link to="/list"><i class="iconfont icon-icon--"></i>list</router-link>
      <router-link to="/add"><i class="iconfont icon-tianjia"></i>add</router-link>
      <router-link to="/detail"><i class="iconfont icon-gouwuche"></i>shopping</router-link>
      <router-link to="/listmore"><i class="iconfont icon-jiazai"></i>load</router-link>
    </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped lang="less">
.footer{
  display: flex;
  position: fixed;
  bottom: 0;
  left:0;
  width:100%;
  height:50px;
  border-top: 1px solid #ccc;
  a{
    display: flex;
    flex-direction:column;
    flex:1;
    align-items: center;
    justify-content:center;
  }
  .router-link-active{
     color: red;
   }
}
</style>
