import Vue from 'vue'
import VueRouter from 'vue-router'

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
//$route.name会直接在视图上更改,$route.params.id不会直接更改是个虚拟DOM需要点击其余路由然后重新渲染才看得到
const firstFirst = {
	template:'<div>{{$route.name}}firstFirst{{$route.params.id}}</div>'
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
	router,
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
		</div>`
}).$mount('#app')