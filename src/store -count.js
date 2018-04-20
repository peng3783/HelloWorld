import Vue from "vue";
import Vuex from "Vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    count:0
  },
  mutations:{
    //increment
    INCREMENT(state){
      state.count++
    },
    //decrement
    DECREMENT(state){
      state.count--
    },
    INCREMENT_WITH_VALUE(state, value){
      state.count += value;
    }
  },
  actions:{
    increment({commit}){
      commit("INCREMENT");
    },
    decrement({commit}){
      commit("DECREMENT");
    },
    incrementWithValue({commit},value){
      let intValue = parseInt(value);
      if(isNaN(intValue)){
        throw "Not an Interger"
      }else{
        commit("INCREMENT_WITH_VALUE",intValue)
      }
    }
  }
})

export default store
