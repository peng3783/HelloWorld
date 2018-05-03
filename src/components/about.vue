<template>
  <div>
    <div class="music-control">
      <div class="content">
        <div class="content-left">
          <i class="iconfont pre" @click="pre">&#xe698;</i>
          <div class="bofang-wrapper">
            <div class="iconbofang">
              <i class="iconfont bofang" @click="bofang" v-show="state.showbfzt" >&#xe662;</i>
              <i class="iconfont bofang" @click="bofang" v-show="!state.showbfzt">&#xe60a;</i> 
            </div>    
          </div>
          <i class="iconfont next" @click="next">&#xe6a1;</i>
        </div>
        <div class="content-middle">
          <div class="progress">
            <span class="start">{{progress.start}}</span>
            <div class="progress-bar" ref="progressBar" @click="_progressMusic($event)">
              <div class="now" ref="progress"></div>
            </div>
            <span class="end">{{progress.end}}</span>
          </div>
        </div>
        <div class="content-right">
          <div class="progress">
            <i class="iconfont">&#xe62c;</i>
            <div class="progress-bar" ref="voiceBar" @click="_voice($event)">
              <div class="now" ref="voice" ></div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="list">
      <ul class="list-left">
        <li class="item" v-for="(item, index) in music" @click="player(item.url, index)" :key="index">
          <a href="#" >{{index+1}}--{{item.name}}</a>
        </li>
      </ul>
      <div class="list-right">
        <div class="geci">
          <div class="geci10">{{this.geci.haha1}}</div>
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
    </div>
    <audio  :src="vsrc"
            ref="vaudio"
            v-on:timeupdate="timeupdate($event)"
    ></audio>
  </div>
</template>

<script>
import axios from 'axios'
const list = '/list'
export default {
  mounted() {
    //上树后请求歌曲列表
    let self = this
    axios
      .get(list + '/music/')
      .then(function(response) {
        //代理字符串
        self.music = response.data
        self.vsrc = list + self.music[0].url
      })
      .catch(function(error) {
        console.log('歌曲初始化失败：')
        console.log(error)
      })
  },
  data() {
    return {
      geci: {
        geci: '暂无歌词',
        shijianshuzu: [],
        gecishuzu: [],
        haha1: '',
        haha2: '',
        haha3: '',
        haha4: '',
        haha5: '',
        haha6: '',
        haha7: '',
        haha8: '',
        haha9: ''
      },
      music: [],
      vsrc: '',
      state: {
        showbfzt: true,
        who: 0
      },
      progress: {
        start: '0:00',
        end: '00:00'
      }
    }
  },
  methods: {
    player(src, index) {
      this._geciClear()
      src = list + src
      // console.log(src, index)
      let self = this
      if (src == this.vsrc) {
        this.bofang()
      } else {
        this.$refs.vaudio.autoplay = 'ture'
        this.vsrc = src
        //保存是列表中的那一首歌
        this.state.who = index
        //这里没有调用歌词方法
        // console.log(list+self.music[self.state.who].lrc);
        axios
          .get(list + self.music[self.state.who].lrc)
          .then(function(response) {
            self.geci.geci = response.data
            //解析歌词
            self.parse(self.geci.geci)
            // console.log(response.data)
          })
          .catch(function(error) {
            //没有lrc的时候要清空歌词
            self.geci.geci = []
            //解析歌词
            self.parse(self.geci.geci)
            console.log(error)
          })
      }
    },
    bofang() {
      this._geciClear()
      // console.log(this.state.showbfzt);
      // console.log(this.vsrc);
      // console.log(this.state.who);
      this.state.showbfzt = !this.state.showbfzt
      console.log(this.state.showbfzt)
      if (!this.state.showbfzt) {
        this.$refs.vaudio.play().catch(function(e) {
          console.log('a.play catch>', e)
        })
      } else {
        this.$refs.vaudio.pause()
      }
      let self = this
      // console.log(list+self.music[self.state.who].lrc);
      axios
        .get(list + self.music[self.state.who].lrc)
        .then(function(response) {
          self.geci.geci = response.data
          //解析歌词
          self.parse(self.geci.geci)
          //  console.log(response.data);
        })
        .catch(function(error) {
          //没有lrc的时候要清空歌词
          self.geci.geci = []
          //解析歌词
          self.parse(self.geci.geci)
          console.log(error)
        })
      // //解析歌词
      // this.parse(this.geci.geci);
    },
    pre() {
      //判断是不是第一首歌
      if (this.state.who == 0) {
        let length = this.music.length
        let src = this.music[length - 1].url
        this.state.who = length - 1
        this.player(src, this.state.who)
      } else {
        this.state.who = this.state.who - 1

        let src = this.music[this.state.who].url
        this.player(src, this.state.who)
      }
    },
    next() {
      let length = this.music.length
      //判断是不是最后一首歌
      if (this.state.who == length - 1) {
        let src = this.music[0].url
        this.state.who = 0
        this.player(src, 0)
      } else {
        let nextIndex = this.state.who + 1
        this.state.who = this.state.who + 1
        let src = this.music[nextIndex].url
        this.player(src, nextIndex)
      }
    },
    _progressMusic(event) {
      //乱怼怼出来。。
      let width = this.$refs.progressBar.offsetWidth
      let p = event.offsetX / width
      this.$refs.progress.style.width = p.toFixed(3) * 100 + '%'
      this.$refs.vaudio.currentTime = p * this.$refs.vaudio.duration
      this.$refs.vaudio.play()
    },
    //进度条显示格式化
    formatTooltip(val) {
      return Math.floor(val / 60) + ':' + Math.round(val / 10)
    },
    //歌曲播放时间事件
    timeupdate(event) {
      let duration = this.$refs.vaudio.duration
      let current = this.$refs.vaudio.currentTime
      let curM = Math.floor(current / 60)
      let curS = Math.round((current - curM * 60) / 10)
      let start = this.formatTooltip(current)
      let end = this.formatTooltip(duration)
      this.progress = {
        start: start,
        end: end
      }
      this.$refs.progress.style.width =
        current / duration.toFixed(3) * 100 + '%'
      let self = this
      var arr = this.geci.shijianshuzu.filter(function(item, index) {
        if (item == parseInt(current - 20)) {
          // console.log( self.geci.gecishuzu[index]) ;
          // if(index>1){
          let str = []
          for (let i = -4; i < 5; i++) {
            str.push(self.geci.gecishuzu[index + i])
          }
          self.changeShowGe(str)
        }
      })
      //播放完毕，可以用来写不同播放模式
      if (this.$refs.vaudio.ended) {
        this.state.showbfzt = !this.state.showbfzt
        let str = ['歌曲播放完毕！']
        this.changeShowGe(str)
      }
    },
    _voice(event) {
      let width = this.$refs.voiceBar.offsetWidth
      let p = event.offsetX / width
      this.$refs.voice.style.width = p.toFixed(3) * 100 + '%'
      this.$refs.vaudio.volume = p.toFixed(3)
    },
    //歌词抽取解析
    parse(lrc) {
      //如果lrc的内容是" [ xx:xx.xx ] 歌词1 [yy:yy.yy]歌词二"
      //那str这个数组长度是3
      //str[0]=""
      //str[1]="xx:xx.xx]歌词一"
      //str[2]="yy:yy.yy]歌词二"
      //判断一下歌词是否为空
      if (lrc.length == 0) {
        this.geci.shijianshuzu = []
        this.geci.gecishuzu = []
        let str = ['没有歌词！']
        this.changeShowGe(str)
        return
      }
      var str = lrc.split('[')
      for (let i = 1; i < str.length; i++) {
        var shijian = str[i].split(']')[0]
        var geci = str[i].split(']')[1]
        //时间切割
        var fen = shijian.split(':')[0]
        var miao = shijian.split(':')[1]
        var sec = parseInt(fen) * 60 + parseInt(miao)
        // console.log(sec);
        this.geci.shijianshuzu.push(sec)
        this.geci.gecishuzu.push(geci)
        //   console.log(this.geci.gecishuzu);
        // console.log(this.geci.shijianshuzu);
      }
    },
    changeShowGe(str) {
      this.geci.haha1 = str[0]
      this.geci.haha2 = str[1]
      this.geci.haha3 = str[2]
      this.geci.haha4 = str[3]
      this.geci.haha5 = str[4]
      this.geci.haha6 = str[5]
      this.geci.haha7 = str[6]
      this.geci.haha8 = str[7]
      this.geci.haha9 = str[8]
    },
    _geciClear() {
      this.geci.shijianshuzu = []
      this.geci.gecishuzu = []
      let str = []
      this.changeShowGe(str)
    }
  }
}
</script>

<style lang="stylus" scoped>
/* 字体图标阿里矢量图 */
@font-face
  font-family 'iconfont'
  src url('../assets/fonts/iconfont.eot')
  src url('../assets/fonts/iconfont.eot?#iefix') format('embedded-opentype'), url('../assets/fonts/iconfont.woff') format('woff'), url('../assets/fonts/iconfont.ttf') format('truetype'), url('../assets/fonts/iconfont.svg#iconfont') format('svg')
.iconfont
  font-family 'iconfont' !important
  font-size 20px
  font-style normal
  -webkit-font-smoothing antialiased
  -webkit-text-stroke-width 0.2px
  -moz-osx-font-smoothing grayscale
.music-control
  position fixed
  left 0
  bottom 0
  z-index 50
  width 100%
  height 48px
  background-color green
  .content
    display flex
    background-color rgb(20, 29, 39)
    color rgba(255, 255, 255, 0.4)
    .content-left
      flex 0 0 110px
      width 110px
      font-size 0
      user-select none
      .bofang-wrapper
        display inline-block
        position relative
        vertical-align top
        top -10px
        padding 6px
        width 56px
        height 56px
        box-sizing border-box
        vertical-align top
        border-radius 50%
        background-color rgb(20, 29, 39)
        .iconbofang
          width 100%
          height 100%
          border-radius 50%
          text-align center
          .bofang
            line-height 44px
            font-size 44px
            color #80858a
            &:hover
              color #3EC3D5
      .pre
        display inline-block
        line-height 44px
        font-size 27px
        &:hover
          color #3EC3D5
      .next
        display inline-block
        line-height 44px
        font-size 27px
        &:hover
          color #3EC3D5
    .content-middle
      flex 2
      font-size 0
      .progress
        display flex
        justify-content space-between
        align-items center
        width 100%
        min-width 170px
        margin 17px auto
        .progress-bar
          position relative
          margin 0 2px
          width 95%
          height 5px
          background-color rgba(111, 115, 122, 0.6)
          vertical-align 2px
          border-radius 3px
          cursor pointer
          .now
            position absolute
            left 0
            display inline-block
            height 5px
            background-color rgb(255, 0, 0)
            &::after
              content ''
              position absolute
              left 100%
              margin-top -3px
              width 6px
              height 6px
              border 3px solid #fff
              border-radius 50%
              background-color rgb(255, 0, 0)
      .start, .end
        margin-left 10px
        font-size 12px
        color #fff
    .content-right
      flex 1
      max-width 127px
      font-size 0
      .progress
        display flex
        justify-content space-between
        align-items center
        width 100%
        max-width 127px
        margin 14px auto
        .progress-bar
          position relative
          margin -1px 25% 0 -1px
          width 80%
          max-width 77px
          height 5px
          background-color rgba(111, 115, 122, 0.6)
          vertical-align 2px
          border-radius 3px
          cursor pointer
          .now
            position absolute
            left 0
            display inline-block
            height 5px
            width 100%
            max-width 77px
            background-color rgb(255, 0, 0)
            &::after
              content ''
              position absolute
              left 100%
              margin-top -3px
              width 6px
              height 6px
              border 3px solid #fff
              border-radius 50%
              background-color rgb(255, 0, 0)
.list
  display flex
  position absolute
  width 100%
  top 40px
  bottom 30px
  overflow hidden
  background-color rgba(7, 17, 27, 0.3)
  .list-left
    flex 0 0 38%
    width 38%
    min-width 118px
    line-height 20px
    font-size 16px
    .item
      padding 4px
      border-bottom 1px solid rgba(255, 255, 255, 0.25)
  .list-right
    flex 1
    min-width 198px
    .geci
      text-align center
      .geci1, .geci10
        padding 3% 0
        font-size 16px
        color #ffe87d
      .geci10
        padding-top 10%
      .geci2
        padding 3% 0
        font-size 18px
        color #ffe551
      .cur
        padding 3% 0
        line-height 24px
        font-weight 700
        font-size 20px
        color #1cdbdc
</style>
