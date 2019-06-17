<template>
	<div class="orderConfirm">
		<div class="container">
			<payNav :isShowObj="isShowObj" />
			<div class="confirmBox">
				<div class="confirmAddress">
					<div class="title">
						<span>Shipping Address</span>
						<button @click="addAddress">Add Address</button>
					</div>
					<div class="address" :class="{show: moreShow}">
						<div class="box noselect" :class="{defaultBox: index==defaultBox}" v-for="(item,index) in addressList" :key="item.id">
							<div @click="checkAddrBtn(index,item)">
								<p>{{item.fullName}}</p>
								<p>{{item.phone}}</p>
								<p>{{item.email}}</p>
								<p class="addressP">{{item.province}}{{item.city}}{{item.regionDetail}}</p>
							</div>
							<div>
								<span @click="edit(item)"><i class="iconfont icon-bianji"></i>Edit</span>
								<span :class="{active: index==checkAddr}" @click="checkAddrDefault(index,item.id)">Default</span>
							</div>
						</div>
						<div class="info" v-if="addressList.length==0 && moreShow == false">Please add your detailed address.</div>
						<div class="addAddress" @click="addAddress" v-if="addressList.length==0 && moreShow == false"><span>Add Address</span></div>
					</div>
					<div class="more" v-if="addressList.length>4 && moreShow == false" @click="moreShowBtn"><span>More</span></div>				
					<div class="addAddress" v-if="addressList.length>4 && moreShow == true" @click="addAddress"><span>Add Address</span></div>
					

				</div>
				<div class="confirmGoods">
					<div class="title">Order Confirmation</div>
					<div class="goodsBox">
					<!-- 按照满减分 -->
						<div  v-for="(item,index) in orderData.overReduceArray" :key="index">
			    			<div class="shopPer" v-for="(itemshop,index) in item.data" :key="index">
				    			<div class="title">
				    				<div>
				    					<span class="iconfont icon--dianpu"></span>
				    					<span>{{itemshop.brandName}}</span>
				    				</div>
				    				<div class="iconfont icon-combinedshapefuben"></div>
				    			</div>
				    			<p class="titleList">
				    				<span>Product Name</span>
				    				<span>Price</span>
				    				<span>Quantity</span>			    				
				    				<span>Subtotal</span>
				    			</p>    			
					            <div class="goodsInfo">
					                <div class="details" v-for="(val,index) in itemshop.data" :key="index">
				                        <div class="goods">
				                            <div><img v-lazy="val.pic" alt=""></div>
				                            <div>
				                                <p>{{val.goodsName}}</p>
				                                <span class="color"><i v-for="(value,index) in val.prop" :key="index">{{value[0]}}</i></span>
				                            </div>
				                        </div>
				                        <div class="price">
				                            <div>
				                                <span>¥{{val.price}}</span>
				                                <!-- <del>¥129</del> -->
				                            </div>
				                        </div>
				                        <div class="quantity">
				                            <div>
				                                <span>{{val.number}}</span>
				                            </div>
				                        </div>
				                        <div class="subtotal">
				                            <div>
				                                <span>¥{{val.price*val.number}}</span>
				                            </div>
				                        </div>
					                </div>
					                <div class="quantity-discount">
					                	<span>Quantity Discount :</span>
					                	<span>-￥{{item.reduce}}</span>
					                </div>
					                <div class="quantity-discount">
					                	<span></span>
					                	<span>Total: ￥{{item.total}}</span>
					                </div>
					            </div>
				    		</div>
			    		</div>
			    		<!-- 按照商户分 -->
			    		<div class="shopPer" v-for="(item,index) in orderData.brandArray" :key="index">
			    			<div class="title">
			    				<div>
			    					<span class="iconfont icon--dianpu"></span>
			    					<span>{{item.brandName}}</span>
			    				</div>
			    				<div class="iconfont icon-combinedshapefuben"></div>
			    			</div>
			    			<p class="titleList">
			    				<span>Product Name</span>
			    				<span>Price</span>
			    				<span>Quantity</span>			    				
			    				<span>Subtotal</span>
			    			</p>    			
				            <div class="goodsInfo">
				                <div class="details" v-for="(val,index) in item.data" :key="index">
			                        <div class="goods">
			                            <div><img v-lazy="val.pic" alt=""></div>
			                            <div>
			                                <p>{{val.goodsName}}</p>
			                                <span class="color"><i v-for="(value,index) in val.prop" :key="index">{{value[0]}}</i></span>
			                            </div>
			                        </div>
			                        <div class="price">
			                            <div>
			                                <span>¥{{val.price}}</span>
			                                <!-- <del>¥129</del> -->
			                            </div>
			                        </div>
			                        <div class="quantity">
			                            <div>
			                                <span>{{val.number}}</span>
			                            </div>
			                        </div>
			                        <div class="subtotal">
			                            <div>
			                                <span>¥{{val.price*val.number}}</span>
			                            </div>
			                        </div>
				                </div>
				                <div class="quantity-discount">
				                	<span></span>
				                	<span>Total￥{{item.total}}</span>
				                </div>
				            </div>
			    		</div>
			    		
			    		
					</div>
					<div class="payItem">
						<div class="left">
							<div>
								<span>Remark :</span>
								<textarea name="" v-model="buyerRemark"></textarea>
							</div>
							<p>* Please Turn Off Your VPN</p>
						</div>
						<div class="right">
							<div>
								<span>Shipping :</span>
								<span class="theme_color">¥ {{orderData.feeTotal}}</span>
							</div>
							<div>
								<span>Quantity Discount :</span>
								<span>- ¥ {{fullreduction}}</span>
							</div>
							<div>
								<span class="CouponSelect">
									<span>thMart-Coupons :</span>
									<div>
										<el-dropdown trigger="click" @command="handleCommand" v-if="orderData.userCouponList.length>0">
											<el-button v-if="defaultCoupons">
											    {{defaultCoupons.name}} reduce {{defaultCoupons.reduce}}<i class="el-icon-arrow-down el-icon--right"></i>
											</el-button>
											<el-button v-if="!defaultCoupons">
											   	No use of coupon<i class="el-icon-arrow-down el-icon--right"></i>
											</el-button>
											<el-dropdown-menu slot="dropdown">
											    <el-dropdown-item v-for="item in orderData.userCouponList" :key="item.couponId" :command="item">{{item.name}} reduce {{item.reduce}}</el-dropdown-item>
											    <el-dropdown-item>No use of coupon</el-dropdown-item>
											</el-dropdown-menu>
										</el-dropdown>				
									</div>
									<div v-if="orderData.userCouponList.length==0">
										No coupon
									</div>
								</span>
								<span v-if="orderData.userCouponList.length>0">- ¥ {{orderData.couponReduce}}</span>
							</div>
						</div>
					</div>
					<div class="finalPrice">
						<span>Final Price :</span>
						<span>¥ {{orderData.total}}</span>
					</div>
					<div class="btn">
						<button @click="placeOrder">Place Your Order</button>
					</div>
				</div>
			</div>
			<!-- 模态框 -->
			<!-- <div class="layer-box" v-if="showlayer" @click="closeLayer" style="width: 100%;height: 100%;position: fixed;top: 0;left: 0;background-color: rgba(0,0,0,0.5)"></div>
				<div v-if="showlayer" slot="userContent" :class="{addInfo: showlayer,zoomIn: showlayer,animated: showlayer}" >
					<div class="box">
						<div class="boxFrom">
							<div>
								<label><i>*</i> Full Name :</label>
								<input type="text" v-model="addressInfo.fullName">
							</div>
							<div>
								<label><i>*</i> Phone :</label>
								<input type="text" v-model="addressInfo.phone">
							</div>
							<div>
								<label><i>*</i> Email :</label>
								<input type="text" v-model="addressInfo.email">
							</div>
							<div>
								<label><i>*</i> Address :</label>
								<citySelect :provinceProps="addressInfo.province" :cityProps="addressInfo.city"  @changeProvince="changeProvince" @changeCity="changeCity"/>
							</div>
							<div>
								 <textarea v-model="addressInfo.regionDetail" id="detailAddress" placeholder="* Please write down your detailed address in Chinese"></textarea>
							</div>
							<div class="setDefault noselect" @click="setDefault">
								<label v-if="addressInfo.isDefault==0"><i class="iconfont icon-weixuanzhong"></i>Default</label>

								<label v-if="addressInfo.isDefault==1" class="default"><i class="iconfont icon-xuanzhong1"></i>Default</label>
							</div>
						</div>
						<div class="btn"><button @click="saveAddress">Save</button></div>
					</div>
				</div> -->
				<div class="layer">
					<el-dialog title="Address" :visible.sync="showlayer">
						<div class="addInfo" :class="{minHeight: orderData.isaddress == 2}">
							<div class="box">
								<div class="boxFrom">
									<div>
										<label><i>*</i> Full Name :</label>
										<input type="text" v-model="addressInfo.fullName">
									</div>
									<div>
										<label><i>*</i> Phone :</label>
										<input type="text" v-model="addressInfo.phone">
									</div>
									<div>
										<label><i>*</i> Email :</label>
										<input type="text" v-model="addressInfo.email">
									</div>
									<div v-if="orderData.isaddress == 1">
										<label><i>*</i> Address :</label>
										<!-- <citySelect :provinceProps="addressInfo.province" :cityProps="addressInfo.city"  @changeProvince="changeProvince" @changeCity="changeCity"/> -->
										<textarea style="margin-left: 0;" v-model="addressInfo.province" id="detailAddress" placeholder="* Please write down your detailed address in Chinese"></textarea>
									</div>
									<div v-if="orderData.isaddress == 1">
										 <textarea v-model="addressInfo.regionDetail" id="detailAddress" placeholder="Please write down your detailed address in English"></textarea>
									</div>
									<div v-if="orderData.isaddress == 1" class="setDefault noselect" @click="setDefault">
										<label v-if="addressInfo.isDefault==0"><i class="iconfont icon-weixuanzhong"></i>Default</label>

										<label v-if="addressInfo.isDefault==1" class="default"><i class="iconfont icon-xuanzhong1"></i>Default</label>
									</div>
								</div>
								<div class="btn"><button @click="saveAddress">Save</button></div>
							</div>
						</div>
					</el-dialog>
				</div>
			</div>
		
	</div>
</template>
<script>
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	// 表单验证正则
	import v from '~/assets/js/validate'
	// 地址选择组件
	import citySelect from "~/components/base/citySelect"
	//支付进度条组件
	import payNav from '~/components/layout/payNav.vue'
	export default {
		layout: 'payHome',
		data() {
			return {
				isShowObj: {
                    oneIsShow: true,
                    twoIsShow: false,
                    threeIsShow: false
				},
				defaultBox: 0, 	//选中地址索引
				// checkedAddrId: 0,
				addressList: [],
				checkAddr: 0, 	//默认地址
				moreShow: false, //展示更多地址
				showlayer: false, //展示添加地址模态框
				addressInfo: { //添加地址信息
					id: null,
					fullName: '',
					phone: '',
					isDefault: 0,
					province: '',
					city: '',
					email: '',
					regionDetail: ''
				},
				buyerRemark: ''
			}
		},
		middleware: 'userAuth',
		async asyncData ({app,query}) {
			let param = {
				pageSize: 1000,
				page: 1
			}
			let param2 = {
				skuId: query.skuId,
				number: query.number
			}
		 	const goodsInfo = await app.$axios.post(interfaceApi.prepareOrder,param2);
		 	const addressList = await app.$axios.post(interfaceApi.addressList,param);
		 	// 如果优惠券数量大于一则赋值优惠券默认值
		 	
  			return { 
  				orderData: goodsInfo.data.data,
  				defaultCoupons: goodsInfo.data.data.userCouponList.length>0?goodsInfo.data.data.userCouponList[0]:null,
  				addressList: addressList.data.data.data,
  				defaultAddressid: addressList.data.data.data.length>0?addressList.data.data.data[0].id:null
            }
		},
		components: {
			citySelect,
			payNav
		},
		mounted() {
			
		},
	  	computed: {  
		    fullreduction: function() {
		    	if (this.orderData.overReduceArray) {
		    		var number = 0;
			    	for (var i = 0; i < this.orderData.overReduceArray.length; i++) {
			    		number += Number(this.orderData.overReduceArray[i].reduce);
			    	}
			    	return number;
		    	} else {
		    		var number = 0;
		    		return number;
		    	}
		    }
	  	},
		methods: {
			// 下单
			placeOrder() {
				var that = this;
				if (that.defaultAddressid == null) {
					that.$message({
						message: 'Please select the address!',
						type: 'warning'
					});
				} else {
					var param = {
						couponId: that.defaultCoupons==null?0:that.defaultCoupons.couponId,
						addressId: that.defaultAddressid,
						skuId: that.$route.query.skuId,
						number: that.$route.query.number,
						buyerRemark: that.buyerRemark
					}
					that.$axios.post(interfaceApi.placeOrder,param).then(res=> {
						console.log(res);
						that.$router.replace({path: '/payProcess/aliPay', query: {orderNumber: res.data.data.orderNumber}});
					})
					
				}
			},
			// 添加地址
			addAddress() {
				this.addressInfo = { //添加地址信息
					id: null,
					fullName: '',
					phone: '',
					isDefault: 0,
					province: '',
					city: '',
					email: '',
					regionDetail: ''
				};
				this.showlayer = true;
			},
			closeLayer() {
				this.showlayer = false;
				// this.fillLayer(true);
			},
			// 选择地址
			checkAddrBtn(index,item) {
				console.log(index);
				this.defaultBox = index;
				this.defaultAddressid = item.id;
			},
			// 修改默认地址
			checkAddrDefault(index,id) {
				var that =this;
				that.$axios.post(interfaceApi.changeDefault,{
					id: id
				}).then(function (response) {
					that.checkAddr = index;
				});
			},
			// 展示所有地址
			moreShowBtn() {
				console.log(123);
				this.moreShow = true;
			},
			// 设置默认地址
			setDefault() {
				this.addressInfo.isDefault = this.addressInfo.isDefault==0?1:0;
			},
			// 修改省份
			changeProvince(province) {
				this.addressInfo.province = province;
			},
			// 修改城市
			changeCity(city) {
				this.addressInfo.city = city;
			},
			// 保存地址
			saveAddress() {
				var that = this;
				if(that.orderData.isaddress == 2) {
					that.addressInfo.province = 'N/A';
				}
				if (!v.required(that.addressInfo.fullName)) {
					that.$message({
			          message: 'Please enter your name!',
			          type: 'warning'
			        });
				} else if(!v.tel(that.addressInfo.phone)) {
					that.$message({
			          message: 'Please enter a 11-digit valid number!',
			          type: 'warning'
			        });
				} else if(!v.email(that.addressInfo.email)) {
					that.$message({
			          message: 'Please enter a valid email address!',
			          type: 'warning'
			        });
				} else if(!v.required(that.addressInfo.province && that.orderData.isaddress == 1)) {
					that.$message({
			          message: 'Please write down your address!',
			          type: 'warning'
			        });
				} else {
					that.saveAddressAxios();
					setTimeout(function (){
						// 更新地址列表
						that.getAddrList();
						// 清空弹出框内容
						that.fillLayer();
					}, 200);
				}
			},
			// 添加地址发送请求
			saveAddressAxios() {
				var that = this;
				that.$axios.post(interfaceApi.addAddress,that.addressInfo).then(res=> {
					that.showlayer = false;
				})
			},
			// 重新获取地址列表
			getAddrList() {
				var that = this;
				var param = {
					pageSize: 1000,
					page: 1
				}
				that.$axios.post(interfaceApi.addressList,param).then(res=> {
					console.log(res);
					console.log(that.addressList);
					that.addressList = res.data.data.data;
					that.defaultAddressid = res.data.data.data[0].id;

				})
			},
			// 添加完成清空弹出框内容
			fillLayer() {
				this.addressInfo.id = null;
				this.addressInfo.fullName = '';
				this.addressInfo.phone = '';
				this.addressInfo.isDefault = 0;
				this.addressInfo.province = '';
				this.addressInfo.city = '';
				this.addressInfo.email = '';
				this.addressInfo.regionDetail = '';
			},
			edit(obj) {
				this.showlayer = true;
				console.log(obj);
				this.addressInfo = obj;
			},
			// 修改优惠券
			handleCommand(command) {
				this.defaultCoupons = command;
				if (command == undefined) {
					this.getPrice(0);
				} else {
					this.getPrice(command.couponId);
				}
		    },
		    // 修改优惠券获取价格
		    getPrice(couponId) {
		    	var that = this;
				var param = {
					couponId: couponId,
					skuId: that.$route.query.skuId,
					number: that.$route.query.number
				}
				that.$axios.post(interfaceApi.prepareOrder,param).then(res=> {
					this.orderData.couponReduce = res.data.data.couponReduce;
					this.orderData.total = res.data.data.total;
				})
		    }

		}
	}
</script>

<style lang='sass' scoped>
@import '~/assets/sass/common.sass'
.orderConfirm
	.container
		.confirmBox
			.confirmAddress
				border: $border
				padding: 15px
				.info
					text-align: center
					padding: 10px
					margin-top: 30px
				.addAddress
					width: 100px
					height: 26px
					text-align: center
					line-height: 26px
					font-size: 14px
					color: #fff
					background-color: #F9421E
					border-radius: 4px
					margin: 0 auto 15px auto
					cursor: pointer
				.title 
					overflow: hidden 
					padding-bottom: 10px 
					margin-bottom: 15px
					border-bottom: $border
					span 
						float: left
						font-size: 18px
						padding-top: 3px
					button 
						float: right
						@include whch(100px, 26px, center, 26px)
						@include sc(14px, #fff)
						background-color: #F9421E
						border-radius: $border_radius
				.address 
					overflow: hidden
					height: 155px
					.box 
						border: $border
						border-radius: $border_radius
						@include wh(280px, 155px)
						float: left
						padding: 15px
						margin-right: 16px
						margin-bottom: 16px
						cursor: pointer
						overflow: hidden
						p 
							@include sc(14px, #666)
							margin-bottom: 10px
						p.addressP
							overflow: hidden
							text-overflow: ellipsis
							display: -webkit-box
							-webkit-box-orient: vertical
							-webkit-line-clamp: 1
							height: 20px
						>div 
							overflow: hidden
							.icon-bianji
								padding-right: 5px
							span:nth-child(2) 
								float: right
								font-size: 14px
							span.active
								float: right
								@include sc(14px, $theme_color)							
					.box:nth-child(4n)
						margin-right: 0
					.box.defaultBox
						border: 1px solid $theme_color
				.address.show
					height: auto
				.more 
					width: 100%
					text-align: center
					padding-top: 15px 
					cursor: pointer
					@include sc(14px, #666)
				.more:hover, .more:active 
					color: $theme_color
			.confirmGoods
				margin-top: 20px
				border: $border
				padding: 15px 
				.title 
					border-bottom: $border 
					padding-bottom: 10px
					font-size: 18px
					margin-bottom: 15px
				.goodsBox 
					.shopPer
						border: $border
						padding: 0 15px 15px 15px
						margin-bottom: 20px
						.title 
							padding-top: 15px
							padding-bottom: 10px
							border-bottom: $border
							cursor: pointer
							overflow: hidden
							div:first-child
								float: left
								span 
									font-size: 16px
								.icon-weixuanzhong 
									font-size: 21px
									padding-left: 7px
									padding-right: 15px
									vertical-align: middle
								.icon--dianpu
									padding-right: 10px
									font-size: 21px
							div:nth-child(2)
								float: right
						.titleList
							padding: 15px 0
							border-bottom: $border
							span
								display: inline-block
								@include wc(227px, center)
							span:first-child
								width: 450px
						.goodsInfo
							.details
								overflow: hidden
								padding: 15px 0
								border-bottom: $border
								>div 
									float: left
								.goods
									overflow: hidden
									width: 450px
									padding-right: 15px
									cursor: pointer
									>div
										float: left
									div
										img 
											@include wh(100px, 100px)
											margin-right: 15px
									div:nth-child(2)
										width: 310px
										p 
											overflow: hidden
											text-overflow: ellipsis
											display: -webkit-box
											-webkit-box-orient: vertical
											-webkit-line-clamp: 2
											line-height: 22px
											height: 44px
										.color									
											@include sc(14px, #666)
											padding: 15px 0 5px 0
											display: block
										.fullCut
											@include sc(14px, $theme_color)
										span
											i
												margin-right: 10px
								.price, .subtotal, .quantity
									width: 227px
									height: 104px
									text-align: center
									position: relative
									>div 
										@include center
								.price, .subtotal
									>div
										span, del 
											display: block
											margin-bottom: 10px
										span 
											color: $theme_color
										del 
											color: #666
							.details:last-child
								border-bottom: none

								padding-bottom: 0
							.quantity-discount
								@include hh(50px, 50px)
								span:nth-child(2)
									float: right
									color: $theme_color
							.quantity-discount:nth-child(3)
								border-top: 1px solid #dfdfdf

				.payItem
					overflow: hidden
					border-top: $border 
					border-bottom: $border
					.left, .right 
						float: left
						width: 50%
					.left 
						border-right: $border
						>div 
							padding: 15px 0
							overflow: hidden
							span, textarea 
								float: left
							span 
								width: 75px 
								color: #666
							textarea
								@include wh(495px, 80px)
						>p 
							@include sc(14px, $theme_color)
							margin: 29px 0 10px 0
					.right 
						>div 
							border-bottom: $border
							overflow: hidden
							@include hh(55px, 55px)
							padding: 0 15px
							>span:first-child 
								float: left
								color: #666
								width: 170px
								text-align: right
							>span:nth-child(2)
								float: right
								color: $theme_color
						>div:first-child
							>span:nth-child(2)
								color: #666
						>div:last-child 
							border-bottom: none
							span.CouponSelect
								overflow: hidden
								width: 425px
								>span 
									display: inline-block
									float: left
									width: 170px
								>div 
									float: left
									display: inline-block
									width: 255px
									text-align: left
									padding-left: 10px
				.finalPrice
					background-color: #eee 
					text-align: right
					@include whh(100%, 40px, 40px)
					margin: 15px 0
					padding: 0 15px
					>span:first-child
						color: #666
					>span:nth-child(2)
						color: $theme_color
						padding-left: 30px
						font-size: 21px
				.btn 
					text-align: right
					button 
						@include whch(180px, 40px, center, 40px)
						background-color: $theme_color
						color: #fff
						border-radius: $border_radius
.el-dropdown-selfdefine
	padding: 7px 8px
	border: $border
	text-align: left
.el-dropdown-selfdefine:hover
	background-color: #fff
	color: rgb(96, 98, 102)
.el-dropdown-menu__item:hover
	background-color: #fff
	color: $theme_color
.el-dropdown-menu__item
	padding: 0 20px
.el-icon-arrow-down.el-icon--right
	padding-left: 5px
.addInfo.minHeight
	height: 240px
.addInfo
	@include wh(580px,520px)
	padding: 0 15px
	background: #fff
	border-radius: 8px
	.box 
		.boxFrom
			margin-top: 15px
			>div 
				margin-bottom: 15px
				overflow: hidden
				label 
					float: left
					line-height: 40px
					width: 100px
					color: #666
				input 
					float: left
					@include wh(445px, 40px)
					padding: 5px
				textarea 
					width: 446px
					height: 100px
					font-size: 16px
					margin-left: 99px
			.setDefault
				label
					cursor: pointer
					i 
						font-size: 18px
						padding-right: 5px
				label.default
					color: $theme_color
		.btn 
			width: 545px
			text-align: center
			button 
				@include whch(145px, 40px, center, 40px)
				background-color: $theme_color
				color: #fff
				border-radius: $border_radius

</style>
