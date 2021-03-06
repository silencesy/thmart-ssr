import Vue from 'vue'
import Router from 'vue-router'
import utils from '~/assets/js/utils'
// 设置cookie
import Cookie from 'js-cookie'
Vue.use(Router)
var commonJs= {
    install(Vue){
        Vue.prototype.user = {
        	// 设置登录成功之后回跳地址
        	SetComebackAddress: function() {
        		var goBackAddr = window.location.href;
        		localStorage.setItem('goback',goBackAddr);
        	},
        	// 执行回跳地址
        	JumpBackToPage: function() {
				var address = localStorage.getItem('goback') ||  null;
				if (address) {
					// 判断如果是uf或者优智家 那么就跳转uf或者优智家
					if (address.indexOf('urban-family.com') != -1 || address.indexOf('urfamily.com') != -1) {
						// 如果过来的地址含？
						if (address.indexOf('?') != -1) {
							var token = Cookie.get('token');
							window.location.href = address + '&token=' + decodeURIComponent(decodeURIComponent(token));
						} else {
						// 没有含？
							var token = Cookie.get('token');
							window.location.href = address + '?token=' + decodeURIComponent(decodeURIComponent(token));
						}
						
					} else {
					// 跳转商城上一个页面
						window.location.href = address;
					}
				} else {
					// 如果上一个页面没有就跳转首页
					window.location.href = window.location.origin;
				}
				localStorage.removeItem('goback')
        	},
            // 判断是否登录
            isLogin: function () {
                var isLoginObj = utils.getcookiesInClient();
                return isLoginObj.token?true: false;
			},
			// 第三方网站地址设置
			setThirdPartyWebsite: function (path) {
				if (path.indexOf('urfamily')!=-1) {
					return 'urfamily'
				} else if (path.indexOf('urban-family') != -1)  {
					return 'urban-family'
				} else {
					return 'thmart'
				}
			}
        };
        
    }
}
Vue.use(commonJs);