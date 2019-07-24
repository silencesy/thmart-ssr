import Cookie from 'js-cookie'
export default {
  //获取服务端cookie
  getcookiesInServer:function (req) {
    let service_cookie = {};
    req && req.headers.cookie && req.headers.cookie.split(';').forEach(function (val) {
      let parts = val.split('=');
      service_cookie[parts[0].trim()] = (parts[1] || '').trim();
    });
    return service_cookie;
  },
  //获取客户端cookie
  getcookiesInClient:function (key) {
    return Cookie.get(key) ? Cookie.get(key) : ''
  },
  // 第三方登录页面布局
  signInWith: function (path) {
    if (path.indexOf('urfamily') != -1) {
        return 'ufCnLogin'
    } else if (path.indexOf('urban-family') != -1) {
        return 'ufEnLogin'
    } else {
        return 'loginHome'
    }
  },
  // 第三方注册页面布局
  signInWith2: function (path) {
    if (path == 'ufCnLogin') {
        return 'ufCnsignHome'
    } else if (path == 'ufEnLogin') {
        return 'ufEnsignHome'
    } else {
        return 'signHome'
    }
  },
  // 第三方重置密码页面布局
  signInWith3: function (path) {
      if (path == 'ufCnLogin') {
          return 'ufcnpasswordHome'
      } else if (path == 'ufEnLogin') {
          return 'ufenpasswordHome'
      } else {
          return 'passwordHome'
      }
  }
}
