import Vue from 'vue';
//UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//ajax
import axios from 'axios';
// Vue.prototype.$http = axios;

import App from './App.vue';
//router
import router from './router';
//vuex store
import store from './store.js' //引入store对象
//


Vue.use(ElementUI)

new Vue({
  el:'#app',
  store,  //注入到根实例中
  router,
  components: { App },
  template: '<App/>'
})
