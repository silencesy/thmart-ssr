import utils from '~/assets/js/utils'
// 设置cookie
import Cookie from 'js-cookie'
export default function ({route, req, res, redirect}) {
  let isClient = process.client;
  let isServer = process.server;
  let redirectURL = '/loginModule/login';
  // token用户标识
  // path回调地址
  var token, path;
  //在服务端
  if (isServer) {
    let cookies = utils.getcookiesInServer(req);
    path = req.originalUrl;
    token = cookies.token ? cookies.token : '';
  }
  //在客户端判读是否需要登陆
  if (isClient) {
    token = utils.getcookiesInClient('token');
    path = route.path;
  }
  if (path) {
    redirectURL = '/loginModule/login?ref=' + encodeURIComponent(path);
  }
  //需要进行权限判断的页面开头
  if (route.query.token != undefined) {
    Cookie.set('token', route.query.token);
  } else {
    if (!token) {
      redirect(redirectURL)
    }
  }
  
}
