<template>
	<div class="error">
		<div class="container">
			<div class="notFound">
				<img src="~static/images/404_img.png" alt="">
				<p class="sorry">Sorry! </p>
				<p>The site you are visiting does not exist.</p>
				<div class="btnBox">
					<button>Previous page</button>
					<button>Homepage</button>
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
				padding: 40px 0
				p
					font-size: 18px
				.sorry
					font-size: 24px
					padding: 14px 0
				img 
					@include wh(200px, 200px)
				.btnBox
					overflow: hidden
					margin-top: 20px
					button
						@include wh(160px, 40px)
						background-color: $theme_color
						color: #fff
						border-radius: $border_radius
						float: left
					button:nth-child(2)
						float: right
</style>
