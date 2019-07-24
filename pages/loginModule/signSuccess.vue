 <template>
	<div class="">
		<signStep flag="3"/>
		<div class="sign">
			<div>
				<i class="iconfont icon-chenggongcopy-"></i>
				<p>Registration Success.<a @click="goBackPage">You may start shopping!</a></p>
			</div>
		</div>
	</div>
</template>
<script>
	import signStep from '~/components/layout/signStep'
	import utils from '~/assets/js/utils'
	export default {
		layout ({ store }) {
			return utils.signInWith2(store.state.layoutFlag)
		},
		data() {
			return {
				
			}
		},
		components: {
			signStep
		},
		mounted() {

			
		},
	  	computed: {  
		    
	  	},
		methods: {
			goBackPage() {
				let path = window.localStorage.getItem('goBack');
				this.user.JumpBackToPage();
			}
		}
	}
</script>
<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'
	.sign 
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