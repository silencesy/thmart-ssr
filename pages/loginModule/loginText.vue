<template>
	<div>
		<div>
			<input type="text" v-model="name">
		</div>
		<div>
			<input type="password" v-model="password">
		</div>
		<button @click="submitform">提交</button>
	</div>
</template>
<script>
	// import axios from '~/plugins/axios'
	// import f from '~/plugins/F'
	import Cookie from 'js-cookie'
	import interfaceApi from '~/plugins/interfaceApi'
	export default {
		data() {
			return {
				name: "",
				password: "",
				token: ""
			}
		},
		methods: {
			submitform() {
				var that = this;
				console.log(that.name);
				console.log(that.password);
				that.$axios.post('https://proj6.thatsmags.com/thmartApi/' + interfaceApi.login,{
					mobile: that.name,
					password: that.password	
				}).then(res=> {
					if (res.data.code==1) {
				    	that.$store.commit('SET_USER',res.data.data.token);
				    	
				    	that.$router.replace({name: 'index'});
				    }
				})
				// axios.post(interfaceApi.login,{
				// 	mobile: that.name,
				// 	password: that.password	
				// })
			 //    .then((res) => {
			 //    	// console.log(res);
				//     // that.token = res;
				//     f();
				//     if (res.data.code==1) {
				//     	that.$store.commit('SET_USER',res.data.data.token);
				//     	that.$router.replace({name: 'index'});
				//     }
	   //  		})
			}
		}
	}
</script>
<style scoped>
	
</style>