<template>
<div class="header">
  <slot></slot>
  <i class="iconfont icon-fanhui" v-if="back" @click="goBacked"></i>
</div>
</template>

<script>
export default {
  data () {
    return {}
  },
  props: {
    back: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBacked () {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped lang="less">
.header{
  position: fixed;
  top:0;
  background-color: bisque;
  width:100%;
  height:40px;
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  i{
    position:absolute;
    left:10px;
    top:0;
  }
}
</style>
