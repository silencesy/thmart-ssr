<template>
	<div>
		<!-- <shopNav /> -->
		<div class="shopHome container">
			<rank @Sort = "Sort" :isShowObj="isShowObj" />
			<goodsItem :hotData = "shopGoodsData.data" />
			<div class="changePage" v-if="shopGoodsData.data.length>0">
				<el-pagination
					:current-page.sync="currentPage"
					@size-change="handleSizeChange"
      				@current-change="handleCurrentChange"
				  	:background="background"
				  	layout="prev, pager, next"
				  	:total="shopGoodsData.totalPage * 10">
				</el-pagination>
			</div>
		</div>
	</div>
</template>
<script>
	import rank from '~/components/base/rank'
	import goodsItem from '~/components/base/goodsItem'
	import shopNav from '~/components/layout/shopNav.vue'
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	export default {
		layout: 'shopHome',
		head () {
            return {
                title: this.$store.state.shopInfo.name
            }
        },
		data() {
			return {
				background: true,
				isShowObj: {
                    priceIsShow: true
				},
				currentPage: 1,
				param: {
					id: 0,
					page: 1,
					pageSize: 30,
					sort: 'createTime_desc',
					brandId: this.$route.query.id
				}
			}
		},
		async asyncData ({app,query,store}) {     
			let param = {
				id: 0,
				page: 1,
				pageSize: 30,
				sort: 'createTime_desc',
				brandId: query.id,
				search: query.searchInfo
			}
		 	const shopGoodsData = await app.$axios.post(interfaceApi.goodsList,param)
		 	store.commit('SET_SHOP_INFO',shopGoodsData.data.data.brand);
  			return { shopGoodsData: shopGoodsData.data.data}
		},
		components: {
			rank,
			goodsItem,
			shopNav
		},
		mounted() {

			
		},
	  	computed: {  
		    
	  	},
		methods: {
			// 初始参数
			initParam() {
				this.param.page = 1;
			},
			// 改变排序
			changeSortParam(sort) {
				this.param.sort = sort;
				this.currentPage = 1;
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
			// 获取数据
			getData() {
				var that = this;
				that.$axios.post(interfaceApi.goodsList,that.param).then(res=> {
					console.log(res);
					that.shopGoodsData = res.data.data;
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
		    }
		    
		}
	}
</script>
<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'


</style>