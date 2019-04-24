<template>
	<div class="articleContent">
		<div class="bread">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
			  <el-breadcrumb-item to="/article/articleList"><a>Editor’s Pick</a></el-breadcrumb-item>
			  <el-breadcrumb-item>{{articleData.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container articleDetails">
			<div class="articlePer">
				<div class="content">
					<h3>{{articleData.title}}</h3>
					<span>{{articleData.createTime}}</span>
					<div class="text" v-html="articleData.article_content"></div>
					<div class="goods" v-for="item in articleData.itemList" :key="item.itemId">
						<div><img v-lazy="item.pic" alt=""></div>
						<div>
							<p>{{item.title}}</p>
							<div>
								<span>¥{{item.price}}</span>
								<button @click="goDetails(item.itemId)">Buy Now</button>
							</div>
						</div>						
					</div>
				</div>
			</div>
			<moreArticle :articleData="articleData.recommend" />
		</div>
	</div>
</template>
<script>
	import moreArticle from "~/components/base/moreArticle"
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	export default {
		layout: 'indexHome',
		validate ({ params }) {
		// Must be a number
			return /^\d+$/.test(params.id)
		},
		head () {
    		return {
      			title: this.articleData.title
        	}
  		},
		async asyncData ({app,params,store}) {
		 	const articleData = await app.$axios.post(interfaceApi.articleDetail,{
		 		id: params.id
		 	})
		 	
		 	// 获取分类
		 	const categoryList = await app.$axios.post(interfaceApi.categoryList,{fname: 0})
		 	store.commit('SET_CATEGORYLIST',categoryList.data.data);
  			return { 
  				articleData: articleData.data.data
  			}
		},
		data(){
            return{

	        }
        },
		components: {
			moreArticle
		},
		mounted() {

			
		},
	  	computed: {  
		    
	  	},
		methods:{
			goDetails(id) {
				this.$router.push({name: 'goods-id', params: {id: id}});
			}
        }
	}
</script>
<style lang='sass' type="text/css" scoped>
	@import '~/assets/sass/common.sass'
	.articleContent
		.bread 
			width: 100%
			background-color: #eee
			margin-bottom: 15px
			.el-breadcrumb
				@include hh(36px, 36px)
				width: 1200px
				margin: 0 auto
		.articleDetails 
			overflow: hidden
			.articlePer	
				float: left
				width: 942px
				border: $border
				border-radius: $border_radius
				padding: 25px 15px 15px 15px
				.content 
					width: 750px
					margin: 0 auto
					h3 
						font-size: 24px                                                         
						font-weight: 500
						text-align: center
					span 
						@include sc(14px, #666)
						display: block
						margin: 20px 0
						text-align: center

					.goods
						overflow: hidden
						background-color: #eee
						@include wh(750px, 120px)
						padding: 15px
						margin-top: 15px
						>div 
							float: left
						div:first-child
							@include wh(88px, 88px)
							margin-right: 15px
							img 
								@include wh(88px, 88px)
						div:last-child
							overflow: hidden
							width: 616px
							p 
								overflow: hidden
								text-overflow: ellipsis
								display: -webkit-box
								-webkit-box-orient: vertical
								-webkit-line-clamp: 2
								line-height: 22px
								height: 44px
							div
								overflow: hidden
								span
									float: left
									@include sc(16px, $theme_color)
								button
									float: right
									@include whch(180px, 40px, center, 40px)
									@include sc(16px, #fff)
									border-radius: $border_radius
									background-color: $theme_color
									margin-top: 7px
					.text
						p
							text-align: center

</style>