import Cookie from 'js-cookie'
import { Message } from 'element-ui';
export default function ({ $axios,router, redirect,store }) {
	// 请求拦截
	$axios.onRequest(config => {
		if (store.state.token) {
			config.headers.TOKEN = store.state.token;
		}
	})
	// 响应拦截
	$axios.onResponse(res=>{
		// if (res.data.code==1 && res.data.data.token) {
		// 	Cookie.set('token', res.data.data.token);
		// 	store.commit('SET_USER',res.data.data.token);
		// }
		// if (res.data.code==1 && res.data.data.nickname) {
		// 	Cookie.set('nickname',res.data.data.nickname);
		// 	Cookie.set('headimgurl',res.data.data.headimgurl);
		// 	store.commit('NICKNAME',res.data.data.nickname);
		// 	store.commit('HEADIMGURL',res.data.data.headimgurl);
		// }
		// 未传token
		if (res.data.code == 100 || res.data.code == 101 || res.data.code == 102 || res.data.code == 103) {
			console.log(res.data.code);
		  // redirect({
		  //   path: "/loginModule/login"
		  // });
		}
		// 手机号已被注册
		if (res.data.code == 104) {
			Message({
				message: 'This phone number has been registered!',
          		type: 'warning'
			});
		}
		// 验证码发送次数过多，稍后再试
		if (res.data.code == 105) {
			Message({
				message: 'Frequent operation, please try again later!',
          		type: 'warning'
			});
		}
		// 验证码错误
		if (res.data.code == 106) {
			Message.error('Verification code error!');
		}
		// 两次密码错误
		if (res.data.code == 107) {
			Message.error('The two passwords you entered do not match!');
		}
		// 手机号未注册
		if (res.data.code == 109) {
			Message({
				message: 'The user with this username/mobile number is not registered!!',
				type: 'warning'
			});
		}
		// 手机号登录密码错误
		if (res.data.code == 110) {
			Message.error('The password is incorrect!');
		}
		// 库存不足
		if (res.data.code == 114) {
			Message({
				message: '库存不足',
				type: 'warning'
			});
		}
		// 手机号登录密码错误
		if (res.data.code == 117) {
			Message.error('原始密码错误！');
		}
		
		// if (res.data.code==0) {
		// 	redirect('/error/networkError')
		// }
	})
	// 网络错误统一处理
	$axios.onError(error => {
		const code = parseInt(error.response && error.response.status)
		if (code === 400) {
			// redirect('/loginModule/login')
		}
		if (code === 500) {
			// redirect('https://www.imooc.com/wenda/detail/398980')
		}
	})
}