//登录
export const VLOGIN = (state, n) => {
  //n.response.data 1 成功 -1 密码错误 -2 用户没有注册 -3 服务器错误
  state.loginresult = n.response.date,
    state.username = n.username
}
// 注册
export const VREGIST = (state, n) => {
  //n.response.data 1 成功 -1 被占用  -3 服务器错误
  state.registresult = n.response.data,
    state.username = n.username

}
//读取相册文件夹数组
export const VALBUMS = (state, albums) => {
  state.albums = albums
}
//读取对应相册文件夹中图片的名字
export const VTIAOZHUAN = (state, {
  imgs,
  name
}) => {
  state.imgs = imgs,
    state.wjjname = name

}
//新建文件夹后视图更新
export const NEWALBUMSWJJ = (state, newname) => {
  state.albums = albums.push(newname)
}
//
export const VINITSELLER = (state, seller) => {
  state.seller = seller
}
