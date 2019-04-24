<template>
	<div class="coupons">
		<div class="container">
			<userLayout active="Coupons">
				<div class="couponsContent" slot="userContent">
					<div class="title">thMart-Coupons</div>
					<div class="coupons-container" v-if="couponList.data.length>0">
						<div class="coupons-item" @click="goCouponGoods(item.couponId)" v-for="item in couponList.data" :key="item.couponId">
							<img v-lazy="item.pic" alt="">
						</div>
					</div>
					<div class="noCoupons" v-if="couponList.data.length==0">
						<p>More coupons are on the way!</p>
					</div>
					<div class="changePage" v-if="couponList.totalPage!=0">
						<el-pagination
						  	background
						  	layout="prev, pager, next"
						  	:current-page.sync="currentPage"
							@size-change="handleSizeChange"
		      				@current-change="handleCurrentChange"
						  	:total="couponList.totalPage * 10">
						</el-pagination>
					</div>
				</div>
			</userLayout>
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
		middleware: 'userAuth',
		head () {
    		return {
      			title: 'thMart-Coupons'
        	}
  		},
		data() {
			return {
				titleIsShow: true,
				currentPage: 1
			}
		},
		async asyncData ({app}) {
			var param = {
				isUsed: 0,
				page: 1,
				pageSize: 10
			};
		 	const couponList = await app.$axios.post(interfaceApi.couponList,param);
  			return { 
  				couponList: couponList.data.data
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
			// 获取数据
			getData(val) {
				var that = this;
				const param = {
					page: val,
					isUsed: 0,
					pageSize: 10
				}
				that.$axios.post(interfaceApi.couponList,param).then(res=> {
					that.couponList = res.data.data;
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
		    goCouponGoods(id) {
		    	this.$router.push({name: 'userCenter-coupons-id',params: {id: id}});
		    }
		}
	}
</script>

<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'
	.coupons 
		.container
			.couponsContent
				.title
					padding-bottom: 13px 
					border-bottom: $border
				.noCoupons 
					position: relative
					height: 385px
					p 
						@include center
						color: #999
				.coupons-container
					width: 100%
					overflow: hidden
					.coupons-item
						width: 49.2%
						cursor: pointer
						float: left
						margin-right: 1.6%
						margin-top: 15px
						img
							width: 100%
							height: auto
					.coupons-item:nth-child(2n)
						margin-right: 0


</style>
