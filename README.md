# helloworld

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


//UI使用element-ui
npm i element-ui -S
//ajax
cnpm install axios
//歌曲切换太快,一定程度会报错！增加catch捕获而不让程序崩溃
//歌词匹配的时间区不是很好，可以修改！！
只要判断时间是否相等就好！

//屏蔽、禁止双击选中文字
1.js方法
<div onselectstart="return false">屏蔽双击选中文字的区域</div>
2.css方法
<div style="-moz-user-select:none;">屏蔽双击选中文字的区域</div>

//图像表格使用echarts
cnpm install echarts --save

//git提交
//安装开发依赖可以使用import来实现懒加载
cnpm install --save-dev babel-plugin-syntax-dynamic-import
//然后还要在.babelrc中添加，才能识别import
{
  "plugins": ["syntax-dynamic-import"]
}

//组件化的过程，css样式怎么随之组件化？classMap组件化过程图片地址不知道怎么搞
//verticalLine组件化的时候，字体大小线的颜色都不知道怎么选中改变