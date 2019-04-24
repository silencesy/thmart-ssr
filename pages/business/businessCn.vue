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
				<h2 class="ruzhu">入驻优势</h2>
				<p class="cnen"><nuxt-link to="/business/businessEn">English</nuxt-link></p>
				<div>
					<span class="yige">一个简单方便的销售模式，打开电脑或者手机随时随地查看订单发货</span>
					<span class="iconfont icon-shebeidiannaoshouji"></span>
					<span class="iconfont icon-pingtai"></span>
					<span class="quanxin">一个全新的不断发展的平台来拓宽你的生意</span>
				</div>
				<div class="mac">
					<span class="xinpin">新品首页资源位一周</span>
					<span class="iconfont icon-tiannei"></span>
					<img src="~/static/images/mac.png" alt="">
					<span class="iconfont icon-cuxiao1"></span>
					<span class="cuxiao">新品促销资源位一周</span>
				</div>
				<div>
					<span class="zhendui">针对你的产品制定的营销促销</span>
					<span class="iconfont icon-sale"></span>
					<span class="iconfont icon-gongzhonghao"></span>
					<span class="tuiguang">微信公众号资源推广</span>
				</div>
			</div>
		</div>
		<div class="containerBg">
			<div class="container">
				<div class="ruzhuLiucheng">
					<h2 class="ruzhu">入驻流程</h2>
					<div class="buzhou clearfix">
						<li>
							<span class="iconfont icon-shuziyi"></span>
							<span>如您有意向，请联系我们</span>
							<a href="mailto:thmart@urbanatomy.com" class="youxiang">thmart@urbanatomy.com</a>
						</li>
						<li>
							<span class="iconfont icon-2"></span>
							<span>当您提交资料后，请耐心<br>等待 <i>3</i>   个工作日左右</span>
						</li>
						<li>
							<span class="iconfont icon-shuzisan"></span>
							<span>商品详情页制作</span>
						</li>
						<li class="buzhouLast">
							<span class="iconfont icon-shuzisi"></span>
							<span>产品上架销售</span>
						</li>												
					</div>
				</div>
			</div>
		</div>
		<div class="container itab">
			<el-tabs type="border-card">
				<el-tab-pane label="精选商品">
		            <div class="txt txtT">
		            	<div class="txtP">
		            		<p>thMart商城是一个面向所有在华外籍人士的全新生活平台。在这里，用户不仅可以体验我们便捷多样的英文线上购物服务，也可随时随地获得城中最新的吃喝玩乐咨询。</p>
		            		<p>thMart商城致力于为在华外籍人士提供各类精选自世界各地的优质商品以及一流的生活类服务。</p>
		            		<p>我们需要您优质的商品。让我们携手开拓这一广大的高端市场！</p>
		            		<p>无需担心语言问题，我们提供有偿的商品上架翻译，详情制作等服务。我们亦会根据不同的商品分类收取一定的佣金（最终成交金额的固定扣点）。</p>
		            		<p>新品上架，您将获得微信推广，首页Banner，促销位等优势资源。</p>
		            	</div>
						<table class="goodsTable">
							<tr class="titleT">
								<td>商品分类</td>
							</tr>
							<tr>
								<td>售票</td>
							</tr>
							<tr>
								<td>鲜花</td>
							</tr>
							<tr>
								<td>玩具</td>
							</tr>
							<tr>
								<td>家电</td>
							</tr>
							<tr>
								<td>居家日用</td>
							</tr>
							<tr>
								<td>母婴</td>
							</tr>
							<tr>
								<td>酒水</td>
							</tr>
							<tr>
								<td>家庭清洁/纸品</td>
							</tr>
							<tr>
								<td>办公用品</td>
							</tr>
							<tr>
								<td>服饰，流行百货</td>
							</tr>
							<tr>
								<td>美妆个护</td>
							</tr>
							<tr>
								<td>宠物用品</td>
							</tr>
							<tr>
								<td>汽车用品</td>
							</tr>
							<tr>
								<td>钟表</td>
							</tr>
							<tr>
								<td>运动</td>
							</tr>
							<tr>
								<td>优惠券</td>
							</tr>
							<tr>
								<td>食品饮料</td>
							</tr>
							<tr>
								<td>图书</td>
							</tr>
							<tr>
								<td>珠宝首饰</td>
							</tr>
							<tr>
								<td>乐器</td>
							</tr>
						</table>
						<div class="join clearfix">
							<div class="joinUs clearfix">
								<div>JOIN US</div>
								<div>
									<p>1.所有商品必须以英文形式展现，如需要翻译制作，请<nuxt-link to="/business/costCn" class="fanyi">点击此处</nuxt-link> </p>
									<p>2.平台会在最终销售额中抽取佣金；</p>
									<p>3.部分分类需要交纳保证金。</p>
								</div>
							</div>
						</div>
		            </div> 
				</el-tab-pane>
				<el-tab-pane label="个性化商店">
		            <div class="txt txtO">
		            	<div class="txtP">
							<p>想拓宽店铺的销路?对于商家来说，个性化商店是您的不二之选!根据我们提供的操作手册，商家可以对自己的店铺进行装饰和美化。</p>
							<p>所有商铺将以套餐形式进行售卖。根据套餐价位的不同，我们将为商家提供不同形式的推广宣传。详情请参考如下图表。</p>
						</div>
						<table>
							<tr class="trTitle">
								<td></td>
								<td>特色商铺</td>
								<td>线下摊位</td>
								<td>广告栏推广</td>
								<td>微信推广</td>
								<td>多平台推广</td>
								<td>编辑精选</td>
								<td>商铺装饰</td>
							</tr>
							<tr class="jichu">
								<td>基础套餐</td>
								<td class="iconfont icon-duihao2"></td>
								<td class="iconfont icon-duihao2"></td>
								<td></td>
								<td class="iconfont icon-duihao2"><i>(*2次)</i></td>
								<td></td>
								<td class="iconfont icon-duihao2"><i>(*1篇)</i></td>
								<td class="iconfont icon-duihao2"></td>
							</tr>
							<tr class="biaozhun">
								<td>标准套餐</td>
								<td class="iconfont icon-duihao2"></td>
								<td class="iconfont icon-duihao2"></td>
								<td></td>
								<td class="iconfont icon-duihao2"><i>(*5次)</i></td>
								<td></td>
								<td class="iconfont icon-duihao2"><i>(*1篇)</i></td>
								<td class="iconfont icon-duihao2"></td>
							</tr>
							<tr class="haohua">
								<td>豪华套餐</td>
								<td class="iconfont icon-duihao2"></td>
								<td class="iconfont icon-duihao2"></td>
								<td class="iconfont icon-duihao2"><i>(1/月*1次)</i></td>
								<td class="iconfont icon-duihao2"><i>(*8次)</i></td>
								<td class="iconfont icon-duihao2"></td>
								<td class="iconfont icon-duihao2"><i>(*2篇)</i></td>
								<td class="iconfont icon-duihao2"></td>
							</tr>
							<tr class="zhizun">
								<td>至尊套餐</td>
								<td class="iconfont icon-duihao2"></td>
								<td class="iconfont icon-duihao2"></td>
								<td class="iconfont icon-duihao2"><i>(1/月*3次)</i></td>
								<td class="iconfont icon-duihao2"><i>(*10次)</i></td>
								<td class="iconfont icon-duihao2"></td>
								<td class="iconfont icon-duihao2"><i>(*2篇)</i></td>
								<td class="iconfont icon-duihao2"></td>
							</tr>
						</table>

						<p class="itip">* 将按照活动主题挑选相关产品进行售卖</p>
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
					width: 310px
					margin-left: 150px
					color: #666
					line-height: 24px
					padding-right: 10px
					vertical-align: middle
					text-align: right
				.icon-shebeidiannaoshouji
					margin-right: 120px
				.quanxin 
					color: #666
					padding-left: 10px
					margin-bottom: 20px
					vertical-align: middle
				.icon-tiannei 
					margin-right: 105px
				.mac
					margin: 35px 0
					img 
						width: 22%
						display: inline-block
						vertical-align: middle
				.xinpin 
					color: #666
					vertical-align: middle 
					padding: 0 10px 0 130px
				.iconfont 
					@include sc(35px, #fff)
					@include whch(60px, 60px, center, 60px)
					background-color: $theme_color
					border-radius: 50%
				.cuxiao 
					color: #666
					vertical-align: middle 
					padding-bottom: 10px
				.icon-cuxiao1
					margin-right: 10px
					margin-left: 100px
				.zhendui
					padding: 0 10px 10px 242px
					color: #666
					vertical-align: middle
				.icon-sale
					margin-right: 120px 
				.tuiguang
					padding: 0 10px 0 10px
					vertical-align: middle
					color: #666
		.containerBg
			padding-bottom: 25px
			.container
				.buzhou
					overflow: hidden 
					li
						float: left 
						@include wh(288px, 160px)
						text-align: center
						border: 1px solid #dfdfdf
						margin-right: 16px
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