<template>
  <div class="cartcontrol">
      <transition name="move">
        <div class="cart-decrease " v-show="food.count > 0" @click="decrease">
          <span class="inner icon-remove_circle_outline" ></span>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('oncartadd', event.target)
    },
    decrease() {
      this.food.count--
    }
  }
}
</script>

<style lang="stylus" scoped>
.cartcontrol
  font-size 0
  .cart-decrease
    display inline-block
    padding 6px
    opacity 1
    transition all 0.4s linear
    transform translate3d(0, 0, 0)
    .inner
      display inline-block
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
      transition all 0.4s linear
      transform rotate(0)
    &.move-enter-active, .move-leave-active
      opacity 1
    &.move-enter, &.move-leave-to
      opacity 0
      transform translate3d(24px, 0, 0)
      .inner
        transform rotate(180deg)
  .cart-count
    display inline-block
    vertical-align top
    width 24px
    height 24px
    padding-top 6px
    line-height 24px
    text-align center
    font-size 10px
    color rgb(147, 153, 159)
  .cart-add
    display inline-block
    padding 6px
    line-height 24px
    font-size 24px
    color rgb(0, 160, 220)
</style>
