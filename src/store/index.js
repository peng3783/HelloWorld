import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'


Vue.use(Vuex)

const state = {
    loginresult : 0,
    registresult : 0,
    albums : [],
    imgs : [],
    wjjname : '',
    username : '',
    seller: {}
}

const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations
})
// 实话说不是很明白这个热重载的意义
// if (module.hot) {
//     //使其可以热重载模块
//     module.hot.accept([
//         './getters',
//         './actions',
//         './mutations'
//     ], () => {
//         //获取更新后的模块，加载新模块
//         store.hotUpdate({
//             getters : require('./getters'),
//             actions : require('./actions'),
//             mutations : require('./mutations')
//         })
//     })
// }

export default store