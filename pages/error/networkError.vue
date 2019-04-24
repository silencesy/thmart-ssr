<template>
	<div class="error">
		<div class="container">
			<div class="notFound">
				<img src="~static/images/network_img.png" alt="">
				<p>Network error! </p>
				<div class="btnBox">
					<button>Please reload the page</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		// layout: 'indexHome',
		data() {
			return {

			}
		},
		components: {

		},
		mounted() {

			
		},
	  	computed: {  
		    
	  	},
		methods: {

		}
	}
</script>

<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'
	.error 
		.container 
			.notFound
				width: 380px
				margin: 0 auto
				text-align: center
				padding: 75px 0
				p
					font-size: 24px
				img 
					@include wh(200px, 160px)
				.btnBox
					overflow: hidden
					margin-top: 20px
					button
						@include wh(220px, 40px)
						background-color: $theme_color
						color: #fff
						border-radius: $border_radius
</style>
