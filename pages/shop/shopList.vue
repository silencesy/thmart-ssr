<template>
	<div class="shopList">
		<div class="container shopListBox">
			<div class="box">
				<div class="featured">
					<div class="title">Featured Shops</div>
					<div class="shops">
						<div :class="{height: !showShop}">
							<a v-for="item in shopListData.data" :key="item.id"><img v-lazy="item.pic" @click="goShop(item.id)" alt=""></a>
						</div>
						<p v-if="shopListData.data.length > 6"><span v-if="!showShop" @click="more">More</span></p>
					</div>
				</div>
				<rank :isShowObj="isShowObj" />
				<div class="normalShop">
					<div>
						<a v-for="item in shopListData2.data" :key="item.id"><img v-lazy="item.pic" @click="goShop(item.id)" alt=""></a>
					</div>
				</div>
				<div class="changePage">
					<el-pagination
					  	background
					  	layout="prev, pager, next"
					  	:current-page.sync="currentPage"
						@size-change="handleSizeChange"
	      				@current-change="handleCurrentChange"
					  	:total="shopListData2.totalPage * 10">
					</el-pagination>
				</div>
			</div>
			<moreGoods :featuredGoods="shopListData.recommend"/>
		</div>
	</div>
</template>
<script>
	import moreGoods from "~/components/base/moreGoods"
	import rank from "~/components/base/rank"
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	export default {
		layout: 'indexHome',
		head () {
    		return {
      			title: 'Shops'
        	}
  		},
		data() {
			return {
				isShowObj: {
                    priceIsShow: false,
                    saleIsShow: false,
                    rankSearchIsShow: true
				},
				currentPage: 1,
				param2: {
					page: 1,
					pageSize: 54
				},
				showShop: false
			}
		},
		async asyncData ({app,params,store}) {
			const param = {
				id: 5,
				page: 1,
				pageSize: 10000,
				sort: 'order_asc'
			}
			const param2 = {
				page: 1,
				pageSize: 54
			}
		 	const shopListData = await app.$axios.post(interfaceApi.adsList,param);
		 	const shopListData2 = await app.$axios.post(interfaceApi.brandList,param2);
		 	// 获取分类
		 	const categoryList = await app.$axios.post(interfaceApi.categoryList,{fname: 0})
		 	store.commit('SET_CATEGORYLIST',categoryList.data.data);
  			return {
  				shopListData: shopListData.data.data,
  				shopListData2: shopListData2.data.data
  			}
		},
		components: {
			moreGoods,
			rank
		},
		mounted() {

			
		},
	  	computed: {  
		    
	  	},
		methods: {
			// 获取数据
			getData() {
				var that = this;
				that.$axios.post(interfaceApi.brandList,that.param2).then(res=> {
					that.shopListData2 = res.data.data;
				})
			},
			// 回到顶部
			goBackTop() {
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			},
			// 改变页数
			handleSizeChange(val) {
		        this.param2.page = val;
		        this.getData();
		    },
		    // 上下页
		    handleCurrentChange(val) {
		        this.param2.page = val;
		        this.goBackTop();
		        this.getData();
		    },
		    more() {
		    	this.showShop = true;
		    },
		    goShop(id) {
		    	if (id == 32) {
		    		let routeData = this.$router.resolve('/shop/peaceHotel');
					window.open(routeData.href, '_blank');
		    	} else if (id == 103) {
					let routeData = this.$router.resolve('/shop/amaraHotel');
					window.open(routeData.href, '_blank');
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
	.height
		height: 176px
	.shopList 
		.shopListBox 
			margin-top: 15px
			overflow: hidden
			.box
				float: left
				width: 944px
				.featured
					width: 944px
					border: $border
					margin-bottom: 15px
					.title 
						background-color: #eee 
						@include whch(942px, 35px, center, 35px)
					.shops 
						overflow: hidden
						padding: 15px 0 15px 15px
						>div
							overflow: hidden
							a
								cursor: pointer
								@include wh(172px, 172px)
								display: inline-block
								float: left
								border: $border
								margin-right: 13px
								margin-bottom: 15px
								img 
									@include wh(170px, 170px)
						>p 
							width: 100%
							text-align: center
							span 
								padding-top: 15px
								display: inline-block
								width: 150px
								cursor: pointer
								width: 200px
								@include sc(14px, #666)
				.normalShop
					overflow: hidden 
					margin-top: 15px
					>div
						overflow: hidden
						margin-right: -10px
						a 
							cursor: pointer
							float: left
							display: inline-block
							border: $border
							@include wh(149px, 149px)
							margin-right: 10px
							margin-bottom: 10px
							img 
								@include wh(147px, 147px) 
					
</style>