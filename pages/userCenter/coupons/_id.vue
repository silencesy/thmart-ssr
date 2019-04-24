<template>
	<div class="goodsContent">
		<div class="bread">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
			  <el-breadcrumb-item>Coupons
			  </el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container goodsListBox">
			<div class="goodsList">
				<goodsItem :styleObj="goodsItemStyleObj" :hotData="goodsListData.data"/>
				<!-- <div class="changePage">
					<el-pagination
					  	background
					  	layout="prev, pager, next"
					  	:current-page.sync="currentPage"
						@size-change="handleSizeChange"
	      				@current-change="handleCurrentChange"
					  	:total="goodsListData.totalPage * 10">
					</el-pagination>
				</div> -->
			</div>
			<!-- <moreGoods /> -->
		</div>
	</div>
</template>
<script>
	import moreGoods from "~/components/base/moreGoods"
	import rank from "~/components/base/rank"
	import goodsItem from "~/components/base/goodsItem"
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	export default {
		layout: 'indexHome',
		head () {
    		return {
      			title: 'thMart-Coupons'
        	}
  		},
		validate ({ params }) {
		// Must be a number
			return /^\d+$/.test(params.id)
		},
		props: {

	    },
		data(){
            return{
            	num1: 1,
				goodsItemStyleObj: {
					width: '178.5px',
					height: '275px'
				},
				currentPage: 1,
				param: {
					couponId: this.$route.params.id,
	        		page: 1,
	        		pageSize: 10
				}
	        }
        },
        async asyncData ({app,params}) {
        	const param = {
        		couponId: params.id,
        		page: 1,
        		pageSize: 10,
        	}
		 	const goodsListData = await app.$axios.post(interfaceApi.couponItemList,param)
  			return { goodsListData: goodsListData.data.data }
		},
		components: {
			moreGoods,
			rank,
			goodsItem
		},
		mounted() {

			
		},
	  	computed: {  
		    
	  	},
		methods:{
			// 初始化参数
			initParam() {
				this.param.page = 1;
			},
			// 改变排序
			changeSortParam(sort) {
				this.param.sort = sort;
				this.currentPage = 1;
				console.log(0);
			},
			// 获取数据
			getData() {
				var that = this;
				that.$axios.post(interfaceApi.couponItemList,that.param).then(res=> {
					console.log(res);
					that.goodsListData = res.data.data;
				})
			},
			// 回到顶部
			goBackTop() {
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
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
<style lang='sass' type="text/css" scoped>
	@import '~/assets/sass/common.sass'
	.goodsContent
		.bread 
			width: 100%
			background-color: #eee
			margin-bottom: 15px
			.el-breadcrumb
				@include hh(36px, 36px)
				width: 1200px
				margin: 0 auto
		.goodsListBox 
			overflow: hidden
			.goodsList
				float: left
				width: 942px

</style>