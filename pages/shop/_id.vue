<template>
	<div class="shopHome">
		<!-- <shopNav :infoData="shopData" /> -->
		<!-- 轮播图 -->
		<SwiperComponent :swiperData="shopData.figure"/>
		<div class="container">
			<div class="conPic">
				<!-- <img src="~static/images/flower.jpg" alt="">
				<img src="~static/images/flower.jpg" alt=""> -->
				<a v-for="(item,index) in shopData.content" :href="item.url" :key="index">
					<img v-lazy="item.pic" alt="">
				</a>
			</div>
		</div>
	</div>
</template>
<script>
    import shopNav from '~/components/layout/shopNav.vue'
	import SwiperComponent from "~/components/base/Swiper"
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	export default {
		layout: 'shopHome',
		validate ({ params }) {
		// Must be a number
			return /^\d+$/.test(params.id)
		},
		head () {
            return {
                title: this.shopData.name
            }
        },
		data() {
			return {
				
			}
		},
		async asyncData ({app,params,store,redirect}) {
			try {
				const shopData = await app.$axios.post(interfaceApi.shop,{
			 		id: params.id,
			 		terminal: 'PC'
			 	});
	  			return { shopData: shopData.data.data}
			} catch(e) {
				redirect('/')
			}
		 	
		},
		components: {
			shopNav,
			SwiperComponent
		},
		mounted() {
			console.log(this.$api);
			this.setShopInfo();
		},
	  	computed: {  
		    
	  	},
		methods: {
			setShopInfo() {
				// 设置商户的信息在layout布局中的shopnav组件中使用数据
			 	this.$store.commit('SET_SHOP_INFO',this.shopData);
			}
		}
	}
</script>
<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'
	.conPic
		text-align: center
		img
			width: 750px
			display: block
			margin: 0 auto
</style>