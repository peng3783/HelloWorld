<template>
  <div v-show="showFlag" class="food"></div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object
    }
  },
  data() {
    return {}
  },

  components: {},

  computed: {},

  mounted: {},

  methods: {}
}
</script>
<style lang='stylus' scoped>
.food
  position fixed
  left 0
  top 0
  buttom 48px
  z-index 30
  width 100%
  background-color #fff
  
</style>