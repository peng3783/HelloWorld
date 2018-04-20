import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store.js' //引入store对象
import App from '../App.vue'

Vue.use(VueRouter);

const First = {
	template:'<div>first</div>'
}
const Second = {
	template:'<div>second</div>'
}
const Home = {
	template:'<div>home</div>'
}

const firstFirst = {
	template:'<div>{{$route.name}} firstFirst{{$route.params.id}}</div>'
}
const firstSecond = {
	template:'<div>firstSecond</div>'
}

const zizujian = {
	template:'<div><h2>组件</h2><router-view></router-view></div>'
}

const routes = [
	{ path : '/' , name : "Home", component : Home },
	{ path : '/first' , component : zizujian ,
		children : [
			{ path : '/', name : 'Home-First', component : First },
			{ path : 'first', name : 'Home-First-First', component : firstFirst },
			{ path : 'second', name : 'Home-First-Second' , component : firstSecond }
		] },
	{ path : '/second' , name : 'Home-second', component : Second }
]


const router = new VueRouter({
	 routes
})

new Vue({
	store,
	router,
	components: { App },
	template : `
		<div>
			<h1>导航</h1>
			{{$route.name}}
			<ul>
				<li><router-link to = "/">/</router-link></li>
				<li><router-link to = "/first">first</router-link></li>
					<ol>
						<li><router-link :to = "{name:'Home-First-First', params:{id:123}}" >first_first</router-link></li>
						<li><router-link to = '/first/second'>first_second</router-link></li>
					</ol>
				<li><router-link to = "/second">second</router-link></li>
			</ul>
			<router-view></router-view>
			<App></App>
		</div>`
}).$mount('#app')