<template>
	<div></div>
</template>
<script>
	// 设置cookie
	import Cookie from 'js-cookie'
	export default {
		mounted() {
			// 后台返回数据混乱，有时候返回主域名有时候不反回 （如果多返回主域名那么前端把它去掉）
			var headimgurl = this.$route.query.headimgurl;
			if(headimgurl.indexOf('thirdwx.qlogo.cn') != -1) {
				headimgurl = headimgurl.replace('http://api.mall.thatsmags.com','');
			}
			Cookie.set('token', encodeURIComponent(this.$route.query.token));
            Cookie.set('nickname',encodeURIComponent(this.$route.query.nickname));
            Cookie.set('headimgurl',encodeURIComponent(headimgurl));
			this.$store.commit('SET_USER',this.$route.query.token);
			this.$store.commit('NICKNAME',this.$route.query.nickname);
			this.$store.commit('HEADIMGURL',headimgurl);
			this.user.JumpBackToPage();
			localStorage.removeItem('goback');
		}
	}
</script>
<style scoped>
	
</style>