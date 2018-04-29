import Vue from 'vue';
//UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//ajax
import axios from 'axios';
// 改写Vue原型属性，以后组件使用this.$http
Vue.prototype.$http = axios;

import App from './App.vue';
//router
import router from './router';
//vuex store
// import store from './store.js' //引入store对象
import store from './store';
//
import '@/common/stylus/index.styl';

Vue.use(ElementUI)

new Vue({
  el:'#app',
  store,  //注入到根实例中
  router,
  components: { App },
  template: '<App/>'
})
