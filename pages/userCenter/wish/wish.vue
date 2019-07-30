<template>
	<div class="wishList">
		<div class="container">
			<userLayout active="Wishlist">
				<div class="wish" slot="userContent">
					<div class="title">Wishlist</div>
					<div>
					  	<!-- <el-tabs v-model="activeName" @tab-click="handleClick"> -->
					  	<el-tabs v-model="activeName">
						    <el-tab-pane label="Goods" name="goods" class="section">
								<div style="overflow: hidden">
									<div class="box" v-if="goodList.data.length>0" v-for="item in goodList.data" :key="item.id">
										<nuxt-link  :to="{name: 'goods-id', params: {id: item.id}}">
											<div><img v-lazy="item.pic" alt=""></div>
											<p>{{item.title}}</p>
											<div class="bottom">
												<span>¥ {{item.price}}</span>
												<i class="iconfont icon-review"></i>
											</div>
										</nuxt-link>
									</div>
								</div>
								<!-- 没有收藏的情况 -->
								<div class="noWishlist" v-if="goodList.data.length==0"><p>No more wishlist</p></div>
								<div class="changePage" v-if="goodList.totalPage!=0">
									<el-pagination
									  	background
									  	layout="prev, pager, next"
									  	:current-page.sync="currentPage"
										@size-change="handleSizeChange"
					      				@current-change="handleCurrentChange"
									  	:total="goodList.totalPage * 10">
									</el-pagination>
								</div>
						    </el-tab-pane>
						    <el-tab-pane label="Shops" name="shops" class="section">
								<div style="overflow: hidden">
									<div class="box" v-if="shopList.data.length>0" v-for="item in shopList.data" :key="item.contentId">
										<a @click="goShop(item.contentId)">
											<div><img v-lazy="item.pic" alt=""></div>
											<p>{{item.name}}</p>
											<div class="bottom bottomStar">
												<i class="iconfont icon-review"></i>
											</div>
										</a>
									</div>
								</div>
								<!-- 没有收藏的情况 -->
								<div class="noWishlist" v-if="shopList.data.length == 0"><p>No more wishlist</p></div>
								<div class="changePage" v-if="shopList.totalPage!=0">
									<el-pagination
									  	background
									  	layout="prev, pager, next"
									  	:current-page.sync="currentPage2"
										@size-change="handleSizeChange2"
					      				@current-change="handleCurrentChange2"
									  	:total="shopList.totalPage * 10">
									</el-pagination>
								</div>
						    </el-tab-pane>
					  	</el-tabs>
					</div>
				</div>
			</userLayout>
			<goodsItem :titleIsShow="titleIsShow" :hotData='hotData' />
		</div>
	</div>
</template>
<script>
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	import goodsItem from "~/components/base/goodsItem"
	import userLayout from "~/components/user/userLayout"
	export default {
		layout: 'userHome',
		head () {
    		return {
      			title: 'WishList'
        	}
  		},
		data() {
			return {
				titleIsShow: true,
				activeName: 'goods',
				currentPage: 1,
				currentPage2: 1
			}
		},
		middleware: 'userAuth',
		async asyncData ({app}) {
			var param1 = {
				type: 1,
				page: 1,
				pageSize: 10
			};
			var param2 = {
				type: 2,
				page: 1,
				pageSize: 10
			}
		 	const hotData = await app.$axios.post(interfaceApi.itemWehotproduct);
		 	const goodList = await app.$axios.post(interfaceApi.collectList,param1);
		 	const shopList = await app.$axios.post(interfaceApi.collectList,param2);
  			return { 
  				goodList: goodList.data.data,
  				shopList: shopList.data.data,
  				hotData: hotData.data.data.data
  			}
		},
		components: {
			goodsItem, 
			userLayout
		},
		mounted() {

			
		},
	  	computed: {  
		    
	  	},
		methods: {
			// 获取数据商品
			getData(val) {
				var that = this;
				const param = {
					page: val,
					pageSize: 10,
					type: 1
				}
				that.$axios.post(interfaceApi.collectList,param).then(res=> {
					that.goodList = res.data.data;
				})
			},
			// 获取数据商户
			getData2(val) {
				var that = this;
				const param = {
					page: val,
					pageSize: 10,
					type: 2
				}
				that.$axios.post(interfaceApi.collectList,param).then(res=> {
					that.shopList = res.data.data;
				})
			},
			// 回到顶部
			goBackTop() {
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			},
			// 改变页数
			handleSizeChange(val) {
		        this.getData(val);
		    },
		    // 上下页
		    handleCurrentChange(val) {
		        this.goBackTop();
		        this.getData(val);
		    },
		    // 改变页数
			handleSizeChange2(val) {
		        this.getData(val);
		    },
		    // 上下页
		    handleCurrentChange2(val) {
		        this.goBackTop();
		        this.getData2(val);
		    },
		    goShop(id) {
		    	if (id == 32) {
		    		let routeData = this.$router.resolve('/shop/peaceHotel');
					window.open(routeData.href, '_blank');
		    		this.$router.push('/shop/peaceHotel');
		    	} else {
		    		let routeData = this.$router.resolve({name: 'shop-id',params: {id: id}});
					window.open(routeData.href, '_blank');
		    	}
		    }
		}
	}
</script>

<style lang='sass' scoped>
@import '~/assets/sass/common.sass'
.wishList
	.container
		.wish
			.title
				padding-bottom: 13px 
				border-bottom: $border
			.section
				.box	 				
					border: $border
					@include wh(182px, 253px)
					float: left
					margin-right: 14px
					margin-bottom: 15px
					>a  
						cursor: pointer
						display: inline-block
						padding: 15px
						@include wh(100%, 100%)
						>div 
							img 
								@include wh(150px, 150px)
						p 
							overflow: hidden
							text-overflow: ellipsis
							display: -webkit-box
							-webkit-box-orient: vertical
							-webkit-line-clamp: 2
							line-height: 22px 
							height: 44px
							text-align: center
						.bottom
							padding-top: 5px 
							overflow: hidden
							span 
								float: left
							i 
								float: right
								color: $theme_color
						.bottomStar.bottom
							text-align: center
							i 
								float: initial
			.section 
				overflow: hidden
				margin-right: -14px	
.noWishlist
	position: relative
	height: 330px
	p 
		@include center
		color: #999

</style>
