import Vue from 'vue'
import VueRouter from 'vue-router'

//引入组件
// import home from '../components/home.vue';
// import about from '../components/about.vue';
// import vlogin from '../components/vlogin.vue';
// import vregist from '../components/vregist.vue';
// import valbums from '../components/valbums.vue';
// import vimgs from '../components/vimgs.vue';
//组件异步加载
// const home = resolve => require(['../components/home.vue'],resolve);
// const about = resolve => require(['../components/about.vue'],resolve);
// const vlogin = resolve => reuire(['../components/vlogin.vue'],resolve);
//从13秒提升到9秒出现界面
const home = () => import('../components/home.vue')
const about = () => import('../components/about.vue')
const vlogin = () => import('../components/vlogin.vue')
//识别不了import
const vregist = () => import('../components/vregist.vue')
const valbums = () => import('../components/valbums.vue')
const vimgs = () => import('../components/vimgs.vue')
const sell = () => import("../components/sell/sell.vue")
const goods = () => import("../components/goods/goods.vue")
const ratings = () => import("../components/ratings/ratings.vue")
const seller = () => import("../components/seller/seller.vue")


//告诉vue使用VueRouter
Vue.use(VueRouter);


// path后面的路劲要加"/"
const routes = [
	{ path: '/', redirect: '/home' },
	{ path: '/home', component: home },
	{ path: '/about', component: about },
	{ path: '/login', component: vlogin },
	{ path: '/regist', component: vregist },
	{ path: '/albums', component: valbums },
	{ path: '/albums/:imgs', component: vimgs },
	{
		path: '/sell', components: {
			default: sell,
			sellview: goods
		},
		// children:[
		// 	{
		// 		//当 /sell/goods匹配成功
		// 		path : 'goods',
		// 		components: {
		// 			default : sell,
		// 			sellview : goods

		// 		}
		// 	}
		// ]//不知道为什么这样写就不能命名匹配

	},
	{
		path: "/sell/goods", components: {
			default: sell,
			sellview: goods
		},
	},
	{
		path: "/sell/ratings", components: {
			default: sell,
			sellview: ratings
		},
	},
	{
		path: "/sell/seller", components: {
			default: sell,
			sellview: seller
		},
	},
]


const router = new VueRouter({
	mode: 'history',
	routes,
	linkActiveClass: 'active'
})

export default router
