<template>
	<div class="business">
		<div class="investImg">
			<img src="~/static/images/zhaoshang.jpg" alt="">
		</div>
		<div class="container">
			<div class="zifei">
				<h2 class="ruzhu">Service Price List</h2>
				<table class="zifeiTab">
					<tr class="zifeiTitle">
						<td>Project</td>
						<td>Instruction</td>
						<td>Price</td>
						<td class="dazhe">10% discount (3-5 commodities)</td>
						<td class="dazhe">30% discount (5-10 commodities)</td>
						<td class="dazhe">50% discount (10-20 commodities)</td>
					</tr>
					<tr class="costDetail">
						<td>Product photography</td>
						<td>800*800px pictures over a white background (Three items per transaction.)</td>
						<td>50</td>
						<td>45</td>
						<td>35</td>
						<td>25</td>
					</tr>
					<tr class="costDetail">
						<td>Simple product description & translation</td>
						<td><span>50 words and simple typesetting</span> <nuxt-link to="/business/caseFirstEn">Example</nuxt-link></td>
						<td>200</td>
						<td>180</td>
						<td>140</td>
						<td>100</td>
					</tr>
					<tr class="costDetail">
						<td>Detailed page design</td>
						<td><span>Design and modify content-rich detail pages with English translation included</span><nuxt-link to="/business/caseSecondEn">Example</nuxt-link></td>
						<td>350</td>
						<td>315</td>
						<td>245</td>
						<td>175</td>
					</tr>
					<tr class="costDetail">
						<td>Professional translation</td>
						<td><span>Product introduction of up to 200 words</span><nuxt-link to="/business/caseSecondEn">Example</nuxt-link></td>
						<td>200</td>
						<td>180</td>
						<td>140</td>
						<td>100</td>
					</tr>
					<tr class="costDetail">
						<td>Professional translation & Detailed page design</td>
						<td><span>Product introduction of up 200 words and detail page design</span><nuxt-link to="/business/caseSecondEn">Example</nuxt-link></td>
						<td>500</td>
						<td>450</td>
						<td>350</td>
						<td>250</td>
					</tr>
					<tr class="costDetail">
						<td>Professional translation & detailed Page design</td>
						<td><span>Product introduction of up to 200 words and detail page design</span><nuxt-link to="/business/caseThirdEn">Example</nuxt-link></td>
						<td>600</td>
						<td>540</td>
						<td>420</td>
						<td>300</td>
					</tr>
				</table>
				<div class="zifeiTip">
					<p>1.We provide invoices (fapiao) for a 3% service charge</p>
					<p>2.One kind of product with different colors can be counted as one commodity</p>
					<p>3.A sliding discount is offered on new commodities according to the quantity</p>
					<p>4.All images and copy become the intellectual property of the vendor upon payment to thMart</p>
				</div>
				<div class="costBack">
					<nuxt-link to="/business/BusinessEn">Back</nuxt-link>
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
						display: inline-block
						padding-top: 15px
					a.aPadding 
						padding-top: 24px
					a.aPadd 
						padding-top: 35px
					span 
						display: inline-block
						width: 152px
			.aPadding
				padding-top: 12px

</style>