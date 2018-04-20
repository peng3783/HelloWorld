import Vue from 'vue'
import VueRouter from 'vue-router'

//引入组件
import home from '../components/home.vue';
import about from '../components/about.vue';
import vlogin from '../components/vlogin.vue';
import vregist from '../components/vregist.vue';
import valbums from '../components/valbums.vue';
import vimgs from '../components/vimgs.vue';

//告诉vue使用VueRouter
Vue.use(VueRouter);


// path后面的路劲要加"/"
const routes = [
	{ path : '/', redirect : '/home'},
	{ path : '/home', component : home },
	{ path : '/about', component : about },
	{ path : '/login', component : vlogin },
	{ path : '/regist', component : vregist },
	{ path : '/albums', component : valbums },
	{ path : '/albums/:imgs', component : vimgs }
]


const router = new VueRouter({
	 routes
})

export default router
