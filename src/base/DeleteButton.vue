<template>
    <div>
      <button @click.stop="remove(deleteId)">删除</button>
    </div>
</template>

<script>
// import DeleteButton from '@/base/DeleteButton.vue'
import {removeBook} from '../api'
export default {
  data () {
    return {
    }
  },
  props: ['deleteId', 'das'],
  methods: {
    async remove (id) {
      let {data} = await removeBook(id)
      console.log(data)
      this.$emit('update:das', data)
    }
  },
  components: {
  }
}
</script>

<style scoped>

</style>
