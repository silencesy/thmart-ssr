<template>
	<div class="cart">
		<div class="container">
			<div class="cartEmptyBox">
				<div class="cartEmpty">
					<p>Your cart is currently emity</p>
					<nuxt-link to="/">Start Shopping</nuxt-link>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	export default {
		layout: 'userHome',
		middleware: 'userAuth',
		head () {
    		return {
      			title: 'Cart'
        	}
  		},
		async asyncData ({app,params,store,redirect}) {
		 	const dataList = await app.$axios.post(interfaceApi.cartList);
		 	// 如果购物车数量为0，则跳转空购物车
		 	if (dataList.data.data.data.length > 0) {
		 		redirect('/userCenter/cartModule/cart');
		 	}
		}
	}
</script>

<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'
	.cart 
		.container			
			.cartEmptyBox
				position: relative
				width: 100%
				height: 600px
				text-align: center
				.cartEmpty					
					@include center
					p
						@include sc(14px, #999)
						margin-bottom: 20px
					a
						display: inline-block 
						@include whch(120px, 36px, center, 36px)
						background-color: $theme_color
						color: #fff
						border-radius: $border_radius
</style>
