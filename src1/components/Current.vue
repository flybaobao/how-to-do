<template>
  <div>
    <button @click="add">+</button>
    <p>{{$store.getters.val}}</p>
    <p>{{$store.state.count}}</p>
    <button @click="cut">-</button>
  </div>
</template>

<script>
import * as Types from '../store/mutatuions.type'
export default {
  data () {
    return {
      num: 0
    }
  },
  methods: {
    add () { // 提交add mutation
      this.$store.commit(Types.INCREMENT, 2)
    },
    cut () {
      this.$store.commit(Types.DECREMENT, 3)
    }
  }
}
</script>

<style scoped lang="less">

</style>
