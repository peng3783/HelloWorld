<template>
  <div class="title">
      <div class="line border-1px"></div>
      <div class="text">{{str}}</div>
      <div class="line border-1px"></div>
  </div>
</template>

<script>
export default {
  props: {
    str: {
      type: String
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../common/stylus/mixin.styl'
.title
  display flex
  width 80%
  margin 30px auto 24px auto
  .line
    flex 1
    position relative
    top -6px
    border-1px(rgba(255, 255, 255, 0.5))
  .text
    padding 0 12px
    font-size 14px
</style>

