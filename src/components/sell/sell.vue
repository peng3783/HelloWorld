<template>
<div class="sell">
    <vheader :seller="seller"></vheader>
    <div class="tab border-1px">
        <div class="tab-item">
            <router-link to = "/sell/goods">商品</router-link>
        </div>
        <div class="tab-item"><router-link to = "/sell/ratings">评论</router-link></div>
        <div class="tab-item"><router-link to = "/sell/seller">商家</router-link></div>
    </div>
</div>
  
 
</template>
<script>
import vheader from '../header/header.vue'
import { mapState } from 'vuex'

export default {
  created() {
    this.$store.dispatch('vInitSeller')
  },
  components: {
    vheader
  },
  computed:mapState([
      'seller'
  ])
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin.styl'
.sell
    .tab
        display flex
        width 100%
        height 40px
        line-height 40px
        // border-bottom 1px solid rgba(7, 17, 27, 0.1)
        border-1px(rgba(7, 17, 27, 0.1))
        .tab-item
            flex 1
            text-align center
            & > a
                display block
                font-size 14pxs
                color rgb(77, 85, 93)
                &.active
                    color rgb(240, 20, 20)
</style>