<template>
	<div>
        <el-container style="height: 500px; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu :default-openeds="['1', '4']">
                    <el-submenu index="1">
                        <template slot="title">基本信息</template>
                         <el-menu-item index="1-1"> <a href="#jibenxinxi">个人信息</a></el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">工作经历</template>
                        <el-menu-item-group>
                        <template slot="title">分组一</template>
                       
                        <el-menu-item index="2-2">选项2</el-menu-item>
                        </el-menu-item-group>
                        <el-menu-item-group title="分组2">
                        <el-menu-item index="2-3">选项3</el-menu-item>
                        </el-menu-item-group>
                        <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项4-1</el-menu-item>
                        </el-submenu>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">教育经历</template>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">项目经验</template>
                        
                    </el-submenu>
                </el-menu>
            </el-aside>
  
            <el-container>
                <el-main>
                    <div id="jibenxinxi">
                        <span class="mr_name">周鹏</span>
                        <span class="mr_intro" title="不断学习，积极进取">不断学习，积极进取</span>
                        <div class="mr_p_info">
                            <div class="info_t">
                                <span class="shenfen">
                                    <em data-id="0" title="web前端开发-vue2.0"><i class="el-icon-goods"></i>web前端开发-vue2.0</em>
                                </span>                                                           
                            </div>
                            <div class="info_t">
                                <span class="base_info">
                                    <em class="s"></em>
                                        <em class="a" style="display:none;">
                                            <span class="age"></span>
                                            <span class="birth_span dn"></span>
                                        </em>
                                    <em class="x">本科</em>
                                    <em class="j">
                                        <span class="info_t">3年工作经验</span>
                                    </em>
                                    <em class="mr0 d">武汉</em>
                                </span>
                            </div>
                            <div class="info_t" data-phone="13297999060">
                                <span class="mobile"><i class="el-icon-phone"></i><em title="13297999060">13297999060</em></span>
                                <span class="email "><i class="el-icon-message"></i><em title="378350138@qq.com">378350138@qq.com</em></span>
                            </div>
                            <div class="mr_title">
                                <span class="mr_title_l"></span>
                                <span class="mr_title_c"> 项目经验  </span>
                                <span class="mr_title_l"></span>
                                <div class="mr_content_m">
                                <p>通过nodejs+express+express-session搭建项目使用后台，使用mongodb作为数据库。后台操作数据库取得数据，作为前端页面API。前端页面通过AXIOS来与后台交互，通过后台接口读取或者存储数据。</p>
                                <p>后台：对应数据库操作，使用时mongodb原生的函数。对函数DAO封装后，后台通过models直接引用，对于密码保存采用md5加密。</p>
                                <p>对于文件操作，采用nodejs原生的fs模块，通过express来确定路由和请求方式（get/post）。不同路由对应不同的操作，用于返回对应的数据给前台，后台通过express-session实现记录用户的登录状态。</p>
                                <p>前台：通过vue-cli快速构建开发环境，添加vue-router来实现SPA的页面跳转。vuex来管理全局的数据和方法，达到清晰的数据流动，和可以预测的状态。element-ui来实现页面布局，达到自适应效果。前端实现登录页面，注册页面，主页，音乐页，相册页。</p>
                                <p>音乐页实现播放控件自定义，上一曲、播放/暂停、下一曲（这四个使用阿里的矢量图）、进度条（歌曲播放时间显示，拖动点击进度条播放对应时间歌曲）、歌词随时间显示。</p>
                                <p>相册页实现新建相册，上传相片（没有使用默认的表单submit，改写为axios提交）。</p>
                                 
                                </div>
                            </div>
                        </div>
                    </div>
                   
                </el-main>
            </el-container>
        </el-container>



      <div id="myChart" :style="{width:'300px', height:'300px'}"></div>
      <div id="pie" :style="{width:'320px', height:'300px'}"></div>

	</div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
require("echarts/lib/chart/pie");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
export default {
  data() {
    return {};
  },
  mounted() {
    this.drawLine();
    this.drawPie();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: { text: "ECharts 入门示例" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
      // 处理点击事件并且跳转到相应的百度搜索页面
      myChart.on("click", function(params) {
        window.open(
          "https://www.baidu.com/s?wd=" + encodeURIComponent(params.name)
        );
      });
    },
    drawPie() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("pie"));
      // 绘制图表
      myChart.setOption({
        //背景颜色
        backgroundColor: "#2c343c",
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            // 用来使普通饼状图变成南丁格尔图
            roseType: "angle",
            // 阴影的配置
            // itemStyle: {
            //   // 阴影的大小
            //   shadowBlur: 200,
            //   // 阴影水平方向上的偏移
            //   shadowOffsetX: 0,
            //   // 阴影垂直方向上的偏移
            //   shadowOffsetY: 0,
            //   // 阴影颜色
            //  shadowColor: 'rgba(0, 0, 0, 0.5)'
            // },
            itemStyle: {
              emphasis: {
                shadowBlur: 200,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            },

            data: [
              { value: 235, name: "视频广告" },
              { value: 274, name: "联盟广告" },
              { value: 310, name: "邮件营销" },
              { value: 335, name: "直接访问" },
              { value: 400, name: "搜索引擎" }
            ]
          }
        ],
        label: {
          normal: {
            textStyle: {
              color: "rgba(255, 255, 255, 0.3)"
            }
          }
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)"
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
p[class~="warning"] {
  font-weight: bold;
}
.mr_name {
  display: block;
  height: 40px;
  width: 100%;
  margin: 0 auto;
  line-height: 40px;
  font-size: 30px;
  color: #333;
  text-align: center;
}
.mr_intro {
  display: block;
  color: #333;
  text-align: center;
  margin: 0 auto;
  font-size: 16px;
  width: 100%;
  line-height: 34px;
}
.mr_p_info {
  display: block;
  color: #666;
  padding: 5px 0 7px;
  text-align: center;
  margin: 0 auto;
  width: 100%;
}
.info_t {
  margin-bottom: 8px;
}
.mr_title {
  width: 100%;
  display: inline-block;
}
.mr_title_l {
  display: inline-block;
  width: 30%;
  height: 0;
  border-top: 1px solid rgb(126, 121, 121);
  margin-top: 29px;
}

.mr_title_c {
  font-size: 18px;
  padding: 6px 24px;
  text-align: center;
  background-color: rgba(26, 23, 23, 0.24);
  -moz-border-radius: 26px;
  -webkit-border-radius: 26px;
  border-radius: 26px;
  margin: 0 13px;
}
.mr_title p {
  margin-top: 11px;  
  text-align: initial;
  line-height: 1.3rem;
 
}
</style>
