<template>
	<div class="goodsContent groupDetails">
		<div class="bread">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
			  <el-breadcrumb-item>Amor flora</el-breadcrumb-item>
			  <el-breadcrumb-item>{{goodsInfo.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="productDetails container">
			<div class="goodsDetails">
				<div class="goodsDetailsBox">
					<!-- 左边 -->
					<div class="goodImg goodsLeft">
						<div class="big-img-container">
							<pic-zoom :url="piczoomurl" :scale="3" :scroll="true"></pic-zoom>
							<!-- <img src="~static/images/flower.jpg" alt=""> -->
						</div>
					    <div class="small-img-container">
					    	<div class="small-img-box" :class="{active: smallImgActiveNumber==item}" v-for="item in 5" @mouseover='smallImgActive(item)' :key="item">
					    		<img src="~static/images/flower.jpg" alt="">
					    	</div>
					    </div>
					</div>
					<!-- 右边 -->
					<div class="goodsRight">
						<p>{{goodsInfo.title}}</p>
						<div class="box">
							<ul class="list">
								<!-- 页面加载的时候显示价格 -->
								<li v-if="!skuInfo">
									<span class="price">Price</span>
									<div>
										<el-badge value="new" class="item">
										  	<el-button size="small">¥ {{goodsInfo.price}}</el-button>
										</el-badge>
										<del class="del" v-if="goodsInfo.coupon_price">¥ {{goodsInfo.coupon_price}}</del>
									</div>
                                    <div class="GroupCountDown">
                                        <strong>15</strong><i>:</i><strong>35</strong><i>:</i><strong>20</strong><i>:</i><strong>24</strong>
                                    </div>
								</li>
								<!-- 选择sku显示价格 -->
								<li v-if="skuInfo">
									<span>Price</span>
									<div>
										<el-badge value="new" class="item">
										  	<el-button size="small">¥ {{skuInfo.price}}</el-button>
										</el-badge>
										<del v-if="skuInfo.coupon_price">¥ {{skuInfo.coupon_price}}</del>
									</div>
								</li>
								<li>
									<span>Shipping</span>
									<div>
										<span>¥ 10.00</span>
										<span class="forFree">Free delivery for RMB99 purchase and up</span>
									</div>
								</li>
								<li v-for="(item,key) in list.result" :key="key">
									<span class="type">{{key}}</span>
									<div class="btn">
										<span v-for="(value,index) in item" class="noselect" v-bind:class="{selected: value.active, soldOut: !value.active && value.disabled}"  @click="handleActive(key, value)" :key="index">{{ value.name }}</span>
									</div>
								</li>
								<li>
									<span class="type">Quantity</span>
									<div>
										<el-input-number size="small" :min="1" v-model="num1"></el-input-number>
									</div>
									<!-- 当前商品所有库存 -->
									<div v-if="!skuInfo">
										<span class="stock">Stock: {{goodsInfo.sumStock}}</span>
									</div>
									<!-- 选择单个sku的库存 -->
									<div v-if="skuInfo">
										<span class="stock">Stock: {{skuInfo.stock}}</span>
									</div>
								</li>
								<li class="buy">
									<button @click="buyNow">Buy Now</button>
									<button @click="addToCart">Add To Cart</button>
								</li>
								<li class="tips">
									<span><i class="iconfont icon-unreview"></i>favourite</span>
									<span><i class="iconfont icon-kefu"></i>Add To Cart</span>
								</li>
							</ul>						
						</div>
					</div>
				</div>
				<div class="detailsPic">
					<div class="title">Details</div>
					<div class="imgBox" v-html="goodsInfo.detail"></div>
				</div>
			</div>

			<moreGoods />
		</div>
	</div>
</template>
<script>
	import moreGoods from "~/components/base/moreGoods"
	import PicZoom from "~/components/base/PicZoom"
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	export default {
		layout: 'shopHome',
		props: {

	    },
		data(){
            return{
            	num1: 1,
            	smallImgActiveNumber: -1,
            	piczoomurl: 'http://www.bkjia.com/uploads/allimg/150522/212110HP-1.png',
            	data: [],
                skuId: "",
                skuName: "skuId",
                // 属性名称信息
                keys: [],
                // 数据集合{list.result list.items}
                list: {},
                // 分隔符
                spliter: '\u2299',
                result: {},
                message: "",
                highKeys: {},
                singleSkuInfo: null,
                skuInfo: null
	        }
        },
        async asyncData ({app,params}) {
        	console.log(params)
			let param = {
				id: 4,
			}
		 	const goodsInfo = await app.$axios.post(interfaceApi.goodsDeatail,param);
  			return { 
  					goodsInfo: goodsInfo.data.data}
		},
		components: {
			moreGoods,
			PicZoom
		},
		mounted() {
			this.skuInitData(this.goodsInfo.skuList);
			this.getTextareaData();
		},
	  	computed: {  
		    
	  	},
		methods:{
			// 获取单个sku信息
            getSkuId(id) {
            	const that = this;
            	const param = {
            		id: id
            	}
				that.$axios.post(interfaceApi.getSkuInfo,param).then(res=> {
					that.skuInfo = res.data.data;
					that.piczoomurl = that.skuInfo.pic;
					that.smallImgActiveNumber = -1;
				})
            },
			// 初始化sku列表
	  		skuInitData (skuData) {
	  			for (var i = 0; i < skuData.length; i++) {
	  				var skuItem = {};
	  				skuItem['skuId'] = skuData[i].id;
	  				for(var key in skuData[i].propName) {
	  					skuItem[key] = skuData[i].propName[key][0];
	  				}
	  				this.data.push(skuItem);
	  			}
	  		},
	  		/**
             * 初始化数据
             * @return 
             */
            powerset(arr) {
                let ps = [[]];
                for (let i = 0; i < arr.length; i++) {
                    for (let j = 0, len = ps.length; j < len; j++) {
                        ps.push(ps[j].concat(arr[i]));
                    }
                }

                return ps;
            },
            /**
             * 初始化数据
             * @return 
             */
            initData() {
                this.result = {};
                this.keys = this.getAllKeys();
                for (let i = 0; i < this.keys.length; i ++) {
                    this.highKeys[this.keys[i]] = false;
                }

                this.list = this.combineAttr(this.data, this.keys);
                this.initSeleted(this.skuId);
                this.buildResult(this.list.items)
                this.updateStatus(this.getSelectedItem());
                this.showResult();
            },

            /**
             * 获取输入表单中的数据进行初始化
             * @return
             */
            getTextareaData() {
                	// 默认选中则打开注释
                    // 定义一个flag
                    // let isHas = false;
                    // let skuId = '';
                    // for (let i = 0; i < this.data.length; i ++) {
                    //     if (skuId == this.data[i][this.skuName]) {
                    //         isHas = true;
                    //         break
                    //     }
                    // }

                    // this.skuId = isHas ? skuId : this.data[0][this.skuName];
                    this.initData();
            },

            /**
             * 正常属性点击
             */
            handleNormalClick(key, value) {
                for (let i in this.list.result[key]) {
                    if (i != value.name) {
                        this.list.result[key][i].active = false;
                    } else {
                        this.list.result[key][i].active = true;
                    }
                }
            },

            /**
             * 无效属性点击
             */
            handleDisableClick(key, value) {
                this.list.result[key][value.name]["disabled"] = false;
                // 清空高亮行的已选属性状态（因为更新的时候默认会跳过已选状态）
                for (let i in this.list.result) {
                    if (i != key) {
                        for (let x in this.list.result[i]) {
                            this.list.result[i][x].active = false;
                        }
                    }
                }

                this.updateStatus(this.getSelectedItem());
            },

            /**
             * 高亮行
             */
            highAttributes: function() {
                for (let key in this.list.result) {
                    this.highKeys[key] = true;
                    for (let attr in this.list.result[key]) {
                        if (this.list.result[key][attr].active === true) {
                            this.highKeys[key] = false;
                            break;
                        }
                    }
                }
            },

            /**
             * 点击事件处理
             * @param  key   点击的行
             * @param  value 点击的按钮的数据
             */
            handleActive: function(key, value) {
                if (value.active == true) {
                    return false;
                }

                this.handleNormalClick(key, value);
                if (value.disabled === true) {
                    this.handleDisableClick(key, value);
                }

                this.updateStatus(this.getSelectedItem());
                this.highAttributes();
                this.showResult();
            },

            /**
             * 计算属性
             * @param  {[type]} data [description]
             * @param  {[type]} keys [description]
             * @return {[type]}      [description]
             */
            combineAttr(data, keys) {
                let allKeys = []
                let result = {}

                for (let i = 0; i < data.length; i++) {
                    let item = data[i]
                    let values = []

                    for (let j = 0; j < keys.length; j++) {
                        let key = keys[j]
                        if (!result[key]) {
                            result[key] = {};
                        }

                        if (!result[key][item[key]]) {
                            result[key][item[key]] = {"name": item[key], "active": false, "disabled": true};
                        }

                        values.push(item[key]);
                    }

                    allKeys.push({
                        path: values.join(this.spliter),
                        sku: item['skuId']
                    });
                }

                return {
                    result: result,
                    items: allKeys
                }
            },

            /**
             * 获取所有属性
             * @return {[type]} [description]
             */
            getAllKeys() {
                let arrKeys = [];
                for (let attribute in this.data[0]) {
                    if (!this.data[0].hasOwnProperty(attribute)) {
                        continue;
                    } 

                    if (attribute !== this.skuName) {
                        arrKeys.push(attribute);
                    }
                }

                return arrKeys;
            },

            getAttruites(arr) {
                let result = []
                for (let i = 0; i < arr.length; i++) { 
                    result.push(arr[i].path) 
                }

                return result
            },

            /**
             * 生成所有子集是否可选、库存状态 map
             */
            buildResult(items) {
                let allKeys = this.getAttruites(items)

                for (let i = 0; i < allKeys.length; i++) {
                    let curr = allKeys[i];
                    let sku = items[i].sku;
                    let values = curr.split(this.spliter);
                    let allSets = this.powerset(values);

                    // 每个组合的子集
                    for (let j = 0; j < allSets.length; j++) {
                        let set = allSets[j]
                        let key = set.join(this.spliter)

                        if (this.result[key]) {
                            this.result[key].skus.push(sku)
                        } else {
                            this.result[key] = {
                                skus: [sku]
                            }
                        }
                    }
                }
            },

            /**
             * 获取选中的信息
             * @return Array 
             */
            getSelectedItem() {
                let result = [];
                for (let attr in this.list.result) {
                    let attributeName = '';
                    for (let attribute in this.list.result[attr]) {
                        if (this.list.result[attr][attribute].active === true) {
                            attributeName = attribute;
                        }
                    }

                    result.push(attributeName);
                }

                return result
            },

            /**
             * 更新所有属性状态
             */
            updateStatus(selected) {
                for (let i = 0; i < this.keys.length; i++) {
                    let key = this.keys[i],
                        data = this.list.result[key],
                        hasActive = !!selected[i],
                        copy = selected.slice();

                    for (let j in data) {
                        let item = data[j]["name"];
                        if (selected[i] == item) {
                            continue
                        }

                        copy[i] = item
                        let curr = this.trimSpliter(copy.join(this.spliter), this.spliter);
                        this.list.result[key][j]["disabled"]  = this.result[curr] ? false : true;
                    }
                }
            },

            trimSpliter(str, spliter) {
                // ⊙abc⊙ => abc
                // ⊙a⊙⊙b⊙c⊙ => a⊙b⊙c
                let reLeft    = new RegExp('^' + spliter + '+', 'g');
                let reRight   = new RegExp(spliter + '+$', 'g');
                let reSpliter = new RegExp(spliter + '+', 'g');
                return str.replace(reLeft, '')
                    .replace(reRight, '')
                    .replace(reSpliter, spliter)
            },

            /**
             * 初始化选中
             * @param  mixed|Int|String skuId 需要选中的skuId
             * @return {[type]}       [description]
             */
            initSeleted(skuId) {
                for (let i in this.data) {
                    if (this.data[i][this.skuName] == skuId) {
                        for (let x in this.data[i]) {
                            if (x !== this.skuName) {
                                this.list.result[x][this.data[i][x]].active = true;
                            }
                        }
                        break;
                    }
                }
            },

            /**
             * 显示选中的信息
             * @return 
             */
            showResult() {
                let result = this.getSelectedItem()
                let s = []
                for (let i = 0; i < result.length; i++) {
                    let item = result[i];
                    if (!!item) {
                        s.push(item)
                    }
                }

                if (s.length == this.keys.length) {
                    let curr = this.result[s.join(this.spliter)]
                    if (curr) {
                        s = s.concat(curr.skus)
                        this.skuId = curr.skus[0];
                    }

                    this.message = s.join('-');
                }
            },
            // 购买
            buyNow() {
            	var that = this;
            	if (that.mustChooseAll()) {
            		// 公共函数里面的方法
			      	if (!that.user.isLogin()) {
			      		alert("Please login");
			      	} else {
			      		alert("buy");
			      	}
	  			} else {
	  				alert("Please select goods");
	  			}
            },
            // 加入购物车
            addToCart() {
            	var that = this;
            	if (that.mustChooseAll()) {
            		// 公共函数里面的方法
			      	if (!that.user.isLogin()) {
			      		alert("Please login");
			      	} else {
			      		alert("buy");
			      	}
	  			} else {
	  				alert("Please select goods");
	  			}
            },
            // 必须选完全才能加入购物车或者购买
	  		mustChooseAll() {
	  			var chooseNumer = 0;
	  			for (var key in this.list.result) {
	  				for(var key2 in this.list.result[key]) {
	  					for(var key3 in this.list.result[key][key2]) {
	  						if (key3 == 'active' && this.list.result[key][key2][key3]) {
	  							chooseNumer++;
	  						}
	  					}
	  				}
	  			}
	  			return this.keys.length == chooseNumer? true: false;
	  		},
	  		smallImgActive(index) {
	  			this.smallImgActiveNumber = index;
	  		}
        },
	  	watch: {
            skuId: function(newVal,oldVal) {
            	this.number = 1;
            	this.getSkuId(newVal);
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
		.productDetails  
			overflow: hidden
			.goodsDetails 
				float: left
				overflow: hidden 
				border: $border
				border-radius: $border_radius
				padding: 15px
				.goodsDetailsBox
					overflow: hidden
					.goodsLeft 
						float: left
						.big-img-container
							@include wh(370px, 370px)
						.small-img-container
							margin-top: 10px
							height: 80px
							.small-img-box
								float: left
								@include wh(70px, 70px)
								cursor: pointer
								border: 1px solid #FFF
								margin-right: 8px
								img
									float: left
									@include wh(100%, 100%)
							.small-img-box.active
								border: 1px solid #F9421E
					.goodsRight 
						float: left
						width: 510px 
						p 
							font-size: 16px
							line-height: 24px
						.box 
							width: 510px	
							.list
								overflow: hidden
								li:first-child 
									background-color: #F9421E
									height: 48px
									span
										margin-top: 17px
										@include sc(14px, #666)
									>div 
										margin-top: 13px
										del 
											@include sc(14px, #999)
											margin-left: 75px

								li
									margin-top: 20px
									overflow: hidden
									span 
										width: 115px
										float: left
										padding-left: 10px
										@include sc(14px, #666)
									>div 
										float: left
										span 
											padding-left: 0
										.stock
											@include hh(32px, 32px)
											padding-left: 20px
									>.type 
										margin-top: 10px
									>.btn
										width: 380px
										span
											width: auto
											border: $border
											padding: 10px
											border-radius: $border_radius
											cursor: pointer 
											margin-right: 15px
											margin-bottom: 15px
										.selected 
											color: $theme_color
											border: 1px solid $theme_color
										.soldOut 
											background-color: #eee
											border: 1px solid #eee 
											color: #999
								.buy 
									margin: 30px 0 15px 0
									button 
										@include whch(180px, 40px, center, 40px)
										background-color: $theme_color
										@include sc(16px, #fff)
										border-radius: $border_radius
									button:first-child 
										margin-right: 40px
								.tips 
									span 
										width: 180px
										text-align: center
										cursor: pointer
										i 
											padding-right: 5px
									span:first-child
										margin-right: 25px
				.detailsPic
					.title 
						@include hh(40px, 40px)
						background-color: #eee
						margin: 20px 0
						color: $theme_color
						padding-left: 15px
					.imgBox
						width: 910px
						text-align: center
						img
							width: 750px 
</style>