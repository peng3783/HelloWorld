<template>
  <div class="container">
    <div class="container-wrapper clearfix">
      <div class="main">
        <Nav></Nav>
         <!-- 注释掉keep-alive才能显示 router-view,关于keep-alive的应用，这里就不需要keep-alive来保存数据-->
          <keep-alive>
            <router-view ></router-view>
          </keep-alive>
          <router-view name="sellview"></router-view>
    </div>
    </div>
    <!-- <footer>I am footer </footer> -->
  </div>
</template>

<script>
import Nav from './components/Nav.vue'
export default {
  data() {
    return {}
  },
  components: {
    Nav
  }
}
</script>

<style lang="stylus" scoped>
.container
  position fixed
  width 100%
  height 100%
  overflow scroll
  .container-wrapper
    width 100%
    min-height 100%
    .main
      padding-bottom 32px
  footer
    position relative
    margin -32px auto 0 auto
    clear both
</style>
