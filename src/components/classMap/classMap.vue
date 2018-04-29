<template>
  <span class="icon" :class="classMap[index]"></span>
</template>

<script>
const classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
export default {
  props: {
    index: {
      type: Number
    }
  },
  data() {
    return {
      classMap
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
