<template>
	<div class="shopHome peaceHotel">
		<div class="peaceLunbo">
		  	<el-carousel :interval="4000" type="card" height="410px">
		    	<el-carousel-item>
		      		<img src="~/static/images/banner_01.jpg" alt="">
		    	</el-carousel-item>
		    	<el-carousel-item>
		      		<img src="~/static/images/banner_02.jpg" alt="">
		    	</el-carousel-item>
		    	<el-carousel-item>
		      		<img src="~/static/images/banner_03.jpg" alt="">
		    	</el-carousel-item>
		  	</el-carousel>			
		</div>		
		<div class="hotelContop">
			<div class="hotelContainer">
				<div class="title">
					<img src="~/static/images/hotel_title.png" alt="">
				</div>
				<div class="proCart">
					<div>
						<span>Summer Berry Afternoon Tea</span>
						<span><i>Start from</i> ¥ 343</span>
						<span>Scones with Berriy Jam and Clotted Cream</span>
						<span>Rasspanberry Macaron</span>
						<span>Home Made Cranberry Cookies</span>
						<span>Strawberry Finance</span>
						<span>Baked Rasspanberry Cheese Cake</span>
						<span>Wild Berry Tart</span>
						<span>Strawberry Cream Roll</span>
						<span>Rasspanberry Milk Chocolate Mousse</span>
						<span>...</span>
						<!-- /goods/316 -->
						<nuxt-link to="/goods/316">Buy</nuxt-link>
					</div>
					<img src="~/static/images/image_01.png" class="img1" alt="">
				</div>
				<div class="clearfix">
					<div class="proCart cart2">
						<img src="~/static/images/image_02.png" alt="" class="img2">
						<div>
							<span>Cathay Sunday Brunch</span>
							<span>¥ 688</span>
							<span>Our Sunday Brunch are featured</span>
							<span>on the diversified seafood</span>
							<span>western and chinese styly cuisines</span>
							<span>Besides the buffet, </span>
							<span>you also can choose</span>
							<span>Wild Berry Tart</span>
							<span>a maincourse from</span>
							<span>our signature a la carte menu.</span>
							<nuxt-link to="/goods/315">Buy</nuxt-link>
						</div>
					</div>
				</div>
				<div class="proCart">
					<div>
						<span>Workdays Lunch Set (3 courses)</span>
						<span>¥ 332</span>
						<span>Summer Garden Tomato / Burrata / Compressed Grape <br>/ Smoked Tomato Jelly / Puffed Quinoa </span>
						<span>Ora King Salmon / Pickled Beets / Fish Crackling <br>/ Mango & Mustard Dip / Fromage Blanc (100extra) </span>
						<span>The Cathay Caesar / Smoked Duck Egg / Iberian Ham <br>/ Walnut Toast / Anchovy Dressing </span>
						<span>Lobster Bisque / Grilled Shrimp / Vegetable Fricassee</span>
						<span>...</span>
						<nuxt-link to="/goods/314">Buy</nuxt-link>
					</div>
					<img src="~/static/images/image_03.png" class="img1" alt="">
				</div>
			</div>
		</div>
		<div class="hotelConCenter">
			<div class="hotelContainer">
				<div class="title hotelTitle">
					<img src="~/static/images/hotel_title2.png" alt="">
				</div>
				<div class="hotelTxt clearfix">
					<div class="txt1">
						<img src="~/static/images/image_04.jpg" alt="">
						<span>Shanghai's legendary hotel icon since 1929, Fairmont Peace Hotel is a cherished city landmark that combines historic grandeur with modern amenities. The toast of the Far East in the 1930s, Fairmont Peace Hotel's 11-floor art deco facade is designed in the Gothic style of the Chicago school, which has become a defining feature of the splendid Bund skyline. Entering the hotel through one of four vintage revolving doors, guests immediately feel a sense of the style and sophistication of its 1930s heyday, including the stunning octagonal stained glass lay light that had for decades been covered upwith gypsum board. Just off the lobby, the ground floor functions as a Retail Arcade featuring luxury brand flagships across custom-patterned stone mosaic floors.</span>
					</div>
					<div class="txt2">
						<p>Experience Shanghai's</p>
						<p>Colorful History and</p>
						<p>Modern Hospitality</p>
						<img src="~/static/images/image_05.jpg" alt="">
					</div>
					<div class="txtBottom">
						Guestrooms feature 1930s period flourishes along with contemporary comforts and cutting-edge technology. Fashionable luxury materials of the day, such as grey-vein marble, Noir St. Laurent dark limestone and walnut burl grain woods, adorn the interior surfaces. The famous Nine Nations Suites, preserved from the original hotel, are unique 178-square-meter rooms that have hosted countless VIP, diplomats and celebrities over the decades. One of the city's most sought-after properties, this global hotel icon combines historic grandeur with modern amenities, making it ideal for 21st Century luxury travellers. 
					</div>
				</div>
			</div>
		</div>
		<div class="hotelConBottom">
			<div class="hotelContainer">
				<div class="title hotelTitle">
					<img src="~/static/images/hotel_title3.png" alt="">
				</div>
				<div class="bottomCarousel">
				  	<el-carousel :interval="4000" type="card" height="385px">
				    	<el-carousel-item>
				      		<img src="~/static/images/photo_01.jpg" alt="">
				    	</el-carousel-item>
				    	<el-carousel-item>
				      		<img src="~/static/images/photo_02.jpg" alt="">
				    	</el-carousel-item>
				    	<el-carousel-item>
				      		<img src="~/static/images/photo_03.jpg" alt="">
				    	</el-carousel-item>
				    	<el-carousel-item>
				      		<img src="~/static/images/photo_04.jpg" alt="">
				    	</el-carousel-item>
				    	<el-carousel-item>
				      		<img src="~/static/images/photo_05.jpg" alt="">
				    	</el-carousel-item>
				  	</el-carousel>			
				</div>
				<div class="txt">
					Fairmont Hotels & Resorts connects guests to the very best of its destinations worldwide, providing travelers with memorable travel experiences, thoughtful and attentive service and luxury hotels that are truly unforgettable. Each Fairmont property reflects the locale’s energy, culture and history through locally inspired cuisine, spirited bars and lounges and distinctive design and decor. With more than 70 hotels globally, and many more in development, the Fairmont collection boasts some of the most iconic and distinctive hotels in the world. This extraordinary collection includes The Plaza in New York, The Savoy in London, Fairmont Grand Del Mar, Dubai’s Fairmont The Palm, Fairmont Peace Hotel in Shanghai, Fairmont San Francisco and Fairmont Le Château Frontenac in Québec City. Fairmont is part of AccorHotels, a world-leading travel & lifestyle group and digital innovator offering unique experiences in more than 4,200 hotels, resorts and residences, as well as in over 10 000 of the finest private homes around the globe. For more information or reservations, please visit fairmont.com.  
				</div>
			</div>
		</div>
	</div>
</template>
<script>
    import shopNav from '~/components/layout/shopNav.vue'
    // 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	export default {
		layout: 'shopHome',
		head () {
            return {
                title: 'Fairmont Peace Hotel'
            }
        },
		data() {
			return {

			}
		},
		async asyncData ({app,params,store,redirect}) {
			try {
				const shopData = await app.$axios.post(interfaceApi.shop,{
			 		id: 32
			 	});
	  			return { shopData: shopData.data.data}
			} catch(e) {
				redirect('/')
			}
		 	
		},
		components: {
			shopNav,
		},
		mounted() {
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
	.peaceHotel
		.title 
			@include wc(100%, center)
			padding: 30px 0 10px 0
		.hotelTitle
			margin-bottom: 40px
		.hotelContainer
			width: 1000px 
			margin: 0 auto
		.peaceLunbo 
		.hotelContop
			background-image: url(~/static/images/back_01.jpg)
			width: 100%
			height: 100%
			background-size: cover
			.hotelContainer
				width: 1000px 
				margin: 0 auto
				.proCart
					background: #4545458a
					color: #fff
					@include whch(492px, 462px, center, 30px)
					padding: 15px
					box-sizing: border-box
					position: relative
					margin-bottom: 30px
					>div 
						@include wh(100%, 100%)
						border: 1px solid #fff
						span 
							display: inline-block
							padding-bottom: 1px
							width: 360px
							font-size: 14px
						span:nth-of-type(1)
							font-size: 24px
							padding-top: 20px
							padding-bottom: 10px
						span:nth-of-type(2)
							font-size: 24px
							i 
								font-size: 14px
						a 
							background: #eab04f
							@include sc(22px, #fff)
							@include whh(280px, 38px, 38px)
							display: inline-block
							border-radius: 8px
							position: absolute
							bottom: 25px 
							left: 107px
					>img 
						position: absolute
					.img1 
						top: 60px 
						right: -105%
				.clearfix 
					overflow: hidden
					.cart2
						float: right
						.img2 
							top: 60px 
							left: -105%
		.hotelConCenter
			background-image: url(~/static/images/back_02.jpg)
			@include wh(100%, 100%)
			background-size: cover
			.hotelTxt
				overflow: hidden 
				>div 
					float: left
					font-size: 14px
				.txt1
					width: 55%
					padding-right: 45px
					box-sizing: border-box
					span 
						line-height: 28px 
						color: #666
				.txt2
					width: 45%
					font-family: 'Adobe'
					@include sc(30px, #222)
					p:nth-of-type(3)
						margin-bottom: 20px
				.txtBottom
					line-height: 28px 
					color: #666
					margin-bottom: 30px
		.hotelConBottom
			background-image: url(~/static/images/back_03.jpg)
			@include wh(100%, 100%)
			background-size: cover
			.txt 
				line-height: 28px
				@include sc(14px, #666)
				margin-bottom: 30px
			.bottomCarousel
				img 
					width: 100%
				
								
</style>