<template>
	<div class="business">
		<div class="investImg">
			<img src="~/static/images/zhaoshang.jpg" alt="">
		</div>
		<div class="container">
			<div style="margin-top: 25px;text-align: center;">
				<video width="1000" height="550" style="object-fit:fill;" muted autoplay="autoplay" controls x5-video-player-type='h5'>
		            <source src="~/static/video/thmart.mp4" type="video/mp4">
		        </video>
			</div>
			<div class="ruzhuYoushi">
				<h2 class="ruzhu">Advantages</h2>
				<p class="cnen"><nuxt-link to="/business/businessCn">中文</nuxt-link></p>
				<div>
					<span class="yige">An easy and convenient way to sell your products - check your order and shipping anytime, anywhere on both desktop and mobile</span>
					<span class="iconfont icon-shebeidiannaoshouji"></span>
					<span class="iconfont icon-pingtai"></span>
					<span class="quanxin">A brand new platform to expand your business</span>
				</div>
				<div class="mac">
					<span class="xinpin">One-week showcase opportunity on homepage for new products</span>
					<span class="iconfont icon-tiannei"></span>
					<img src="~/static/images/mac.png" alt="">
					<span class="iconfont icon-cuxiao1"></span>
					<span class="cuxiao">One-week showcase opportunity for new products with a special offer</span>
				</div>
				<div>
					<span class="zhendui">Marketing promotion tailored for your products</span>
					<span class="iconfont icon-sale"></span>
					<span class="iconfont icon-gongzhonghao"></span>
					<span class="tuiguang">Promotion on our WeChat subscription account</span>
				</div>
			</div>
		</div>
		<div class="containerBg">
			<div class="container">
				<div class="ruzhuLiucheng">
					<h2 class="ruzhu">How to sign up</h2>
					<div class="buzhou clearfix">
						<li>
							<span class="iconfont icon-shuziyi"></span>
							<span>If you are interested, please contact us at</span><br>
							<a href="mailto:thmart@urbanatomy.com" class="youxiang">thmart@urbanatomy.com</a>
						</li>
						<li>
							<span class="iconfont icon-2"></span>
							<span>We’ll get back to you within three working days of you submitting you materials</span>
						</li>
						<li>
							<span class="iconfont icon-shuzisan"></span>
							<span>We’ll then craft an individual vendor page for you</span>
						</li>
						<li class="buzhouLast">
							<span class="iconfont icon-shuzisi"></span>
							<span>Your products will then be available for sale</span>
						</li>												
					</div>
				</div>
			</div>
		</div>
		<div class="container itab">
			<el-tabs type="border-card">
				<el-tab-pane label="Selections of Goods">
		            <div class="txt txtT">
		            	<div class="txtP">
		            		<p>thMart is a lifestyle platform that provides a comprehensive range of services and information for China-based expats. Users can experience our varied online shopping service, covering everything from useful products to the best restaurants, attractions and activities. And all this, anytime and anywhere. </p>
		            		<p>You don’t need to worry about language problems either. We offer a translation service, including product descriptions and design. Commission works on a sliding scale according to the classification of the goods. And when goods are updated, vendors will enjoy the benefit of our promotions platforms, from WeChat to website, print to offline events.</p>
		            	</div>
						<table class="goodsTable">
							<tr class="titleT">
								<td>Categories</td>
							</tr>
							<tr>
								<td>Ticketing</td>
							</tr>
							<tr>
								<td>Flower</td>
							</tr>
							<tr>
								<td>Toys</td>
							</tr>
							<tr>
								<td>Electronics</td>
							</tr>
							<tr>
								<td>Homeware</td>
							</tr>
							<tr>
								<td>Baby products</td>
							</tr>
							<tr>
								<td>Liquor</td>
							</tr>
							<tr>
								<td>Cleaning</td>
							</tr>
							<tr>
								<td>Office products</td>
							</tr>
							<tr>
								<td>Apparel</td>
							</tr>
							<tr>
								<td>Personal care and beauty</td>
							</tr>
							<tr>
								<td>Pet product</td>
							</tr>
							<tr>
								<td>Automotive</td>
							</tr>
							<tr>
								<td>Watch</td>
							</tr>
							<tr>
								<td>Sports</td>
							</tr>
							<tr>
								<td>Coupons</td>
							</tr>
							<tr>
								<td>Food and Beverage</td>
							</tr>
							<tr>
								<td>Book</td>
							</tr>
							<tr>
								<td>Jewelery</td>
							</tr>
							<tr>
								<td>Musical instrument</td>
							</tr>
						</table>
						<div class="join clearfix">
							<div class="joinUs clearfix">
								<div>JOIN US</div>
								<div>
									<p>1.All goods must be displayed in English. Please <nuxt-link to="/business/costEn" class="fanyi">click here</nuxt-link> if you need a translation service</p>
									<p>2.thMart charges a transaction fee on each trade</p>
									<p>3.A deposit is required for some products</p>
								</div>
							</div>
						</div>
		            </div> 
				</el-tab-pane>
				<el-tab-pane label="Personalized Store">
		            <div class="txt txtO">
		            	<div class="txtP">
							<p>Want to broaden your retail market? thMart Personalized Store is the perfect opportunity. Each store has its own page, which ThMart helps design, while store owners hold the authority to upload and update their products. It should be noted that all Personalized Shops will be sold in package. In accordance with different package prices, we will provide a variety of promotions for shop owners. Please check Table 1 for reference.</p>
						</div>
						<table>
							<tr class="trTitle">
								<td></td>
								<td>Feature Shop</td>
								<td>Offline Selling*</td>
								<td>Banner Promotion</td>
								<td>Wechat Promotion</td>
								<td>Multi Platform Promotion</td>
								<td>Editor’s Pick</td>
								<td>Shop Decoration</td>
							</tr>
							<tr class="jichu">
								<td>Basic Package</td>
								<td class="iconfont icon-duihao2"></td>
								<td class="iconfont icon-duihao2"></td>
								<td></td>
								<td class="iconfont icon-duihao2"><i>(*2 times)</i></td>
								<td></td>
								<td class="iconfont icon-duihao2"><i>(*1 articles)</i></td>
								<td class="iconfont icon-duihao2"></td>
							</tr>
							<tr class="biaozhun">
								<td>Standard Package</td>
								<td class="iconfont icon-duihao2"></td>
								<td class="iconfont icon-duihao2"></td>
								<td></td>
								<td class="iconfont icon-duihao2"><i>(*5 times)</i></td>
								<td></td>
								<td class="iconfont icon-duihao2"><i>(*1 articles)</i></td>
								<td class="iconfont icon-duihao2"></td>
							</tr>
							<tr class="haohua">
								<td>Deluxe Package</td>
								<td class="iconfont icon-duihao2"></td>
								<td class="iconfont icon-duihao2"></td>
								<td class="iconfont icon-duihao2"><i>(1/month<br> *1 time)</i></td>
								<td class="iconfont icon-duihao2"><i>(*8 times)</i></td>
								<td class="iconfont icon-duihao2"></td>
								<td class="iconfont icon-duihao2"><i>(*2 articles)</i></td>
								<td class="iconfont icon-duihao2"></td>
							</tr>
							<tr class="zhizun">
								<td>Premium Package</td>
								<td class="iconfont icon-duihao2"></td>
								<td class="iconfont icon-duihao2"></td>
								<td class="iconfont icon-duihao2"><i>(1/month<br>*3 times)</i></td>
								<td class="iconfont icon-duihao2"><i>(*10 times)</i></td>
								<td class="iconfont icon-duihao2"></td>
								<td class="iconfont icon-duihao2"><i>(*2 articles)</i></td>
								<td class="iconfont icon-duihao2"></td>
							</tr>
						</table>

						<p class="itip">* The products will be selected for sale by themes of events</p>
		            </div>  
				</el-tab-pane>
			</el-tabs>
		</div>

	</div>
</template>
<script>
	export default {
		layout: 'searchHome2',
		head () {
    		return {
      			title: 'Do Business With Us'
        	}
  		},
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
	.business
		.investImg
			img 
				width: 100%	
		.container 
			.ruzhu
				font-size: 36px
				font-weight: 500
				padding: 30px 0
				text-align: center
			.ruzhuYoushi
				position: relative
				padding: 0 15px
				box-sizing: border-box
				margin-bottom: 40px
				span 
					display: inline-block
				.cnen
					position: absolute
					right: 0
					top: 45px
					a 
						border: 1px solid #222
						border-radius: 8px
						@include wh(60px, 28px)
						text-align: center
						padding: 5px 20px
				.yige
					width: 360px
					margin-left: 105px
					color: #666
					line-height: 24px
					padding-right: 10px
					vertical-align: middle
					text-align: right
					display: inline-block
					padding-bottom: 18px
				.icon-shebeidiannaoshouji
					margin-right: 120px
				.quanxin 
					color: #666
					padding-left: 10px
					margin-bottom: 20px
					vertical-align: middle
				.icon-tiannei 
					margin-right: 23px
				.mac
					margin: 35px 0
					img 
						width: 22%
						display: inline-block
						vertical-align: middle
				.xinpin 
					width: 378px
					color: #666
					vertical-align: middle
					display: inline-block 
					padding: 0 10px 10px 130px
					line-height: 24px
				.iconfont 
					@include sc(35px, #fff)
					@include whch(60px, 60px, center, 60px)
					background-color: $theme_color
					border-radius: 50%
				.cuxiao 
					color: #666
					vertical-align: middle 
					padding-bottom: 10px
					width: 260px
					line-height: 24px
				.icon-cuxiao1
					margin-right: 10px
					margin-left: 20px
				.zhendui
					padding: 0 10px 10px 123px
					color: #666
					vertical-align: middle
				.icon-sale
					margin-right: 120px 
				.tuiguang
					padding: 0 10px 10px 10px
					vertical-align: middle
					color: #666
		.containerBg
			padding-bottom: 25px
			.container
				.buzhou
					overflow: hidden 
					li
						float: left 
						@include wh(285px, 180px)
						text-align: center
						border: 1px solid #dfdfdf
						margin-right: 20px
						padding: 0 20px
						span 
							text-align: center
							color: #666
						span:first-child
							display: block
							@include sc(40px, $theme_color)
							margin: 20px 0
						span:nth-child(2)
							line-height: 30px
						.youxiang
							color: #02ACCB
							line-height: 30px
					.buzhouLast
						margin-right: 0
		.itab
			.txt
				.txtP
					margin: 20px 0
					text-align: center
				p 
					line-height: 30px
					color: #666
			.txtT 
				table 
					width: 100%
					margin-bottom: 30px
					tr 
						text-align: center
						td 
							height: 32px
					tr:first-child 
						td 
							height: 52px
			.goodsTable 
				tr:nth-child(odd)
					background-color: #dcdcdc
		.itab
			.txtT
				.goodsTable 
					.titleT
						background: #969696
						td 
							color: #fff
		.joinUs
			width: 622px
			background-color: #fff 
			margin: 0 0 30px 249px
			border-radius: 8px
			overflow: hidden
			background-color: #ededed
			>div 
				float: left 
				height: 100px
			>div:first-child
				width: 160px
				line-height: 100px
				@include sc(30px, #fff)
				text-align: center
				border: 1px solid $theme_color 
				border-radius: 8px
				background-color: $theme_color
			>div:nth-child(2)
				width: 455px
				font-size: 14px
				padding: 5px 0 0 25px
				box-sizing: border-box
				background-color: #ededed
			.fanyi
				color: $theme_color
				text-decoration: underline
	.txtO 
		table
			width: 100%
		tr 
			text-align: center
			td 
				@include wh(116px, 52px)
		.trTitle 
			td 
				background-color: #969696
				color: #fff 
				font-size: 18px
		.jichu 
			td 
				background-color: #fff 
				border: 1px solid #ededed
		.biaozhun 
			td 
				background: #dcdcdc
				border: 1px solid #ededed
		.haohua 
			td 
				background-color: #fff 
				border: 1px solid #ededed
		.zhizun 
			td 
				background: #dcdcdc
				border: 1px solid #ededed
		.icon-duihao2
			font-size: 35px 
			color: $theme_color
		.icon-duihao2 
			i 
				font-size: 16px
				color: #666
				display: inline-block
				vertical-align: middle
		.itip
			margin: 15px 0 25px 0

</style>