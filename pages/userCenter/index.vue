<template>
	<div class="review">
		<div class="bread">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item to="/">User Center</el-breadcrumb-item>
			  <el-breadcrumb-item>Orders</el-breadcrumb-item>
			  <el-breadcrumb-item>Review</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="box">
				<div class="addReview">
					<div class="goods">
						<div>
							<div><img src="http://api.mall.thatsmags.com/Public/ckfinder/images/flower/LoveinParis.jpg" alt=""></div>
							<div class="goodsInfo">
								<p>Midea Air Fryer, Oil Free Design, Model: TN20A</p>
								<p>Color: Black</p>
								<span>¥ 14999</span>
							</div>
						</div>
					</div>
					<div class="content">
						<div class="contentBox">
							<span>Review :</span>
							<textarea name="" id="" placeholder="Enter comments here, maximum 500 words"></textarea>
						</div>
						<div class="addPhoto">
							+
						</div>
					</div>
				</div>
				<div class="addReview">
					<div class="goods">
						<div>
							<div><img src="http://api.mall.thatsmags.com/Public/ckfinder/images/flower/MissMolly/MadamaButterfly/11.jpg" alt=""></div>
							<div class="goodsInfo">
								<p>Midea Air Fryer, Oil Free Design, Model: TN20A</p>
								<p>Color: Black</p>
								<span>¥ 14999</span>
							</div>
						</div>
					</div>
					<div class="content">
						<div class="contentBox">
							<span>Review :</span>
							<textarea name="" id="" placeholder="Enter comments here, maximum 500 words"></textarea>
						</div>
						<div class="addPhoto">
							+
						</div>
					</div>
				</div>
				<div class="reviewSubmit">
					<div class="btn">Submit</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import userLayout from "~/components/user/userLayout"

	export default {
		layout: 'userHome',
		head () {
    		return {
      			title: 'Review'
        	}
  		},
		data() {
			return {
				
			}
		},
		components: {
			userLayout
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
.review 
	.bread
		width: 100%
		background-color: #eee
		margin-bottom: 15px
		.el-breadcrumb
			@include hh(36px, 36px)
			width: 1200px
			margin: 0 auto
	.container
		.box 
			.addReview
				padding-bottom: 20px
				margin-bottom: 22px
				border-bottom: 1px solid #dfdfdf
				overflow: hidden
				.goods 
					width: 454px
					float: left
					border-right: 1px solid #dfdfdf
					text-align: center
					> div 
						width: 253px
						margin: 0 auto
					img 
						@include wh(130px, 130px)
					.goodsInfo
						p:first-child
							overflow: hidden
							text-overflow: ellipsis
							display: -webkit-box
							-webkit-box-orient: vertical
							-webkit-line-clamp: 2
							height: 36px
						p:nth-child(2)
							font-size: 14px
							color: #666
							padding: 8px 0
						span
							color: #F9421E
				.content 
					float: left
					.contentBox
						padding-left: 30px
						padding-bottom: 14px
						> span 
							color: #666
						textarea
							@include wh(614px, 167px)
							margin-left: 39px
							padding: 10px
							vertical-align: top
					.addPhoto
						padding-left: 130px
			.reviewSubmit
				width: 200px
				margin: 0 auto
				padding: 22px 0
				.btn
					@include whch(200px, 36px, center, 36px)
					background: #F9421E
					border-radius: 4px
					color: #fff
					cursor: pointer

</style>
