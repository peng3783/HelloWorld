<template>
  <div class="shopcart">
      <div class="content">
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
          <div class="content-right">
              <div class="pay">
                  {{payDesc}}
              </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    selectFoods: {
      type: Array,
      default() {
        return [{ price: 10, count: 2 }]
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.shopcart
  position fixed
  left 0
  bottom 0
  z-index 50
  width 100%
  height 48px
  background-color red
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
        background-color rgb(43, 51, 59)
</style>
