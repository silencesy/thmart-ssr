<template>
	<div class="user">
		<div class="container">
			<userLayout active="orderList">
				<div class="" slot="userContent">
					<div class="userTitle">
		                <ul>
		                    <li :class="{active: active=='all'}">
		                        <nuxt-link to="/userCenter/orderlist/all">All</nuxt-link>
		                    </li>
		                    <li :class="{active: active=='unpaid'}">
		                        <nuxt-link to="/userCenter/orderlist/unpaid">Unpaid</nuxt-link>
		                    </li>
		                    <li :class="{active: active=='unshipped'}">
		                        <nuxt-link to="/userCenter/orderlist/unshipped">Unshipped</nuxt-link>
		                    </li>
		                    <li :class="{active: active=='progress'}">
		                        <nuxt-link to="/userCenter/orderlist/progress">In Progress</nuxt-link>
		                    </li>
		                    <li :class="{active: active=='shipped'}">
		                        <nuxt-link to="/userCenter/orderlist/shipped">Shipped</nuxt-link>
		                    </li>
		                </ul>               
		            </div>
					<div v-if="orderList.length>0" class="orderTitle">
						<span>Product Name</span>
						<span>Price</span>
						<span>Quantity</span>
						<span>Final Price</span>
						<span>Status</span>
					</div>
					<div v-if="orderList.length>0" v-for="(item,index) in orderList" :key="item.orderNumber">
						<div v-if="item.status == 0">
							<userOrder :orderDataList="item" flag="pay" type="unpaid" />
						</div>
						<div v-if="item.status == 5">
							<userOrder :orderDataList="item" flag="pay" type="unpaid" />
						</div>
						<div v-else-if="item.status == 1">
							<userOrder :orderDataList="item" flag="details" type="unshipped" />
						</div>
						<div v-else-if="item.status == 6">
							<userOrder :orderDataList="item" @bindSpell="scqrcode" flag="spell" type="spell" />
						</div>
						<div v-else-if="item.status == 2">
							<userOrder :orderDataList="item" flag="track" type="progress" />
						</div>
						<div v-else-if="item.status == 3">
							<userOrder :orderDataList="item" :index="index" @delete="deleteOrder" flag="track" type="shipped" />
						</div>
						<div v-else-if="item.status == 4">
							<userOrder :orderDataList="item" :index="index" @delete="deleteOrder" flag="details" type="closed" />
						</div>
					</div>
					<!-- 没有订单的情况 -->
					 <div v-if="orderList.length==0" class="noOrderList"><p>No more order</p></div>
				</div>
			</userLayout>
			<div class="changePage" v-if="totalPage!=0">
				<el-pagination
				  	background
				  	layout="prev, pager, next"
				  	:current-page.sync="currentPage"
					@size-change="handleSizeChange"
      				@current-change="handleCurrentChange"
				  	:total="totalPage * 10">
				</el-pagination>
			</div>
		</div>
		<!-- 拼单二维码 -->
        <div class="follow-box">
            <el-dialog title="Scan QR code for Go Duo Deals" :visible.sync="spellCode">
                <div v-if="spellCode" id="qrcode" ref="qrcode"></div>
            </el-dialog>
        </div>
	</div>
</template>
<script>
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	import goodsItem from "~/components/base/goodsItem"
	import userLayout from "~/components/user/userLayout"
	import userOrder from "~/components/user/userOrder"
	export default {
		layout: 'userHome',
		middleware: 'userAuth',
		head () {
    		return {
      			title: 'Orders'
        	}
  		},
		validate ({ params }) {
			return params.id == 'all' || params.id == 'unpaid' || params.id == 'unshipped' || params.id == 'progress' || params.id == 'shipped';
		},
		data() {
			return {
				titleIsShow: true,
				status: '',
				currentPage: 1,
				spellCode: false
			}
		},
		async asyncData ({app,params}) {
			// 确定订单类型
			let status;
			if (params.id == 'all') {
				status = '';
			} else if (params.id == 'unpaid') {
				status = [0,5];
			} else if (params.id == 'unshipped') {
				status = [1,6,7];
			} else if (params.id == 'progress') {
				status = [2];
			} else if (params.id == 'shipped') {
				status = [3];
			}
			const param = {
				status: status,
				page: 1,
				pageSize: 15
			}
		 	// const goodsList = await app.$axios.post(interfaceApi.CollectList,goodsPara);
		 	const orderList = await app.$axios.post(interfaceApi.orderList,param);
  			return {
  				active: params.id,
  				status: status,
  				param: param,
  				orderList: orderList.data.data.data,
  				totalPage: orderList.data.data.totalPage
  			}
		},
		components: {
			goodsItem, 
			userLayout,
			userOrder
		},
		mounted() {
		},
	  	computed: {  
		    
	  	},
		methods: {
			scqrcode(orderNumber) {
                this.spellCode = true;
                this.$nextTick(() => {
                    this.qrcode(orderNumber);
                })
            },
            qrcode (orderNumber) {
				console.log('http://mob.thmart.com.cn/shareShow?id=' + orderNumber);
                // this.onlyOne = true;
                let qrcode = new this.$QRCode('qrcode',{
                    width: 300, // 设置宽度，单位像素
                    height: 300, // 设置高度，单位像素
                    text: 'http://mob.thmart.com.cn/shareShow?id=' + orderNumber // 设置二维码内容或跳转地址
                })
            },
			// 获取数据
			getData() {
				var that = this;
				that.$axios.post(interfaceApi.orderList,that.param).then(res=> {
					that.orderList = res.data.data.data;
					that.totalPage = res.data.data.totalPage;
				})
			},
			// 回到顶部
			goBackTop() {
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			},
			// 改变页数
			handleSizeChange(val) {
				console.log(val)
				this.param.page = val;
		        this.getData();
		    },
		    // 上下页
		    handleCurrentChange(val) {
		    	this.param.page = val;
		        this.goBackTop();
		        this.getData();
		     console.log(val)
		    },
		    // 删除订单
		    deleteOrder(index) {
		    	if (this.orderList.length != 1) {
		    		this.orderList.splice(index,1);
		    	} else if (this.orderList.length == 1 && this.param.page != 1) {
		    		this.param.page = this.param.page-1;
		    		this.currentPage = this.param.page;
		    		this.getData();
		    	} else if (this.orderList.length == 1 && this.param.page == 1) {
		    		this.param.page = 1;
		    		this.currentPage = this.param.page;
		    		this.getData();
		    	}	
		    }
		}
	}
</script>

<style lang='sass' scoped>
@import '~/assets/sass/common.sass'
.user 
	.container
		.userTitle
			background-color: #eee
			width: 968px
			overflow: hidden
			ul 
				overflow: hidden
			li 
				width: 20%
				float: left 
				text-align: center
				a 
					width: 100% 
					padding: 20px 0
					display: inline-block 
				a:after 
					content: "|"
					float: right
					color: #dfdfdf
			li:last-child
				a:after
					content: " "
			li.active
				a
					color: $theme_color
		.orderTitle 
			border-bottom: $border
			span 
				width: 155px
				text-align: center
				display: inline-block
				padding: 15px 0 
			span:first-child 
				width: 320px
.noOrderList
	position: relative
	height: 311px
	p 
		@include center
		color: #999
#qrcode
    width: 300px
    height: 300px
    margin: 10px auto
</style>
