import axios from "axios"

const proxy = '/list'; //代理名字
let t = new Date().getTime(); 
//登录
export const vlogin = ({commit}, n) => {
    axios.post(proxy+"/login", {
        "username" : n.username,
        "password" : n.password
    })
    .then((response) => {
        let username = n.username;
        commit("VLOGIN", { response,username});
    })
    .catch(() => {
        console.log("登录错误："+error);
    })
}
// 注册
export const vregist = ({commit}, n) => {
    axios.post(proxy + "/doregist", {
        "username" : n.username,
        "password" : n.password
    })
    .then((response) => {
        let username = n.username;
        commit("VREGIST",{response, username});
    })
    .catch((error) => {
        console.log("注册错误:"+error);
    })
}
//读取相册文件夹数组
export const valbums = ({commit}) => {
    axios.get(proxy + "/showAlbumIndex?t="+t)
        .then((response) => {
            let albums = response.data.albums;
            commit("VALBUMS", albums)
        })
        .catch((error) => {
            console.log("读取相册错误："+error);
        })
}
//读取对应相册文件夹中的图片名字
export const vtiaozhuan = ({commit}, name) => {
    axios.get(proxy+'/album/'+name)
        .then((response) => {
            let imgs = response.data.images;
            commit("VTIAOZHUAN", {imgs, name});
        })
        .catch((error) => {
            console.log("读取图片错误："+error);
        })
}
//新建文件夹后视图更新
export const newalbumswjj = ({commit}, newname) => {
    commit("NEWALBUMSWJJ", newname);
}
//
const ERR_OK = 0
export const vInitSeller = ({commit}) => {
    axios.get('/api/seller').then(response => {
      if (response.data.errno === ERR_OK) {
        let seller = response.data.data
        commit("VINITSELLER",seller)
      }
    })

}