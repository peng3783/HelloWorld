<!--阻止form表单submit onsubmit="return false"-->

<template>
	<div>
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/albums' }">相册</el-breadcrumb-item>
		</el-breadcrumb>
		<el-button type="primary" @click="open"><i class="el-icon-plus"></i>&nbsp;&nbsp;新建相册</el-button>

    <!-- dialog -->
    <el-button type="primary" @click="dialogFormVisible = true"><i class="el-icon-upload el-icon--right"></i>&nbsp;&nbsp;上传</el-button>
    <!--  -->
    <el-dialog title="上传文件" :visible.sync="dialogFormVisible">
      <div :visible.sync="dialogFormVisible">
        <form action="#" 
        enctype="multipart/form-data" 
        method="post" >
          <label >选择文件夹</label>
          <select class="form-control" name="wenjianjia" ref="wenjianjia">
<!-- /list/upImage v-on:submit.prevent="con"-->
            <option v-for="(item, index) of $store.state.albums" :key="index">{{item}}</option>

          </select>
<!-- name后台使用到了，不能改变  accept="image/png,image/gif"-->
          <input type="file" name="tupian" multiple="multiple" 
			@change="uploadChange" 
          ><br>
					<img :src="yulanimg" alt="" class="yulanimg">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        <!--   <input type="submit"  value="Upload" @click="dialogFormVisible = false" > -->
         <el-button type="primary" @click="submitForm()" value="Upload">上传</el-button>
        </form>
      </div>
    </el-dialog>


    <ul class="albumsul">
			<li class="box" v-for="item in albums" :key="item.id"><a v-on:click="tiaozhuang(item)"><img src="../assets/wjj.png" height="115px" width="82px" alt=""><h4>{{item}}</h4></a></li>
    </ul>
  </div>
</template>

<script>
//ajax
import axios from 'axios'
//store 中的action 不会用 直接使用的this.$store.dispatch("valbums");
import { mapActions } from 'vuex'
//store 中的state 不会用 直接使用的this.$store.state.albums 这里为什么要加this呢？ 只有调用的时候好像可以不加，改this.$store.dispatch和this.$router.push都不能去掉this，那么可不可以理解为实例的方法是要指定实例的，而调用的时候是全局默认的store中的值所以可以不用加？
import { mapState } from 'vuex'

export default {
  created() {
    this.$store.dispatch('valbums')
  },
  computed: mapState(['albums']),

  data() {
    return {
      //  这两句保证了dialog
      dialogFormVisible: false,
      formLabelWidth: '300px',

      fileList: [],
      yulanimg: ''
    }
  },
  methods: {
    //绑定到每个li的a标签上（事件委托给ul不会。。）,点击后读取对应相册文件夹中的图片名字和跳转路由
    tiaozhuang(item) {
      this.$store.dispatch('vtiaozhuan', item)
      // 编程式导航
      this.$router.push({ path: `/albums/${item}` })
    },

    //创建新的文件，文件名相同没有判断
    open() {
      let self = this
      this.$prompt('请输入文件名', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(({ value }) => {
          //前端判断文件名是否重复
          var arr = self.$store.state.albums.filter(function(item) {
            if (item == value) {
              return item
            }
          })
          if (arr.length != 0) {
            this.$message({
              type: 'info',
              message: '文件名重复'
            })
            return
          }

          // this.$message({
          //   type: 'success',
          //   message: '文件名是: ' + value
          // });
          //视图层更新添加的文件夹名 前台 value 是文件夹的名字！
          self.$store.dispatch('newalbumswjj', value)

          // 发送ajax后台数据改变
          axios
            .post('/list/up', {
              filename: value
            })
            .then(function(response) {
              // let username = n.username;

              // commit("VREGIST",{});

              console.log(response)
            })
            .catch(function(error) {
              console.log(error)
            })
          //end axios
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
    },
    //上传的事件
    uploadChange(event) {
      // console.log(event.target.files[0]);
      if (event.target.files.length > 0) {
        this.files = event.target.files[0] //提交的图片
        let url = window.URL.createObjectURL(this.files)
        // let img = document.createElement("img");
        // img.src = url;
        // document.getElementById
        this.yulanimg = url
      }
    },
    submitForm() {
      let sel = this.$refs.wenjianjia
      let index = sel.selectedIndex
      let name = this.$store.state.albums[index]
      // console.log(name);
      //提交图片
      let formData = new FormData()
      //上传files的内容，如何上传fields的内容呢？
      formData.append('tupian', this.files)
      formData.append('wenjianjia', name)

      axios.post('/list/upImage', formData)

      this.dialogFormVisible = false
    }

    //end
  }
}
</script>
<style lang="stylus" scoped>
.albumsul
  display flex
	width 100%
	min-width 365px
	height 115px
	
.box
  flex 1 0 105px
	widht 85px
	padding 30px 20px 30px 20px
	margin 0 0 20px 0 !important
	background #fff
	box-shadow inset 0px 0px 0px 1px rgba(0, 0, 0, 0.15), 0px 2px 3px 0px rgba(0, 0, 0, 0.1)
	text-align center
	border-radius 10px
.el-breadcrumb
	line-height 3
.yulanimg
	max-width 200px
	max-height 200px
	display block
</style>
