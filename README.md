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