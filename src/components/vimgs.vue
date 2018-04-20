<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/albums' }">相册</el-breadcrumb-item>
		  <el-breadcrumb-item>{{$store.state.wjjname}}</el-breadcrumb-item>
		</el-breadcrumb>

		<ul>
			 <el-row :gutter="10">
			  <el-col :xs="12" :sm="10" :md="6" :lg="6"
			      v-for="item in $store.state.imgs"
			   	  :key="item.id"
			    ><li class="box" ><a><img
			    :src="'/list/'+$store.state.wjjname+'/'+item"
			    height="100%" width="100%" alt=""><h4>{{item}}</h4></a></li>
        </el-col>
			</el-row>
		</ul>


	</div>
</template>

<script>
//1、动态url绑定在v-bind标签中，单引号' '引用的内容作为字符串存在；双引号" "引用的内容作为变量/表达式存在，可以进行运算。
// 2、直接把数据赋值个data里面不会视图刷新，所以图片请求的时候会发生错误
//3、为什么空文件的时候还会发送上一次请求吧从路由获得的$route.params.imgs改成从store获得的$store.state.wjjname--为什么可以不要this~~
	export default {
    created(){
      // 直接刷新页面无法获取到页面的照片
      // this.$store.dispatch("vtiaozhuan",this.$router.params);
      // console.log(this.$router.params)
    },
		data(){
			return {

			}
		}
	}
</script>

<style scoped>
  .box {
    padding: 10px 10px 20px 10px;
    margin: 0 0 20px 0 !important;
    background: #fff;
    box-shadow: inset 0px 0px 0px 1px rgba(0,0,0,0.15), 0px 2px 3px 0px rgba(0,0,0,0.1);
    text-align: center;
    border-radius: 10px;
  }
  .el-breadcrumb {
    line-height: 3;
  }

</style>
