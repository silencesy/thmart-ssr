<template>
	<div class="cart">
		<div class="container">
    		<div class="cartBox" v-for="(item,index) in dataList.data" :key="index">
    			<div class="title">
    				<div>
    					<span class="iconfont" :class="{ 'icon-xuanzhong1': item.shopAll==1 || item.shopAll==true, 'icon-weixuanzhong': item.shopAll==0 || item.shopAll==false }" @click="shopAll(item.brandId,item.shopAll)"></span>
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
    				<span>Edit</span>
    			</p>    			
            	<div class="cartOrder" v-for="value in item.data" :key="value.skuId">
	                <div class="details">
	                	<div class="selectBox" @click="selectGoods(value,item.brandId)">
	                		<span class="iconfont" :class="{ 'icon-xuanzhong1': value.isSelect==1, 'icon-weixuanzhong': value.isSelect==0 }"></span>
	                	</div>
                        <div class="goods" @click="goGoodsDetails(value.goodsId)">
                            <div><img class="noselect" v-lazy="value.pic" alt=""></div>
                            <div>
                                <p>{{value.goodsName}}</p>
                                <p v-if="value.over">RMB{{value.reduce}} less per RMB{{value.over}} purchase</p>
                                <span class="color"><i class="label" v-for="(val,index) in value.prop" :key="index">{{val[0]}}</i></span>
                            </div>
                        </div>
                        <div class="price">
                            <div>
                                <span>¥{{value.price}}</span>
                                <!-- <del>¥{{}}</del> -->
                            </div>
                        </div>
                        <div class="quantity">
                            <div class="goodsContent">
                                <el-input-number size="small" :max="value.stock" :min="1" v-model="value.number" @change="handleChange(value.cartId,value.number)"></el-input-number>
                            </div>
                        </div>
                        <div class="subtotal">
                            <div>
                                <span>¥{{value.price*value.number}}</span>
                            </div>
                        </div>
                        <div class="edit">
                            <div>
                                <span class="iconfont icon-shanchu" @click="deleteCart(value.cartId)"></span>
                            </div>
                        </div>
	                </div>
	            </div>
    		</div>
    		<div class="checkAll">
    			<div class="left noselect" @click="allSelectFun(allSelect)">
    				<i class="iconfont" :class="{ 'icon-xuanzhong1': allSelect==true, 'icon-weixuanzhong': allSelect==false }"></i>
    				<span>Select All</span>
    			</div>
    			<div class="right">
    				<!-- <span>Selected <i>1</i> Goods</span> -->
    				<span>Total: <i>¥ {{dataList.total}}</i></span>
    				<i v-if="dataList.reduceTotal!=0">Coupon <i>¥ {{dataList.reduceTotal}}</i></i>
    				<button @click="checkout">Checkout Now</button>
    			</div>
    		</div>
		</div>
	</div>
</template>
<script>
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	export default {
		layout: 'userHome',
		middleware: 'userAuth',
		head () {
    		return {
      			title: 'Cart'
        	}
  		},
		data() {
			return {
				allSelect: false
			}
		},
		middleware: 'userAuth',
		async asyncData ({app,params,store,redirect}) {
		 	const dataList = await app.$axios.post(interfaceApi.cartList);
		 	// 如果购物车数量为0，则跳转空购物车
		 	if (dataList.data.data.data.length == 0) {
		 		redirect('/userCenter/cartModule/cartEmpty');
		 	}
  			return { 
  				dataList: dataList.data.data
  			}
		},
		components: {

		},
		mounted() {
			// 控制所有选中按钮的状态
			this.controlAllSelect();
		},
	  	computed: {  
		    
	  	},
		methods: {
			// 选中单件商品
			selectGoods(goods,brandId) {
				var that = this;
				that.$axios.post(interfaceApi.changeSelectAndTotalPrice,{
					isSelect: goods.isSelect?0:1,
					cartIdArray: [goods.cartId]
				}).then(function (response) {
					console.log(response)
					if (response.data.message == "success") {
						if (response.data.code == 1) {
							// 赋值总价
							that.dataList.total = response.data.data.total;
							// 赋值满减
							that.dataList.reduceTotal = response.data.data.reduceTotal;
							// 设置单个商品选中状态
							that.setSelectGoods(goods.skuId,goods.isSelect);
							// 设置商户选中状态
							that.getSingleShopSelectedNumber(brandId);
							// 控制所有选中按钮的状态
							that.controlAllSelect();
						}
					}
				});
			},
			// 设置选中单个商品
			setSelectGoods(skuId,status) {
				for (var i = 0; i < this.dataList.data.length; i++) {
					for(var key in this.dataList.data[i]) {
						if (key == 'data' || typeof(this.dataList.data[key]) == "object" && 
		      Object.prototype.toString.call(this.dataList.data[key]).toLowerCase() == "[object object]" && !this.dataList.data[key].length) {
							for (var j = 0; j < this.dataList.data[i]['data'].length; j++) {
								if(this.dataList.data[i]['data'][j].skuId == skuId) {
									this.dataList.data[i]['data'][j].isSelect = !status;
								}
							}
						}
						
					}
				}
				
			},
			// 选择商品时触发， 如果该商品所在商户的所有商品选中则当前商户高亮否则不高亮
			getSingleShopSelectedNumber(brandId) {
				// 单个商户下总商品个数
				var shopGoodsNumber = 0;
				// 单个商户下选中的个数
				var selectedNumber = 0;
				for (var i = 0; i < this.dataList.data.length; i++) {
					for(var key in this.dataList.data[i]) {
						if (this.dataList.data[i]['brandId'] == brandId && key == 'data' || typeof(this.dataList.data[key]) == "object" && 
		      Object.prototype.toString.call(this.dataList.data[key]).toLowerCase() == "[object object]" && !this.dataList.data[key].length) {
							for (var j = 0; j < this.dataList.data[i]['data'].length; j++) {
								shopGoodsNumber++;
								if (this.dataList.data[i]['data'][j].isSelect == "true" || this.dataList.data[i]['data'][j].isSelect == 1) {
									selectedNumber++;
								}
							}
						}
					}
				}
				// 如果该商户的商品总数等于该商户的选中的商品的个数 ，那么该商户选中
				if (shopGoodsNumber == selectedNumber) {
					for (var i = 0; i < this.dataList.data.length; i++) {
						for(var key in this.dataList.data[i]) {
							if (this.dataList.data[i]['brandId'] == brandId && key == 'data' || typeof(this.dataList.data[key]) == "object" && 
			      Object.prototype.toString.call(this.dataList.data[key]).toLowerCase() == "[object object]" && !this.dataList.data[key].length) {
								this.dataList.data[i].shopAll = true;
							}
						}
					}
				} else {
					for (var i = 0; i < this.dataList.data.length; i++) {
						for(var key in this.dataList.data[i]) {
							if (this.dataList.data[i]['brandId'] == brandId && key == 'data' || typeof(this.dataList.data[key]) == "object" && 
			      Object.prototype.toString.call(this.dataList.data[key]).toLowerCase() == "[object object]" && !this.dataList.data[key].length) {
								this.dataList.data[i].shopAll = false;
							}
						}
					}
				}
			},
			// 选中一个商户关联商户下面的所有商户选中或者不选中
			shopAll(brandId,status) {
				var that = this;
				// console.log(brandId,status);
				var cartIdArray = [];
				for (var i = 0; i < that.dataList.data.length; i++) {
					for(var key in that.dataList.data[i]) {
						if (that.dataList.data[i].brandId == brandId) {
							if (key == 'data' || typeof(that.dataList.data[key]) == "object" && 
			      Object.prototype.toString.call(that.dataList.data[key]).toLowerCase() == "[object object]" && !that.dataList.data[key].length) {
								for (var j = 0; j < that.dataList.data[i]['data'].length; j++) {
									cartIdArray.push(that.dataList.data[i]['data'][j].cartId);
								}
							}
						}
					}
				}
				that.$axios.post(interfaceApi.changeSelectAndTotalPrice,{
					isSelect: status?0:1,
					cartIdArray: cartIdArray
				}).then(function (response) {
					console.log(response)
					if (response.data.message == "success") {
						if (response.data.code == 1) {
							// 赋值总价
							that.dataList.total = response.data.data.total;
							// 赋值满减
							that.dataList.reduceTotal = response.data.data.reduceTotal;
							// 批量设置选中
							that.multipleSelect(brandId,status,cartIdArray);
							// 控制所有选中按钮的状态
							that.controlAllSelect();
						}
					}
				});
			},
			// 批量设置选中
			multipleSelect(brandId,status,cartIdArray) {
				var that = this;
				for (var i = 0; i < that.dataList.data.length; i++) {
					for(var key in that.dataList.data[i]) {
						if (that.dataList.data[i].brandId == brandId) {
							that.dataList.data[i].shopAll = !status;
							if (key == 'data' || typeof(that.dataList.data[key]) == "object" && 
			      Object.prototype.toString.call(that.dataList.data[key]).toLowerCase() == "[object object]" && !that.dataList.data[key].length) {
								for (var j = 0; j < that.dataList.data[i]['data'].length; j++) {
									that.dataList.data[i]['data'][j].isSelect = !status;
									cartIdArray.push(that.dataList.data[i]['data'][j].cartId);
								}
							}
						}
					}
				}
			},
			// 控制所有选中按钮的状态
			controlAllSelect() {
				var shopSelectLength=0;
				for (var i = 0; i < this.dataList.data.length; i++) {
					if (this.dataList.data[i].shopAll == true) {
						shopSelectLength++;
					}
				}
				if (shopSelectLength == this.dataList.data.length) {
					this.allSelect = true;
				} else {
					this.allSelect = false;
				}
			},
			// 所有全选和反选
			allSelectFun(allSelect) {
				var that = this;
		  		if (!allSelect) {
					that.$axios.post(interfaceApi.changeSelectAndTotalPrice,{
						allSelect: 1
					}).then(function (response) {

						if (response.data.message == "success") {
							if (response.data.code == 1) {
								// 赋值总价
								that.dataList.total = response.data.data.total;
								// 赋值满减
								that.dataList.reduceTotal = response.data.data.reduceTotal;
								that.setAllSelect(!allSelect);
								that.allSelect = !allSelect;
							}
						}
						
					});
		  		} else {
		  			that.$axios.post(interfaceApi.changeSelectAndTotalPrice,{
						allSelect: 0
					}).then(function (response) {
						if (response.data.message == "success") {
							if (response.data.code == 1) {
								// 赋值总价
								that.dataList.total = response.data.data.total;
								// 赋值满减
								that.dataList.reduceTotal = response.data.data.reduceTotal;
								that.setAllSelect(!allSelect);
								that.allSelect = !allSelect;
							}
						}
					});
		  		}
			},
			// 设置所有选中的状态
			setAllSelect(allSelect) {
				for (var i = 0; i < this.dataList.data.length; i++) {
					for(var key in this.dataList.data[i]) {
						this.dataList.data[i].shopAll = allSelect;
						if (key == 'data' || typeof(this.dataList.data[key]) == "object" && 
		      Object.prototype.toString.call(this.dataList.data[key]).toLowerCase() == "[object object]" && !this.dataList.data[key].length) {
							for (var j = 0; j < this.dataList.data[i]['data'].length; j++) {
								this.dataList.data[i]['data'][j].isSelect = allSelect;
							}
						}
						
					}
				}
			},
			// 跳转商品详情页
			goGoodsDetails(id) {
				this.$router.push({name: 'goods-id', params: {id: id}});
			},
			// 修改数量
			handleChange(id,number) {
				var that =this;
				that.$axios.post(interfaceApi.editNumber,{
					cartId: id,
					number: number
				}).then(function (response) {
					if (response.data.message == "success") {
						if (response.data.code == 1) {
							// 赋值总价
							that.dataList.total = response.data.data.total;
							// 赋值满减
							that.dataList.reduceTotal = response.data.data.reduceTotal;
						}
					}
				});
			},
			// 删除购物车
			deleteCart(id) {
				var that = this;
				this.$confirm('Are you sure to delete the selected goods?', '', {
		          confirmButtonText: 'Done',
		          cancelButtonText: 'Cancel',
		          type: 'warning'
		        }).then(() => {
		        	that.$axios.post(interfaceApi.cartDelete,{
						cartId: id,
					}).then(function (response) {
						if (response.data.message == "success") {
							if (response.data.code == 1) {
								// 赋值总价
								that.dataList.total = response.data.data.total;
								// 赋值满减
								that.dataList.reduceTotal = response.data.data.reduceTotal;
								for (var i = 0; i < that.dataList.data.length; i++) {
								for(var key in that.dataList.data[i]) {
										if (key == 'data' || typeof(that.dataList.data[key]) == "object" && 
						      Object.prototype.toString.call(that.dataList.data[key]).toLowerCase() == "[object object]" && !that.dataList.data[key].length) {
											for (var j = 0; j < that.dataList.data[i]['data'].length; j++) {
												if (that.dataList.data[i]['data'][j].cartId == id) {
													// 删除商品
													that.dataList.data[i]['data'].splice(j, 1);
													// 如果每个商户下的所以商品删除完，那么该商户也删除掉
													if (that.dataList.data[i]['data'].length == 0) {
														that.dataList.data.splice(i, 1);
														// 跳出循环（因为我们删除了要循环的数据，如果不跳出循环就会报错）
														break;
													}
												}
											}
										}
										
									}
								}
								// 跳转空购物车
								that.showIsEmpty();
								// 设置单个商品选中状态
								that.setSelectGoods(goods.skuId,goods.isSelect);
								// 设置商户选中状态
								that.getSingleShopSelectedNumber(brandId);
								// 控制所有选中按钮的状态
								that.controlAllSelect();
								this.$message({
									type: 'success',
									message: 'Successfully!'
								});
							}
						}
					});
		          
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: 'Undeleted'
		          });          
		        });
			},
			// 显示空的购物车
			showIsEmpty() {
				if (this.dataList.data.length == 0) {
					this.$router.push({path: '/userCenter/cartModule/cartEmpty'});
				}
			},
			checkout() {
				if (this.dataList.total == 0) {
					this.$notify({
                      title: 'Please select at least one goods!',
                      message: '',
                      type: 'warning'
                    });
				} else {
					this.$router.push({path: '/payProcess/orderConfirm'});
				}
			}
		}
	}
</script>

<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'
	.cart 
		.container
			.cartBox
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
						@include wc(197px, center)
					span:first-child
						width: 380px
				.cartOrder
					.details
						overflow: hidden
						padding: 15px 0
						border-bottom: $border
						>div 
							float: left
						.selectBox
							@include whch(36px, 104px, center, 104px)
							cursor: pointer
							.iconfont
								font-size: 21px
							.icon-xuanzhong1
								color: $theme_color
						.goods
							overflow: hidden
							width: 345px
							padding-right: 15px
							cursor: pointer
							>div
								float: left
							div
							    img 
							    	@include wh(100px, 100px)
							    	margin-right: 15px
							div:nth-child(2)
								width: 215px
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
									i
										margin-right: 10px
								.fullCut
									@include sc(14px, $theme_color)
						.price, .quantity, .subtotal, .edit 
							width: 196px
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
						.edit 
							span
								color: #999
								cursor: pointer
					.details:last-child
						border-bottom: none
						padding-bottom: 0
			.checkAll
				border: $border
				padding: 10px 15px 10px 0
				overflow: hidden
				.left
					float: left
					cursor: pointer
					margin-top: 6px
					i 
						font-size: 21px
						padding: 0 12px 0 22px
						cursor: pointer
					span 
						padding-right: 15px
					strong 
						color: #999
						font-weight: 400
						cursor: pointer
				.right
					float: right
					span 
						padding-right: 15px
					i 
						color: $theme_color
					button
						@include whch(120px, 36px, center, 36px)
						background-color: $theme_color
						color: #fff
						margin-left: 15px
						border-radius: $border_radius
</style>
