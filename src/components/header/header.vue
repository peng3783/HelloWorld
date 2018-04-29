<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <!-- <span class="icon" :class="classMap[seller.supports[0].type]" ></span> -->
          <class-map :index="seller.supports[0].type"></class-map>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports"
       class="support-count"
       @click="showDetail" >
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
  <transition name="fade">
    <div v-show="detailShow" class="detail" >
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score" ></star>
          </div>
          <vertical-line :str="'优惠信息'"></vertical-line>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item, index) in seller.supports" :key="index">
              <!-- <span class="icon" :class="classMap[seller.supports[index].type]"></span> -->
              <class-map :index="seller.supports[index].type"></class-map>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <vertical-line :str="'商家公告'"></vertical-line>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail()">
        <i class="icon-close"></i>
      </div>
    </div>
  </transition>
  </div>
</template>
<script>
import star from '../star/star.vue'
import classMap from '../classMap/classMap.vue'
import verticalLine from '../verticalLine.vue'
export default {
  props: {
    seller: {
      type: Object
    }
  },
  created() {
    // this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  data() {
    return {
      detailShow: false
    }
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    hideDetail() {
      this.detailShow = false
    }
  },
  components: {
    star,
    verticalLine,
    classMap
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixin.styl'
.header
  position relative
  color #fff
  background-color rgba(7, 17, 27, 0.3)
  overflow hidden
  .content-wrapper
    position relative
    padding 24px 12px 36px 24px
    font-size 0
    .avatar
      display inline-block
      vertical-align top
      width 64px
      height 64px
      img
        border-radius 2px
    .content
      display inline-block
      vertical-align top
      margin-left 16px
      .title
        margin 2px 0 8px 0
        .brand
          display inline-block
          vertical-align top
          width 30px
          height 18px
          bg-image('brand')
          background-size 30px 18px
          background-repeat no-repeat
        .name
          margin-left 6px
          font-size 16px
          line-height 18px
          font-weight blod
      .description
        margin-bottom 10px
        font-size 12px
        line-height 12px
      .support
        .icon
          display inline-block
          vertical-align top
          margin-right 4px
          width 12px
          height 12px
          background-size 12px 12px
          background-repeat no-repeat
          icon-image(1)
          // &.decrease
          //   bg-image('decrease_1')
          // &.discount
          //   bg-image('discount_1')
          // &.special
          //   bg-image('special_1')
          // &.invoice
          //   bg-image('invoice_1')
          // &.guarantee
          //   bg-image('guarantee_1')
        .text
          font-size 10px
          line-height 12px
    .support-count
      position absolute
      right 12px
      bottom 18px
      padding 0 8px
      height 24px
      line-height 24px
      border-radius 14px
      background-color rgba(0, 0, 0, 0.2)
      text-align center
      .count
        vertical-align top
        font-size 10px
      .icon-keyboard_arrow_right
        margin-left 2px
        line-height 24px
        font-size 10px
  .bulletin-wrapper
    position relative
    height 28px
    line-height 28px
    padding 0 24px 0 12px
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
    background-color rgba(7, 17, 27, 0.3)
    .bulletin-title
      display inline-block
      vertical-align top
      margin-top 8px
      width 22px
      height 12px
      bg-image('bulletin')
      background-size 22px 12px
      background-repeat no-repeat
    .bulletin-text
      vertical-align top
      margin 0 4px
      font-size 10px
      line-height 28px
    .icon-keyboard_arrow_right
      position absolute
      font-size 10px
      right 12px
      top 8px
  .background
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    z-index -1
    filter blur(2px)
  .detail
    position fixed
    z-index 100
    top 0
    left 0
    width 100%
    height 100%
    overflow auto 
    background-filter blur(10px)

    // transition all 0.5s
    background-color rgba(7, 17, 27, 0.8)
    &.fade-enter-active, &.fade-leave-active
      transition all 0.5s ease
    &.fade-enter, &.fade-leave-to
      opacity 0
    .detail-wrapper
      min-height 100%
      width 100%
      .detail-main
        margin-top 64px
        padding-bottom 64px
        .name
          text-align center
          font-weight 700
          font-size 16px
          line-height 16px
          margin-bottom 18px
        .star-wrapper
          padding 2px 0
          text-align center
        .supports
          width 80%
          margin 0 auto
          .support-item
            padding 0 12px
            margin-bottom 12px
            font-size 0
            &:last-child
              margin-bottom 0
            .icon
              display inline-block
              width 16px
              height 16px
              vertical-align top
              margin-right 6px
              background-size 16px 16px
              background-repeat no-repeat
              icon-image(2)
              // &.decrease
              //   bg-image('decrease_2')
              // &.discount
              //   bg-image('discount_2')
              // &.special
              //   bg-image('special_2')
              // &.invoice
              //   bg-image('invoice_2')
              // &.guarantee
              //   bg-image('guarantee_2')
            .text
              line-height 16px
              font-size 12px
        .bulletin
          width 80%
          margin 0 auto
          .content
            padding 0 12px
            line-height 24px
            font-size 12px
    .detail-close
      position relative
      width 32px
      height 32px
      margin -64px auto 0 auto
      clear both
      font-size 32px
</style>
