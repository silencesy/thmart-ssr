<template>
	<div class="search">
		<div class="container goodsListBox">
			<div class="goodsList">
				<div class="searchNav tabBox">
					<el-tabs v-model="activeName" @tab-click="handleClick">
						<!-- 搜索商品 -->
					    <el-tab-pane label="All Categories" name="categories">
							<div class="item"  v-if="searchGoodsData.data.length > 0">
								<rank @Sort = "Sort" />
							</div>
							<goodsItem :styleObj="goodsItemStyleObj" :hotData="searchGoodsData.data" />
							<div class="changePage" v-if="searchGoodsData.data.length > 0">
								<el-pagination
								  	background
								  	layout="prev, pager, next"
								  	:current-page.sync="currentPage"
								  	@size-change="handleSizeChange"
      								@current-change="handleCurrentChange"
								  	:total="searchGoodsData.totalPage * 10">
								</el-pagination>
							</div>
					    </el-tab-pane>
					    <!-- 搜索商户 -->
					    <el-tab-pane label="Shops" name="shops">
					    	<div class="searchShop" v-if="!searchShopData.data.length == 0">
					    		<div class="shopList" v-for="item in searchShopData.data" :key="item.id">
					    			<div>
					    				<p><img v-lazy="item.pic" alt=""></p>
					    				<span v-text="item.title"></span>
					    			</div>
					    			<div>
					    				<a>
					    					<button @click="goShop(item.id)">Enter</button>
					    				</a>
					    			</div>
					    		</div>
					    		<!-- <div class="no-result" v-if="searchShopData.data.length == 0">No result</div> -->
					    	</div>
					    	<div class="no-result" v-if="searchShopData.data.length == 0">No result</div>
							<!-- <div class="item">
								<rank />
							</div> -->
							<!-- <goodsItem :goodsItemStyleObj="goodsItemStyleObj" /> -->
							<div class="changePage" v-if="searchShopData.data.length > 0">
								<el-pagination
								  	background
								  	layout="prev, pager, next"
								  	:current-page.sync="currentPage2"
								  	@size-change="handleSizeChange2"
      								@current-change="handleCurrentChange2"
								  	:total="searchShopData.totalPage * 10">
								</el-pagination>
							</div>
					    </el-tab-pane>
					    <!-- 搜索文章 -->
					    <el-tab-pane label="Editor’s Pick" name="article">
							<!-- <div class="item">
								<rank />
							</div> -->
							<articleItem :articleData="searchArticleData.data" />
							<div class="changePage" v-if="searchArticleData.data.length > 0">
								<el-pagination
								  	background
								  	layout="prev, pager, next"
								  	:current-page.sync="currentPage3"
								  	@size-change="handleSizeChange3"
      								@current-change="handleCurrentChange3"
								  	:total="searchArticleData.totalPage * 10">
								</el-pagination>
							</div>
					    </el-tab-pane>
					</el-tabs>
				</div>
			</div>
			<moreGoods v-if="activeName == 'categories'" :featuredGoods="searchGoodsData.recommend"/>
			<moreGoods v-if="activeName == 'shops'" :featuredGoods="searchShopData.recommend"/>
			<moreGoods v-if="activeName == 'article'" :featuredGoods="searchArticleData.recommend"/>
		</div>
	</div>
</template>
<script>
	import moreGoods from "~/components/base/moreGoods"
	import rank from "~/components/base/rank"
	import goodsItem from "~/components/base/goodsItem"
	import articleItem from "~/components/base/articleItem"
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	export default {
		layout: 'searchHome',
		data() {
			return {
				activeName: 'categories',
				goodsItemStyleObj: {
					width: '178.5px',
					height: '275px',
					container: false
				},	
				searchGoodsData: {
					data: [],
					totalPage: 0
				},
				searchShopData: {
					data: [],
					totalPage: 0
				},
				searchArticleData: {
					data: [],
					totalPage: 0
				},
				// 商品参数
				currentPage: 1,
				param: {
					id: 0,
					page: 1,
					pageSize: 30,
					sort: 'createTime_desc',
					search: this.$route.query.searchInfo
				},
				// 商户参数
				currentPage2: 1,
				param2: {
					id: 5,
					page: 1,
					pageSize: 16,
					sort: 'order_asc',
					search: this.$route.query.searchInfo
				},
				// 文章参数
				currentPage3: 1,
				param3: {
					page: 1,
					pageSize: 22,
					sort: 'createTime_desc',
					search: this.$route.query.searchInfo
				}
			}
		},
		async asyncData ({app,query}) {
			console.log(123);
			// 判断搜索分类
			if (query.classification == 'categories') {
				let param = {
					id: 0,
					page: 1,
					pageSize: 30,
					sort: 'createTime_desc',
					search: query.searchInfo
				}
			 	const searchGoodsData = await app.$axios.post(interfaceApi.goodsList,param)
	  			return { searchGoodsData: searchGoodsData.data.data}
			} else if (query.classification == 'shops') {
				let param = {
					id: 5,
					page: 1,
					pageSize: 16,
					sort: 'order_asc',
					search: query.searchInfo
				}
			 	const searchShopData = await app.$axios.post(interfaceApi.adsList,param)
	  			return { searchShopData: searchShopData.data.data}
			} else if (query.classification == 'article') {
				let param = {
					page: 1,
					pageSize: 22,
					sort: 'createTime_desc',
					search: query.searchInfo
				}
			 	const searchArticleData = await app.$axios.post(interfaceApi.articleList,param)
	  			return { searchArticleData: searchArticleData.data.data}
			}
			
		},
		components: {
			moreGoods,
			rank,
			goodsItem,
			articleItem
		},
		created() {
			// 设置搜索文字
			this.$store.commit('SET_SEARCH',this.$route.query.searchInfo) || '';
			// 设置搜索分类
			this.$store.commit('SET_CLASSIFICATION',this.$route.query.classification) || 'categories';
			
		},
		mounted() {
			this.setClassActive();
			window.addEventListener("popstate", function(e) {
				window.location.reload();
			}, false);
		},
	  	computed: {  
		    
	  	},
		methods: {
			goShop(id) {
		    	if (id == 32) {
		    		let routeData = this.$router.resolve('/shop/peaceHotel');
						window.open(routeData.href, '_blank');
		    	} else if (id == 103) {
						let routeData = this.$router.resolve('/shop/amaraHotel');
						window.open(routeData.href, '_blank');
					}  else {
		    		let routeData = this.$router.resolve({name: 'shop-id',params: {id: id}});
					window.open(routeData.href, '_blank');
		    	}
		    },
			// 设置当前分类高亮和显示
			setClassActive() {
				this.activeName = this.$route.query.classification;
			},
			// 搜索切换
			handleClick(tab, event) {
				// console.log(this.activeName)
				// console.log(this.$store.state.searchText)
				this.$router.push({path: '/searchModeule/search',query: {searchInfo: this.$store.state.searchText,classification: this.activeName}})
				if (this.activeName == 'shops') {
					this.getShopData();
				} else if (this.activeName == 'article') {
					this.getAticleData();
				} else if (this.activeName == 'categories') {
					this.getData();
				}
	   			this.$store.commit('SET_CLASSIFICATION',this.activeName);
	      	},

	      	/**
	      	 * 商品部分
	      	 */
	      	// 初始参数
			initParam() {
				this.param.page = 1;
				this.currentPage = 1;
			},
			// 改变排序
			changeSortParam(sort) {
				this.param.sort = sort;
			},
			// 改变页数
			changePageParam(page) {
				this.param.page = page;
			},
			// 回到顶部
			goBackTop() {
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			},
			// 排序方式
			Sort(index) {
				// console.log(index);
				var that = this;
				that.goBackTop();
				that.initParam();
				that.changeSortParam(index);
				that.getData();
			},
			// 获取商品数据
			getData() {
				var that = this;
				that.$axios.post(interfaceApi.goodsList,that.param).then(res=> {
					console.log(res);
					that.searchGoodsData = res.data.data;
				})
			},
			// 改变页数
			handleSizeChange(val) {
		        this.param.page = val;
		        this.getData();
		    },
		    // 上下页
		    handleCurrentChange(val) {
		        this.param.page = val;
		        this.goBackTop();
		        this.getData();
		    },

		    /**
		     * 商户部分
		     */
		    // 获取商户数据
		    getShopData() {
		    	var that = this;
				that.$axios.post(interfaceApi.adsList,that.param2).then(res=> {
					console.log(res.data.data);
					that.searchShopData = res.data.data;
				})
		    },
		    // 改变页数
			handleSizeChange2(val) {
		        this.param2.page = val;
		        this.goBackTop();
		        this.getShopData();
		    },
		    // 上下页
		    handleCurrentChange2(val) {
		        this.param2.page = val;
		        this.goBackTop();
		        this.getShopData();
		    },
		    /**
		     * 文章
		     */
		    // 获取文章数据
		    getAticleData() {
		    	var that = this;
				that.$axios.post(interfaceApi.articleList,that.param3).then(res=> {
					console.log(res.data.data);
					that.searchArticleData = res.data.data;
				})
		    },
		     // 改变页数
			handleSizeChange3(val) {
		        this.param3.page = val;
		        this.goBackTop();
		        this.getAticleData();
		    },
		    // 上下页
		    handleCurrentChange3(val) {
		        this.param3.page = val;
		        this.goBackTop();
		        this.getAticleData();
		    },
		}
	}
</script>

<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'
	.search
		.goodsListBox 
			overflow: hidden
			.goodsList
				float: left
				width: 942px
	.searchShop
		border: $border
		border-radius: $border_radius
		margin-bottom: 15px
		width: 942px
		padding: 15px
		overflow: hidden
		.shopList
			overflow: hidden
			background-color: #eee 
			padding: 15px
			margin-bottom: 15px
			>div:first-child
				float: left
				p 
					@include wh(60px, 60px)	
					display: inline-block
					img
						@include wh(60px, 60px)
				span
					padding-left: 20px
					display: inline-block 
					vertical-align: top 
					margin-top: 25px
			>div:nth-child(2)
				float: right
				margin-top: 20px
				button
					@include whch(100px, 30px, center, 30px)
					@include sc(16px, #fff)
					background-color: $theme_color
					border-radius: $border_radius
		.shopList:last-child
			margin-bottom: 0
		.no-result
			text-align: center
			padding: 20px
			background-color: #eee
			color: #666
</style>