<template>
  <div>
<!--控制组件-->
    <div class="t_middle">
      <div class="block">
      <!-- 想要阻止默认的双击事件（就是会选中三个控制组件） -->
        <span class="demonstration" style="user-select:none;" >
          <i class="iconfont pre" @click="pre">&#xe698;</i>
          <i class="iconfont bofang" @click="bofang" v-show="state.showbfzt">&#xe662;</i>
          <i class="iconfont bofang" @click="bofang" v-show="!state.showbfzt">&#xe60a;</i>
          <i class="iconfont next" @click="next">&#xe6a1;</i>
        </span>
        <!--<span class="demonstration">默认</span>-->
        <span class="demonstration xiayi left">{{Math.floor(this.slider.value/60)+":"+Math.round(this.slider.value/10)}}</span>
        <el-slider v-model="slider.value"
                   :max="slider.max"
                   :format-tooltip="formatTooltip"
                   @change="changeslider"
        ></el-slider>
        <span class="demonstration xiayi">{{Math.floor(this.slider.max/60)+":"+Math.round(this.slider.max/10)}}</span>
        <span class="demonstration xiayiv">
          <i class="iconfont volume" @click="volumeShow">&#xe62c;</i>

          <!--v-show="volume.show"-->

        </span>
       <div class="volume_change">
         <el-slider v-model="volume.value"

                    @change="changeVolume"
         ></el-slider>
       </div>
        <!--:max="volume.max"-->
      </div>
    </div>
<!--end-->
    <!--playlist-->
    <div class="list">
      <ul >
        <li  v-for="(item,index) in music"  @dblclick="player(item.url, index)" :key="index">
          <a href="#" >{{index+1}}--{{item.name}}</a>

        </li>
      </ul>
    </div>
    <div class="content">
          <div class="geci">
            <div class="geci1">{{this.geci.haha1}}</div>
            <div class="geci1">{{this.geci.haha2}}</div>
            <div class="geci2">{{this.geci.haha3}}</div>
            <div class="geci2">{{this.geci.haha4}}</div>
            <div class="cur">{{this.geci.haha5}}</div>
            <div class="geci2">{{this.geci.haha6}}</div>
            <div class="geci2">{{this.geci.haha7}}</div>
            <div class="geci1">{{this.geci.haha8}}</div>
            <div class="geci1">{{this.geci.haha9}}</div>
          </div>
    </div>
    <audio  :src="vsrc"
            ref="vaudio"
            v-on:timeupdate="timeupdate($event)"
            v-on:ended="ended"
    ></audio>


  </div>

</template>

<script>
import './about.css';
//ajax
import axios from 'axios';
const list = '/list';
	export default {
    mounted(){
      //上树后请求歌曲列表
      let self = this;
      axios.get('/list/music/')
      .then(function(response){
        //代理字符串
        self.music = response.data;
        self.vsrc = list+self.music[0].url;
        // console.log(response.data);
        // console.log(self.vsrc);        
      })
      .catch(function(error){
        console.log(error);
      })
    },
    data() {
      return {
        geci:{
          // geci:"[00:03.56]摇晃的红酒杯 嘴唇像染着鲜血 [00:07.48]那不寻常的美 难赦免的罪 [00:11.46]谁忠心的跟随 充其量当个侍卫 [00:15.24]脚下踩着玫瑰 回敬一个吻当安慰 可怜 [00:26.09]像蠢动的音乐 教人们怎么成眠 [00:30.36]不知名的香水 窒息的鬼魅 [00:34.10]锋利的高跟鞋 让多少心肠破碎 [00:37.93]弯刀一般的眉 捍卫你的秘密花园 [00:42.76]夜太美 尽管再危险 [00:46.77]总有人黑着眼眶熬着夜 [00:50.70]爱太美 尽管再危险 [00:54.21]愿赔上了一切超支千年的泪[00:58.26]痛太美 尽管再卑微 [01:01.83]也想尝粉身碎骨的滋味 [01:05.82]你太美 尽管再无言 [01:09.65]我都想用石堆隔绝世界 [01:12.34]我的王妃 我要霸占你的美 [01:22.45]那催情的音乐 听起来多么愚昧 [01:27.02]你武装的防备 伤你的是谁 [01:30.85]靠近我一点点 是不一样的世界 [01:34.69]安睡在我的肩 我用生命为你加冕 [01:39.64]夜太美 尽管再危险 [01:43.49]总有人黑着眼眶熬着夜 [01:47.41]爱太美 尽管再危险 [01:51.10]愿赔上了一切超支千年的泪 [01:54.90]痛太美 尽管再卑微 [01:58.53]也想尝粉身碎骨的滋味 [02:02.49]你太美 尽管再无言 [02:06.09]我都想用石堆隔绝世界 [02:09.05]我的王妃 我要霸占你的美 [02:26.75]夜太美 尽管再危险 [02:30.75]总有人黑着眼眶熬着夜[02:34.80]爱太美 尽管再危险 [02:38.35]愿赔上了一切超支千年的泪 [02:42.25]痛太美 尽管再卑微 [02:45.81]也想尝粉身碎骨的滋味 [02:50.01]你太美 尽管再无言 [02:53.54]我都想用石堆隔绝世界 [02:56.35]我的王妃 我要霸占你的美\"",
          geci:"暂无歌词",
          "shijianshuzu" : [],
          "gecishuzu" : [],
          "haha1":'',
          "haha2":'',
          "haha3":'',
          "haha4":'',
          "haha5":'',
          "haha6":'',
          "haha7":'',
          "haha8":'',
          "haha9":'',
        },

        music: [],
        vsrc: "",
        state : {
          showbfzt : "true",
          who : 0,
        },
        slider :{
          value : 0,
          max : 1,
        },
        volume : {
          value : 100,
          // max : 1,
          show : false
        },
      }
    },

    methods: {
  
      player(src, index){
        src = list +src;
        console.log(src,index);
        let self = this;
        if(src == this.vsrc){
          this.bofang();
        }else {
          this.$refs.vaudio.autoplay = "ture";
          this.vsrc = src;
          //保存是列表中的那一首歌
          this.state.who = index;
          //这里没有调用歌词方法
        // console.log(list+self.music[self.state.who].lrc);
        axios.get(list+self.music[self.state.who].lrc)
          .then(function(response){
            self.geci.geci = response.data;
             //解析歌词
            self.parse(self.geci.geci);
             console.log(response.data);
          })
          .catch(function(error){
            //没有lrc的时候要清空歌词
            self.geci.geci =[];
            //解析歌词
            self.parse(self.geci.geci);
            console.log(error);
          });
        }
       
      },
      bofang(){
        // console.log(this.state.showbfzt);
        // console.log(this.vsrc);
        // console.log(this.state.who);
         this.state.showbfzt = !this.state.showbfzt;
         console.log(this.state.showbfzt);
        if(!this.state.showbfzt){
          this.$refs.vaudio.play().catch(function (e) {
            console.log("a.play catch>", e);
          });
        }else{
          this.$refs.vaudio.pause();
        }
        let self = this;
        // console.log(list+self.music[self.state.who].lrc);
        axios.get(list+self.music[self.state.who].lrc)
          .then(function(response){
            self.geci.geci = response.data;
             //解析歌词
            self.parse(self.geci.geci);
            //  console.log(response.data);
          })
          .catch(function(error){
            //没有lrc的时候要清空歌词
            self.geci.geci =[];
            //解析歌词
            self.parse(self.geci.geci);
            console.log(error);
          });
        // //解析歌词
        // this.parse(this.geci.geci);
      
      },
      pre(){
       //判断是不是第一首歌
        if(this.state.who == 0){
          let length = this.music.length;
          let src = this.music[length-1].url;
          this.state.who = length-1;
          this.player(src, this.state.who);
        }else{
          this.state.who = this.state.who-1;

          let src = this.music[this.state.who].url;
          this.player(src, this.state.who);
        }
      },
      next(){
        let length = this.music.length;
        //判断是不是最后一首歌
        if(this.state.who == length-1){
          let src = this.music[0].url;
          this.state.who = 0;
          this.player(src, 0);
        }else{
          let nextIndex = this.state.who+1;
          this.state.who = this.state.who+1;
          let src = this.music[nextIndex].url;
          this.player(src, nextIndex);
        }
      },
      //进度条显示格式化
      formatTooltip(val) {
        return Math.floor(val / 60)+":"+Math.round(val/10)  ;
      },
      //歌曲播放时间事件
      timeupdate(event){
        let duration = this.$refs.vaudio.duration;
        let current = this.$refs.vaudio.currentTime;
        let curM = Math.floor(current/60);
        let curS = Math.round((current - curM*60)/10);
        this.slider = {
          value : current,
          max : duration
        }
        let self = this;

        var arr = this.geci.shijianshuzu.filter(function(item, index) {
          if (item == parseInt(current-20) ) {
            // console.log( self.geci.gecishuzu[index]) ;
            // if(index>1){
              let str = [];
              for(let i = -4; i < 5; i++){
                str.push(self.geci.gecishuzu[index+i]);
              }
              self.changeShowGe(str);
              
              // self.geci.haha1 = self.geci.gecishuzu[index-4];
              // self.geci.haha2 = self.geci.gecishuzu[index-3];
              // self.geci.haha3 = self.geci.gecishuzu[index-2];
              // self.geci.haha4 = self.geci.gecishuzu[index-1];
              // self.geci.haha5 = self.geci.gecishuzu[index];
              // self.geci.haha6 = self.geci.gecishuzu[index+1];
              // self.geci.haha7 = self.geci.gecishuzu[index+2];
              // self.geci.haha8 = self.geci.gecishuzu[index+3];
              // self.geci.haha9 = self.geci.gecishuzu[index+4];

          }
        });


      },
      //一首歌曲播放完,方法没用哦
      ended(){
        console.log(1);
      },
      //点击的时候第一首歌没有传歌曲长度所以 不能设置currentTime
      changeslider(val){
        if(!this.showbfzt){
          this.$refs.vaudio.currentTime = val;
          this.$refs.vaudio.play();
          //为0的时候改变图标
          if(val == 0){
            this.state.showbfzt = !this.state.showbfzt;
          }
        }
        // this.bofang();
      },
      //
      volumeShow(){
        this.volume.show = !this.volume.show;
      },
      //
      changeVolume(val){
        this.$refs.vaudio.volume = val/100;
        console.log(this.$refs.vaudio.volume);
      },
      //歌词抽取解析
      parse(lrc){
        //如果lrc的内容是" [ xx:xx.xx ] 歌词1 [yy:yy.yy]歌词二"
        //那str这个数组长度是3
        //str[0]=""
        //str[1]="xx:xx.xx]歌词一"
        //str[2]="yy:yy.yy]歌词二"
        //判断一下歌词是否为空
        if (lrc.length == 0) {
          this.geci.shijianshuzu = [];
          this.geci.gecishuzu = [];
          let str = ['没有歌词！'];
          this.changeShowGe(str);
          return;
        }
          var str = lrc.split("[");
          for(let i = 1 ; i < str.length ; i++){
              var shijian = str[i].split(']')[0];
              var geci = str[i].split(']')[1];
              //时间切割
              var fen = shijian.split(':')[0];
              var miao = shijian.split(':')[1];
              var sec = parseInt(fen)*60 + parseInt(miao);
              // console.log(sec);
              this.geci.shijianshuzu.push(sec);
              this.geci.gecishuzu.push(geci);
            //   console.log(this.geci.gecishuzu);
            // console.log(this.geci.shijianshuzu);

          }
      },
      changeShowGe(str){
        
        this.geci.haha1 = str[0];
        this.geci.haha2 = str[1];
        this.geci.haha3 = str[2];
        this.geci.haha4 = str[3];
        this.geci.haha5 = str[4];
        this.geci.haha6 = str[5];
        this.geci.haha7 = str[6];
        this.geci.haha8 = str[7];
        this.geci.haha9 = str[8];
      },

    } //end methods
  }
</script>

<style scoped>

  /*字体图标阿里矢量图*/
  @font-face {
    font-family: 'iconfont';
    src: url('../assets/fonts/iconfont.eot');
    src: url('../assets/fonts/iconfont.eot?#iefix') format('embedded-opentype'),
    url('../assets/fonts/iconfont.woff') format('woff'),
    url('../assets/fonts/iconfont.ttf') format('truetype'),
    url('../assets/fonts/iconfont.svg#iconfont') format('svg');
  }
  .iconfont{
    font-family:"iconfont" !important;
    font-size:20px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

 .t_middle {
   cursor: pointer;
   overflow:hidden;
 }
 .pre, .bofang, .next {
   font-size:40px;
  }
 .volume {
   font-size:20px;
 }
  .pre:hover {
    color: #3EC3D5;
  }
 .bofang:hover {
    color: #3EC3D5;
  }
  .next:hover {
    color: #3EC3D5;
  }
  .volume:hover {
    color: #3EC3D5;
  }
  /* block */
  .block {
    padding: 0 0 22px 0;
    overflow: hidden;
    border-bottom: 1px solid #eff2f6;
  }

  .demonstration {
    float: left;
  }
  .xiayi  {
    margin-top : 12px;
  }
  .xiayiv {
    margin : 8px 0 0 9px;
  }
  .left {
    margin-left : 20px;
  }
 .el-slider {
   float: left;
   width: 40%;
   margin: 0 15px 0 15px;
 }

  /*list */
  .list {
    float:left;
    background:#3EC3D5;
    color:#fff;
    width:40%;
    height:400px;
    /*margin:0px auto;*/
  }
  .content{
    float:left;
    /*background: -webkit-radial-gradient(#3EC3D5, #000000) no-repeat;*/
    background: rgba(43,50,60,0.8);

    /*opacity:0.5;*/
    width:60%;
    height:400px;
    
  }
  ul {
    margin-left:2.15em;
  }
  li {
    height:2.5em;
    padding-left:0.75em;
    border-bottom: 1px solid rgba(255,255,255,0.25);
    white-space: nowrap;
  }
  li:hover {
    background:rgba(255,255,255,0.25);
  }
  a{
    display:block;
    width:100%;
    height:100%;
    color:#fff;
    text-decoration:none;
    line-height:2.5em;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .volume-slider{
      width:10%;
  }
  /*歌词*/
  .geci {
   text-align: center;
  margin-top: 60px;
  }
  .geci div{
   text-align: center;
   margin:auto 0;
   margin-bottom: 18px;
  }
  .geci .cur{
    color: #1cdbdc;
    font-weight: bold;
    font-size: 20px;
  }
  .geci .geci2{
    color: #ffe87d;
    font-size: 16px;

    
  }
  .geci .geci1{
    color: #ffe551;
    font-size: 16px;
    margin-top: 10px;
  }

</style>
