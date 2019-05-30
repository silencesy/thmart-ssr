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
				// if (address.indexOf('uf.thatsmags.com') != -1) {
				// 	var token = Cookie.get('token');
				// 	window.location.href = address + '?token=' + decodeURIComponent(decodeURIComponent(token));
				// } else {
					if (address) {
						if (address.indexOf('uf.thatsmags.com') != -1) {
							if (address.indexOf('?') != -1) {
								var token = Cookie.get('token');
								window.location.href = address + '&token=' + decodeURIComponent(decodeURIComponent(token));
							} else {
								var token = Cookie.get('token');
								window.location.href = address + '?token=' + decodeURIComponent(decodeURIComponent(token));
							}
							
						} else {
							window.location.href = address;
						}
					} else {
						window.location.href = window.location.origin;
					}
					localStorage.removeItem('goback')
				// }
        	},
            // 判断是否登录
            isLogin: function () {
                var isLoginObj = utils.getcookiesInClient();
                return isLoginObj.token?true: false;
            }
        };
        
    }
}
Vue.use(commonJs);