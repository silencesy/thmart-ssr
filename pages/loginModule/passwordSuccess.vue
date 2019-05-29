 <template>
	<div class="">
		<passwordStep flag="3"/>
		<div class="pW">
			<div>
				<i class="iconfont icon-chenggongcopy-"></i>
				<p>Password Reset Success.<a @click="login">You may log in!</a></p>
			</div>
		</div>
	</div>
</template>
<script>
	import passwordStep from '~/components/layout/passwordStep.vue'
	export default {
		layout: 'passwordHome',
		data() {
			return {
				
			}
		},
		components: {
			passwordStep
		},
		mounted() {

			
		},
	  	computed: {  
		    
	  	},
		methods: {
			login() {
				let path = window.localStorage.getItem('goback');
				this.$router.push({name: 'loginModule-login',query: {
                    ref: path
                }})
			}
		}
	}
</script>
<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'
	.pW 
		width: 413px
		margin: 0 auto
		padding-left: 5px
		>div
			text-align: center
			margin-bottom: 240px
			i 
				display: block
				@include sc(36px, #6EA55D)
			p 
				margin-top: 20px
				a 
					color: $theme_color
					cursor: pointer

</style>