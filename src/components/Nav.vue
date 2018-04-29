<template>
<div class="navtab border-1px">
        <div class="tab-item">
            <router-link to = "/home">Home</router-link>
        </div>
        <div class="tab-item"><router-link to = "/about">Music</router-link></div>
        <div class="tab-item"><router-link to = "/albums">相册</router-link></div>
				<div class="tab-item"><router-link to = "/sell">外卖</router-link></div>
				<div class="tab-item"><router-link to = "/regist">注册</router-link></div>
				<div class="tab-item"><router-link to = "/login">登录</router-link></div>
</div>			
</template>
<!-- router-link 标签导航的时候有事会点击不跳转 -->
<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "../common/stylus/mixin.styl"
.navtab
	display flex
	background-color rgba(160, 132, 132, 0.58)
	width 100%
	min-width 300px
	height 40px
	line-height 40px
	.tab-item
		flex 1
		min-width 50px
		text-align center
		& > a
			display block
			&.active
				color rgb(109, 6, 24)
				border-1px(rgba(109, 6, 24, 0.8))
				
</style>