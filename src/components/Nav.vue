<template>
			<el-menu
			  :default-active="activeIndex"
			  class="el-menu-demo"
			  mode="horizontal"
			  @select="handleSelect"
			  background-color="#545c64"
			  text-color="#fff"
			  active-text-color="#ffd04b">
			  	<el-menu-item index="/home">Home</el-menu-item>
			 	<el-menu-item index="/about">About</el-menu-item>
			 	<el-menu-item index="/albums">相册</el-menu-item>
			 	<el-menu-item index="/regist" id='regist' >注册</el-menu-item>
			 	<el-menu-item index="/login" id='login' >登录</el-menu-item>
			</el-menu>
<!-- 对应的组件内容渲染到router-view中 -->
			
</template>
<!-- router-link 标签导航的时候有事会点击不跳转 -->
<script>
	export default{
		  data() {
      return {
        activeIndex: '/home',
   
      };
    },
    methods: {
      handleSelect(key, keyPath) {
      	this.$router.push(key);
        // console.log("key"+key, keyPath);
      }
    }
	}
</script>

<style>
	#regist, #login{
		float:right;
	}


</style>