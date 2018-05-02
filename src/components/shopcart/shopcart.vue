<template>
<div>
  <div class="shopcart">
      <div class="content" @click="toggleList">
          <div class="content-left">
              <div class="logo-wrapper">
                  <div class="logo" :class="{'heightlight':totalCount > 0}" >
                      <i class="icon-shopping_cart" :class="{'heightlight':totalCount > 0}"></i>
                  </div>
                  <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
              </div>
              <div class="price" :class="{'heightlight':totalPrice > 0}">￥{{totalPrice}}</div>
              <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
          </div>
          <div class="content-right" @click.stop.prevent="pay" >
              <div class="pay" :class="payClass">
                  {{payDesc}}
              </div>
          </div>
      </div>
      <div class="ball-container">
        <transition-group name="drop" 
          v-on:before-enter="beforeEnter"
          v-on:enter="enter" 
          v-on:after-enter="afterEnter"
        >
          <div v-for="(ball, index) in balls" v-show="ball.show" class="ball" :key="index">
            <div class="inner inner-hook"></div>
          </div>          
        </transition-group>
      </div>
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li class="food" v-for="(food, index) in selectFoods" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol :food="food"></cartcontrol>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>  
  </div>
  <transition name="fade">
    <div class="list-mask" @click="hideList" v-show="listShow"></div>    
  </transition>
</div>  
</template>

<script>
import BScroll from 'better-scroll'
import cartcontrol from '../cartcontrol/cartcontrol.vue'

export default {
  components: {
    cartcontrol
  },
  props: {
    selectFoods: {
      type: Array,
      default() {
        return []
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      balls: [
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        },
        {
          show: false
        }
      ],
      dropBalls: [],
      fold: true
    }
  },
  computed: {
    totalPrice() {
      let total = 0
      this.selectFoods.forEach(food => {
        total += food.price * food.count
      })
      return total
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach(food => {
        count += food.count
      })
      return count
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass() {
      if (this.totalPrice < this.minPrice) {
        return 'not-enough'
      } else {
        return 'enough'
      }
      console.log(1)
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true
        return false
      }
      let show = !this.fold
      if (show) {
        if (!this.scroll) {
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.listContent, {
              click: true
            })
          })
        } else {
          this.scroll.refresh()
        }
      }
      return show
    }
  },
  methods: {
    drop(el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ball = this.balls[i]
        if (!ball.show) {
          ball.show = true
          ball.el = el
          this.dropBalls.push(ball)
          return
        }
      }
    },
    beforeEnter(el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.show) {
          /*不知道为什么小球动画的起始位置很奇怪,推测是el的位置问题 */
          //浏览器的方法，获得元素视口的位置
          let rect = ball.el.getBoundingClientRect()
          //32小球的偏移值
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
          el.style.transform = `translate3d(0, ${y}px, 0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px, 0, 0)`
          inner.style.transform = `translate3d(${x}px, 0, 0)`
        }
      }
    },
    enter(el, done) {
      /* 主动触发浏览器重绘*/
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0, 0, 0)'
        el.style.transform = 'translate3d(0, 0, 0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0, 0, 0)'
        inner.style.transform = 'translate3d(0, 0, 0)'
      })
      //增加了done
      done()
    },
    afterEnter(el) {
      let ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        // el.style.display = 'none'
      }
    },
    toggleList() {
      if (!this.totalCount) {
        return
      }
      this.fold = !this.fold
    },
    empty() {
      this.selectFoods.forEach(food => {
        food.count = 0
      })
    },
    hideList() {
      this.fold = true
    },
    pay() {
      if (this.totalPrice < this.minPrice) {
        return
      }
      window.alert(`支付${this.totalPrice}`)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.shopcart
  position fixed
  left 0
  bottom 0
  z-index 50
  width 100%
  height 48px
  .content
    display flex
    background-color rgb(20, 29, 39)
    color rgba(255, 255, 255, 0.4)
    .content-left
      flex 1
      font-size 0
      .logo-wrapper
        display inline-block
        position relative
        vertical-align top
        top -10px
        margin 0 12px
        padding 6px
        width 56px
        height 56px
        box-sizing border-box
        vertical-align top
        border-radius 50%
        background-color #141d27
        .logo
          width 100%
          height 100%
          border-radius 50%
          text-align center
          background-color rgb(43, 52, 60)
          &.heightlight
            background-color rgb(0, 160, 220)
          .icon-shopping_cart
            line-height 44px
            font-size 24px
            color #80858a
            &.heightlight
              color #fff
        .num
          position absolute
          top 0
          right 0
          width 24px
          height 16px
          line-height 16px
          text-align center
          border-radius 16px
          font-size 9px
          font-weight 700
          color rgb(255, 255, 255)
          background-color rgb(240, 20, 20)
          box-shadow 0px 4px 8px 0px rgba(0, 0, 0, 0.4)
      .price
        display inline-block
        vertical-align top
        margin-top 12px
        line-height 24px
        padding-right 12px
        box-sizing border-box
        border-right 1px solid rgba(255, 255, 255, 0.1)
        font-size 16px
        font-weight 700
        &.heightlight
          color #fff
      .desc
        display inline-block
        vertical-align top
        margin 12px 0 0 12px
        line-height 24px
        font-size 12px
    .content-right
      flex 0 0 105px
      width 105px
      .pay
        height 48px
        line-height 48px
        text-align center
        font-size 12px
        font-weight 700
        &.not-enough
          background-color rgb(43, 51, 59)
        &.enough
          background-color #00b43c
          color #fff
  .ball-container
    .ball
      position fixed
      left 32px
      bottom 22px
      z-index 200
      transition all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
      .inner
        width 16px
        height 16px
        border-radius 50%
        background-color rgb(0, 160, 220)
        transition all 0.4s linear
  .shopcart-list
    position absolute
    left 0
    top 0
    z-index -1
    width 100%
    // transition all  0.5s
    transform translate3d(0, -100%, 0)
    &.fold-enter-active, &.fold-leave-active
      transition all 0.5s
    &.fold-enter, &.fold-leave-to
      transform translate3d(0, 0, 0)
    .list-header
      height 40px
      line-height 40px
      padding 0 18px
      background-color #f3f5f7
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .title
        float left
        font-size 14px
        font-weight 200
        color rgb(7, 17, 27)
      .empty
        float right
        font-size 12px
        color rgb(0, 160, 220)
    .list-content
      padding 0 18px
      max-height 217px
      overflow hidden
      background-color #ffffff
      .food
        position relative
        padding 12px 0
        box-sizing border-box
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          line-height 24px
          font-size 14px
          color rgb(7, 17, 27)
        .price
          position absolute
          right 96px
          bottom 12px
          line-height 24px
          font-size 14px
          font-weight 700
          color rgb(240, 20, 20)
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 6px
.list-mask
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  z-index 40
  backdrop blur(10px)
  opacity 1
  background-color rgba(7, 17, 27, 0.6)
  transition all 0.5s
  &.fade-enter, &.fade-leave-to
    opacity 0
    background-color rgba(7, 17, 27, 0)
</style>
