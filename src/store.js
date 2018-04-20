import Vue from "vue";
import Vuex from "Vuex";
//ajax
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state:{
    loginresult : 0,
    registresult : 0,
    albums : [],
    imgs : [],
    wjjname : '',
    username : ''
  },
  mutations:{
    //increment
    VLOGIN(state,n){
      //n.response.data 1 成功 -1 密码错误 -2 用户没有注册 -3 服务器错误
      state.loginresult = n.response.data;
      state.username = n.username;
    },
    VREGIST(state,n){
      //n.response.data 1 成功 -1 被占用  -3 服务器错误
      state.registresult = n.response.data;
      state.username = n.username;
      // console.log(n.response.data);
    },
    VALBUMS(state,albums){
      state.albums = albums;
      // console.log(state.albums);
    },
    VTIAOZHUAN(state,{imgs,name}){
      state.imgs = imgs;
      state.wjjname = name;
      // console.log(state.imgs);
    },
    NEWALBUMSWJJ( state, newname){
      state.albums.push(newname);
    }

  },
  actions:{
    // 登录
    vlogin({commit}, n){
      axios.post('/list/login', {
        "username" : n.username,
        "password" : n.password
      })
      .then(function(response){
        let username = n.username;
         commit("VLOGIN",{response,username});
         // console.log(1)
      })
      .catch(function(error){
        console.log(error);
      })
    },
    //注册
    vregist({commit}, n){
      axios.post('/list/doregist', {
        "username" : n.username,
        "password" : n.password
      })
      .then(function(response){
        let username = n.username;
         commit("VREGIST",{response,username});
         // console.log(1)
      })
      .catch(function(error){
        console.log(error);
      })
    },
    //读取相册文件夹数组
    valbums({commit}){
      let t = new Date().getTime();
        axios.get('/list/showAlbumIndex?t='+t)
          .then(function(response){
            let albums = response.data.albums;
            commit("VALBUMS",albums)
             // console.log(response);
          })
          .catch(function(error){
            console.log(error);
          })
    },
    //读取对应相册文件夹中的图片名字
    vtiaozhuan({commit},name){

      axios.get('/list/album/'+name)
          .then(function(response){
            let imgs = response.data.images;
            commit("VTIAOZHUAN",{imgs,name});
            // console.log(imgs);
          })
          .catch(function(error){
            console.log(error);
          })
    },

//新建文件夹以后视图更新
    newalbumswjj( {commit}, newname ){
      commit( "NEWALBUMSWJJ", newname);
    },
   
    //end
  }
})

export default store
