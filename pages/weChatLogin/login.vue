<template>
	<div></div>
</template>
<script>
	// 设置cookie
	import Cookie from 'js-cookie'
	export default {
		mounted() {
			Cookie.set('token', encodeURIComponent(this.$route.query.token));
            Cookie.set('nickname',encodeURIComponent(this.$route.query.nickname));
            Cookie.set('headimgurl',encodeURIComponent(this.$route.query.headimgurl));
			this.$store.commit('SET_USER',this.$route.query.token);
			this.$store.commit('NICKNAME',this.$route.query.nickname);
			this.$store.commit('HEADIMGURL',this.$route.query.headimgurl);
			this.user.JumpBackToPage();
			localStorage.removeItem('goback');
		}
	}
</script>
<style scoped>
	
</style>