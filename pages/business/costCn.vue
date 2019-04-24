<template>
	<div class="business">
		<div class="investImg">
			<img src="~/static/images/zhaoshang.jpg" alt="">
		</div>
		<div class="container">
			<div class="zifei">
				<h2 class="ruzhu">资费</h2>
				<table class="zifeiTab">
					<tr class="zifeiTitle">
						<td>项目</td>
						<td>说明</td>
						<td>费用(元)</td>
						<td class="dazhe">九折(3-5个商品)</td>
						<td class="dazhe">七折(5-10个商品)</td>
						<td class="dazhe">五折(10-30个商品)</td>
					</tr>
					<tr class="costDetail">
						<td>产品拍摄</td>
						<td>拍摄800*800白底的产品图，<br>超过3个规格算另一个商品</td>
						<td>50</td>
						<td>45</td>
						<td>35</td>
						<td>25</td>
					</tr>
					<tr class="costDetail">
						<td>简单制作+简单翻译</td>
						<td>50字内翻译+简单排版 <nuxt-link to="/business/caseFirstCn">案例</nuxt-link></td>
						<td>200</td>
						<td>180</td>
						<td>140</td>
						<td>100</td>
					</tr>
					<tr class="costDetail">
						<td>详情制作</td>
						<td><span>设计，修改丰富内容的详情页，具有英语翻译</span><nuxt-link to="/business/caseSecondCn">案例</nuxt-link></td>
						<td>350</td>
						<td>315</td>
						<td>245</td>
						<td>175</td>
					</tr>
					<tr class="costDetail">
						<td>资深翻译</td>
						<td>翻译200字内的产品介绍<nuxt-link to="/business/caseSecondCn">案例</nuxt-link></td>
						<td>200</td>
						<td>180</td>
						<td>140</td>
						<td>100</td>
					</tr>
					<tr class="costDetail">
						<td>资深翻译+设计详情页</td>
						<td><span>翻译200字内的产品介绍+详情页制作</span><nuxt-link to="/business/caseSecondCn">案例</nuxt-link></td>
						<td>500</td>
						<td>450</td>
						<td>350</td>
						<td>250</td>
					</tr>
					<tr class="costDetail">
						<td>资深翻译+高级设计详情页</td>
						<td><span>翻译200字内的产品介绍+长篇详情页制作</span><nuxt-link to="/business/caseThirdCn">案例</nuxt-link></td>
						<td>600</td>
						<td>540</td>
						<td>420</td>
						<td>300</td>
					</tr>
				</table>
				<div class="zifeiTip">
					<p>1.提供3%服务费发票；</p>
					<p>2.一款商品不同颜色详情页可算算一个商品收费；</p>
					<p>3.新商品根据数量可以有对应折扣；</p>
					<p>4.费用一次性收取，制作详情原稿可给客户。</p>
				</div>
				<div class="costBack">
					<nuxt-link to="/business/BusinessCn">返回合作招商页</nuxt-link>
				</div>
			</div>			
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
			table
				width: 100%
			.zifeiTab 
				tr 
					td 
						text-align: center
						border: 1px solid #c7c7c7
					td:nth-child(1)
						width: 250px
					td:nth-child(2)
						width: 270px
					td:nth-child(3)
						width: 210px
			.zifeiTitle 
				td 
					height: 40px
					background-color: #dfdfdf
			.zifeiTip
				margin: 15px 0 25px 0
				p 
					color: #666
					line-height: 24px
					font-size: 14px
			.costBack
				text-align: center
				margin-bottom: 45px 
				a 
					@include whh(160px, 36px, 36px)
					color: #fff 
					display: inline-block
					font-weight: 500
					border-radius: 8px
					background-color: $theme_color
			.costDetail 
				td 
					height: 70px
					line-height: 24px
					@include sc(14px, #666)
				td:nth-of-type(2)
					text-align: left
					padding: 0 20px
					box-sizing: border-box
					a 
						color: $theme_color
						text-decoration: underline
						float: right
						padding-left: 20px
					span 
						display: inline-block
						width: 152px
			.aPadding
				padding-top: 12px

</style>