<template>
	<div class="goodsContent">
		<div class="bread">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item to="/">Home</el-breadcrumb-item>
			  <el-breadcrumb-item>{{$store.state.shopInfo.name}}</el-breadcrumb-item>
			  <el-breadcrumb-item>{{goodsInfo.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="productDetails container">
			<div class="goodsDetails">
				<div class="goodsDetailsBox">
					<!-- 左边 -->
					<div class="goodImg goodsLeft">
						<div class="big-img-container">
							<pic-zoom v-if="picZoomIsShow" ref="zoom" :url="goodsInfo.pic" :scale="3" :scroll="true"></pic-zoom>
                            <div v-if="!picZoomIsShow" style="width: 100%;height: 100%;display: -webkit-box;display: -ms-flexbox;display: flex;-webkit-box-pack: center;-ms-flex-pack: center;justify-content: center;-webkit-box-align: center;-ms-flex-align: center;align-items: center;overflow: hidden;position: relative;">
                                <img  style="width: 100%;" :src="goodsInfo.pic" alt="">
                            </div>
							
						</div>
					    <div class="small-img-container" style="position: relative;">
                            <!-- 商品类型图标（因为上面用到放大镜，所以图标不能使用子绝父相，因此放下面） -->
                            <img src="~static/images/sale.png" v-if="goodsInfo.type=='sale'" style="position: absolute;top: -375px;left: 5px; width: 36px;z-index: 999;" alt="">
                            <img src="~static/images/group.png" v-if="goodsInfo.type=='group'" style="position: absolute;top: -375px;left: 5px; width: 69px;z-index: 999;" alt="">
                            <img src="~static/images/duodeal.png" v-if="goodsInfo.type=='spell'" style="position: absolute;top: -375px;left: 5px; width: 69px;z-index: 999;" alt="">
					    	<div class="small-img-box" :class="{active: smallImgActiveNumber==index}" v-for="(item,index) in goodsInfo.figure" @mouseover='smallImgActive(index,item)' :key="index">
					    		<img v-lazy="item" alt="">
					    	</div>
					    </div>
					</div>
					<!-- 右边 -->
					<div class="goodsRight" style="width:538px;">
                        <!-- 拼单商品 -->
                        <div class="spell-content" v-if="goodsInfo.type == 'spell'">
                            <el-tabs v-model="goodsClassTabName" @tab-click="handleTabClick">
                                <el-tab-pane label="Duo Deal" name="spell">
                                    <div>
                                        <p>{{goodsInfo.title}}</p>
                                        <div class="box">
                                            <div class="list">

                                                <!-- 普通商品 -->
                                                <!-- 页面加载的时候显示价格 -->
                                                <div class="row-item rowPrice" :class="{redPrice: goodsInfo.type=='group'}" v-if="!skuInfo && !skuInfo">
                                                    <span>Price</span>
                                                    <div>
                                                        <el-badge :value="goodsInfo.type=='none'?'':goodsInfo.type=='sale'?'SALE':goodsInfo.type=='group'?'GROUPBUY':'Duo Deal' " class="item">
                                                            <el-button size="small" v-if="goodsInfo.minPrice != goodsInfo.maxPrice">¥ {{goodsInfo.minPrice}} - ￥{{goodsInfo.maxPrice}}</el-button>
                                                            <el-button size="small" v-if="goodsInfo.minPrice == goodsInfo.maxPrice">¥ {{goodsInfo.minPrice}}</el-button>
                                                        </el-badge>
                                                    </div>
                                                    <div class="GroupCountDown" v-if="goodsInfo.type=='group'">
                                                        <count-down v-on:start_callback="countDownS_cb(1)" v-on:end_callback="countDownE_cb(1)" :currentTime="goodsInfo.group.currentTime" :startTime="goodsInfo.group.currentTime" :endTime="Number(goodsInfo.group.endTime)" :tipText="''" :tipTextEnd="''" :endText="'Closed'" :dayTxt="'Days '" :hourTxt="':'" :minutesTxt="':'" :secondsTxt="''"></count-down>
                                                    </div>
                                                </div>
                                                <!-- 选择sku显示价格 -->
                                                <div class="row-item rowPrice" v-if="skuInfo && skuInfo.type=='spell'">
                                                    <span>Price</span>
                                                    <div>
                                                        <el-badge value="Duo Deal" class="item">
                                                            <el-button size="small">¥ {{skuInfo.spellPrice}}</el-button>
                                                        </el-badge>
                                                    </div>
                                                </div>
                                                <div class="spell" v-if="goodsInfo.type == 'spell' && goodsInfo.spellInfo.spellList.length > 0">
                                                    <div>Group Buy List</div>
                                                    <div class="row-item" v-for="(item,index) in goodsInfo.spellInfo.spellList" :key="index">                                        
                                                        <span class="type"></span>
                                                        <div class="spell-list">
                                                            <div>
                                                                <img :src="item.headimg_url" alt="">
                                                                <i>{{item.nickname}}</i>
                                                            </div>
                                                            <div>
                                                                <div>
                                                                    Only <i class="theme_color">{{item.number_left}}</i> Vacancy Left
                                                                </div>
                                                                <div>
                                                                    <count-down :currentTime="item.currentTime" :startTime="item.currentTime" :endTime="Number(item.endTime)" :tipText="''" :tipTextEnd="''" :endText="'Closed'" :dayTxt="'Days '" :hourTxt="':'" :minutesTxt="':'" :secondsTxt="''"></count-down>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <button @click="scqrcode('join',item.orderNumber)">Join Now</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="row-item" v-if="!(goodsInfo.overReduce.length == 0 && goodsInfo.couponList.length == 0)">
                                                    <span>Special Offers</span>
                                                    <div class="special-offers">
                                                        <div v-if="goodsInfo.overReduce.length != 0">
                                                            <i class="reduce">￥{{goodsInfo.overReduce.over}}-{{goodsInfo.overReduce.reduce}}</i>
                                                            <em>{{goodsInfo.overReduce.name}}</em>
                                                        </div>
                                                        <div v-if="goodsInfo.couponList.length>0">
                                                            <i class="coupon">RMB{{goodsInfo.couponList[0].reduce}}</i>
                                                            <em>{{goodsInfo.couponList[0].name}}</em>
                                                            <em class="get" @click="getCoupon">GET</em>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- <div class="row-item">
                                                    <span>Shipping</span>
                                                    <div>
                                                        <span>¥ 10.00</span>
                                                        <span class="forFree">Free delivery for RMB99 purchase and up</span>
                                                    </div>
                                                </div> -->
                                                <div :class="{'group-border': groupBorder}" style="width: 500px;">
                                                    <div class="title" v-if="groupBorder">
                                                        Please choose your preferred options!
                                                        <i class="iconfont icon-close" @click="closeGroupBorder"></i>
                                                    </div>
                                                    <div class="row-item" v-for="(item,key) in list.result" :key="key">
                                                        <span class="type">{{key}}</span>
                                                        <div class="btn">
                                                            <span v-for="(value,index) in item" class="noselect" v-bind:class="{selected: value.active, soldOut: !value.active && value.disabled}"  @click="handleActive(key, value)" :key="index">{{ value.name }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="row-item">
                                                        <span class="type">Quantity</span>
                                                        <div v-if="!skuInfo">
                                                            <el-input-number size="small" :max="Number(goodsInfo.sumStock)" :min="1" v-model="num1"></el-input-number>
                                                        </div>
                                                        <div v-if="skuInfo">
                                                            <el-input-number size="small" :max="Number(skuInfo.stock)" :min="1" v-model="num1"></el-input-number>
                                                        </div>
                                                        <!-- 当前商品所有库存 -->
                                                        <div v-if="!skuInfo">
                                                            <span class="stock">Stock: {{goodsInfo.sumStock}}</span>
                                                        </div>
                                                        <!-- 选择单个sku的库存 -->
                                                        <div v-if="skuInfo">
                                                            <span class="stock">Stock: {{skuInfo.stock}}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="buy row-item" v-show="!groupBorder">
                                                    
                                                    <button class="start-duo-deal" @click="scqrcode('buy',goodsInfo.id)">Start Duo Deal</button>
                                                </div>
                                                
                                                <div class="tips row-item">
                                                    <span class="noselect" :class="{theme_color: goodsInfo.isCollect==1}" @click="favourite"><i class="iconfont icon-review"></i>favourite</span>
                                                    <span @click="showChat"><i class="iconfont icon-kefu"></i>Customer Service</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </el-tab-pane>
                                <el-tab-pane label="Original Price" name="original">
                                    <div>
                                        <p>{{goodsInfo.title}}</p>
                                        <div class="box">
                                            <div class="list">

                                                <!-- 普通商品 -->
                                                <!-- 页面加载的时候显示价格 -->
                                                <div class="row-item rowPrice" :class="{redPrice: goodsInfo.type=='group'}" v-if="!skuInfo && !skuInfo">
                                                    <span>Price</span>
                                                    <div>
                                                        <el-badge class="item">
                                                            <el-button size="small" v-if="goodsInfo.minPrice != goodsInfo.maxPrice">¥ {{goodsInfo.minPrice}} - ￥{{goodsInfo.maxPrice}}</el-button>
                                                            <el-button size="small" v-if="goodsInfo.minPrice == goodsInfo.maxPrice">¥ {{goodsInfo.minPrice}}</el-button>
                                                        </el-badge>
                                                    </div>
                                                    <div class="GroupCountDown" v-if="goodsInfo.type=='group'">
                                                        <count-down v-on:start_callback="countDownS_cb(1)" v-on:end_callback="countDownE_cb(1)" :currentTime="goodsInfo.group.currentTime" :startTime="goodsInfo.group.currentTime" :endTime="Number(goodsInfo.group.endTime)" :tipText="''" :tipTextEnd="''" :endText="'Closed'" :dayTxt="'Days '" :hourTxt="':'" :minutesTxt="':'" :secondsTxt="''"></count-down>
                                                    </div>
                                                </div>
                                                <!-- 选择sku显示价格 -->
                                                <div class="row-item rowPrice" v-if="skuInfo && skuInfo.type=='spell'">
                                                    <span>Price</span>
                                                    <div>
                                                        <el-badge class="item">
                                                            <el-button size="small">¥ {{skuInfo.price}}</el-button>
                                                        </el-badge>
                                                    </div>
                                                </div>
                                                <div class="row-item" v-if="!(goodsInfo.overReduce.length == 0 && goodsInfo.couponList.length == 0)">
                                                    <span>Special Offers</span>
                                                    <div class="special-offers">
                                                        <div v-if="goodsInfo.overReduce.length != 0">
                                                            <i class="reduce">￥{{goodsInfo.overReduce.over}}-{{goodsInfo.overReduce.reduce}}</i>
                                                            <em>{{goodsInfo.overReduce.name}}</em>
                                                        </div>
                                                        <div v-if="goodsInfo.couponList.length>0">
                                                            <i class="coupon">RMB{{goodsInfo.couponList[0].reduce}}</i>
                                                            <em>{{goodsInfo.couponList[0].name}}</em>
                                                            <em class="get" @click="getCoupon">GET</em>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- <div class="row-item">
                                                    <span>Shipping</span>
                                                    <div>
                                                        <span>¥ 10.00</span>
                                                        <span class="forFree">Free delivery for RMB99 purchase and up</span>
                                                    </div>
                                                </div> -->
                                                <div :class="{'group-border': groupBorder}" style="width: 500px;">
                                                    <div class="title" v-if="groupBorder">
                                                        Please choose your preferred options!
                                                        <i class="iconfont icon-close" @click="closeGroupBorder"></i>
                                                    </div>
                                                    <div class="row-item" v-for="(item,key) in list.result" :key="key">
                                                        <span class="type">{{key}}</span>
                                                        <div class="btn">
                                                            <span v-for="(value,index) in item" class="noselect" v-bind:class="{selected: value.active, soldOut: !value.active && value.disabled}"  @click="handleActive(key, value)" :key="index">{{ value.name }}</span>
                                                        </div>
                                                    </div>
                                                    <div class="row-item">
                                                        <span class="type">Quantity</span>
                                                        <div v-if="!skuInfo">
                                                            <el-input-number size="small" :max="Number(goodsInfo.sumStock)" :min="1" v-model="num1"></el-input-number>
                                                        </div>
                                                        <div v-if="skuInfo">
                                                            <el-input-number size="small" :max="Number(skuInfo.stock)" :min="1" v-model="num1"></el-input-number>
                                                        </div>
                                                        <!-- 当前商品所有库存 -->
                                                        <div v-if="!skuInfo">
                                                            <span class="stock">Stock: {{goodsInfo.sumStock}}</span>
                                                        </div>
                                                        <!-- 选择单个sku的库存 -->
                                                        <div v-if="skuInfo">
                                                            <span class="stock">Stock: {{skuInfo.stock}}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="buy row-item" v-show="!groupBorder">
                                                    <button @click="buyNow">Buy Now</button>
                                                    <button @click="addToCart('spell')">Add To Cart</button>
                                                </div>
                                                <div class="tips row-item">
                                                    <span class="noselect" :class="{theme_color: goodsInfo.isCollect==1}" @click="favourite"><i class="iconfont icon-review"></i>favourite</span>
                                                    <span @click="showChat"><i class="iconfont icon-kefu"></i>Customer Service</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </el-tab-pane>
                            </el-tabs>
                        </div>
                        <!-- 非拼单商品 -->
						<div v-else>
                            <p>{{goodsInfo.title}}</p>
                            <div class="box">
                                <div class="list">

                                    <!-- 普通商品 -->
                                    <!-- 页面加载的时候显示价格 -->
                                    <div class="row-item rowPrice" :class="{redPrice: goodsInfo.type=='group'}" v-if="!skuInfo && !skuInfo">
                                        <span>Price</span>
                                        <div>
                                            <el-badge :value="goodsInfo.type=='none'?'':goodsInfo.type=='sale'?'SALE':goodsInfo.type=='group'?'GROUPBUY':'Duo Deal' " class="item">
                                                <el-button size="small" v-if="goodsInfo.minPrice != goodsInfo.maxPrice">¥ {{goodsInfo.minPrice}} - ￥{{goodsInfo.maxPrice}}</el-button>
                                                <el-button size="small" v-if="goodsInfo.minPrice == goodsInfo.maxPrice">¥ {{goodsInfo.minPrice}}</el-button>
                                            </el-badge>
                                        </div>
                                        <div class="GroupCountDown" v-if="goodsInfo.type=='group'">
                                            <count-down v-on:start_callback="countDownS_cb(1)" v-on:end_callback="countDownE_cb(1)" :currentTime="goodsInfo.group.currentTime" :startTime="goodsInfo.group.currentTime" :endTime="Number(goodsInfo.group.endTime)" :tipText="''" :tipTextEnd="''" :endText="'Closed'" :dayTxt="'Days '" :hourTxt="':'" :minutesTxt="':'" :secondsTxt="''"></count-down>
                                        </div>
                                    </div>
                                    <!-- 选择sku显示价格 -->
                                    <!-- 普通商品 -->
                                    <div class="row-item rowPrice" v-if="skuInfo && skuInfo.type=='none'">
                                        <span>Price</span>
                                        <div>
                                            <el-badge value="" class="item">
                                                <el-button size="small">¥ {{skuInfo.price}}</el-button>
                                            </el-badge>
                                        </div>
                                    </div>
                                    <!-- 促销商品 -->
                                    <div class="row-item rowPrice" v-if="skuInfo && skuInfo.type=='sale'">
                                        <span>Price</span>
                                        <div>
                                            <el-badge value="SALE" class="item">
                                                <el-button size="small">¥ {{skuInfo.price}}</el-button>
                                            </el-badge>
                                            <del v-if="skuInfo.originalPrice">¥ {{skuInfo.originalPrice}}</del>
                                        </div>
                                    </div>
                                    <!-- 团购商品 -->
                                    <div class="row-item rowPrice redPrice" v-if="skuInfo && skuInfo.type=='group'">
                                        <span class="price">Price</span>
                                        <div>
                                            <el-badge value="GROUPBUY" class="item">
                                                <el-button size="small">¥ {{skuInfo.price}}</el-button>
                                            </el-badge>
                                            <del class="del" style="color:#fff;" v-if="skuInfo.originalPrice">¥ {{skuInfo.originalPrice}}</del>
                                        </div>
                                        <div class="GroupCountDown">
                                            <count-down v-on:start_callback="countDownS_cb(1)" v-on:end_callback="countDownE_cb(1)" :currentTime="skuInfo.currentTime" :startTime="skuInfo.currentTime" :endTime="Number(skuInfo.endTime)" :tipText="''" :tipTextEnd="''" :endText="'Closed'" :dayTxt="'Days '" :hourTxt="':'" :minutesTxt="':'" :secondsTxt="''"></count-down>
                                        </div>
                                    </div>
                                    <div class="row-item" v-if="!(goodsInfo.overReduce.length == 0 && goodsInfo.couponList.length == 0)">
                                        <span>Special Offers</span>
                                        <div class="special-offers">
                                            <div v-if="goodsInfo.overReduce.length != 0">
                                                <i class="reduce">￥{{goodsInfo.overReduce.over}}-{{goodsInfo.overReduce.reduce}}</i>
                                                <em>{{goodsInfo.overReduce.name}}</em>
                                            </div>
                                            <div v-if="goodsInfo.couponList.length>0">
                                                <i class="coupon">RMB{{goodsInfo.couponList[0].reduce}}</i>
                                                <em>{{goodsInfo.couponList[0].name}}</em>
                                                <em class="get" @click="getCoupon">GET</em>
                                            </div>
                                        </div>
                                    </div>
                                    <!-- <div class="row-item">
                                        <span>Shipping</span>
                                        <div>
                                            <span>¥ 10.00</span>
                                            <span class="forFree">Free delivery for RMB99 purchase and up</span>
                                        </div>
                                    </div> -->
                                    <div :class="{'group-border': groupBorder}" style="width: 525px;">
                                        <div class="title" v-if="groupBorder">
                                            Please choose your preferred options!
                                            <i class="iconfont icon-close" @click="closeGroupBorder"></i>
                                        </div>
                                        <div class="row-item" v-for="(item,key) in list.result" :key="key">
                                            <span class="type">{{key}}</span>
                                            <div class="btn">
                                                <span v-for="(value,index) in item" class="noselect" v-bind:class="{selected: value.active, soldOut: !value.active && value.disabled}"  @click="handleActive(key, value)" :key="index">{{ value.name }}</span>
                                            </div>
                                        </div>
                                        <div class="row-item">
                                            <span class="type">Quantity</span>
                                            <div v-if="!skuInfo">
                                                <el-input-number size="small" :max="Number(goodsInfo.sumStock)" :min="1" v-model="num1"></el-input-number>
                                            </div>
                                            <div v-if="skuInfo">
                                                <el-input-number size="small" :max="Number(skuInfo.stock)" :min="1" v-model="num1"></el-input-number>
                                            </div>
                                            <!-- 当前商品所有库存 -->
                                            <div v-if="!skuInfo">
                                                <span class="stock">Stock: {{goodsInfo.sumStock}}</span>
                                            </div>
                                            <!-- 选择单个sku的库存 -->
                                            <div v-if="skuInfo">
                                                <span class="stock">Stock: {{skuInfo.stock}}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="buy row-item" v-show="!groupBorder">
                                        <button @click="buyNow">Buy Now</button>
                                        <button @click="addToCart('none')">Add To Cart</button>
                                    </div>
                                    <div class="tips row-item">
                                        <span class="noselect" :class="{theme_color: goodsInfo.isCollect==1}" @click="favourite"><i class="iconfont icon-review"></i>favourite</span>
                                        <span @click="showChat"><i class="iconfont icon-kefu"></i>Customer Service</span>
                                    </div>
                                </div>
                            </div>
                        </div>
					</div>
                    
				</div>
				<div class="detailsPic">
                    <el-tabs v-model="activeName" @tab-click="handleReviewsClick">
                        <el-tab-pane label="Details" name="first">
                            <div class="imgBox" v-html="goodsInfo.detail"></div>
                            <div class="imgBox">
                                <p>
                                    <img src="~static/images/bottom-img.jpg" alt="">
                                </p>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="Review" name="second">
                            <div class="reviews">
                                <div class="reviews-title">
                                    <span @click="allOrImg(0)" :class="{active:cur==0}" class="reviews-btn">All</span>
                                    <span @click="allOrImg(1)" :class="{active:cur==1}" class="reviews-btn">With image</span>
                                </div>
                                <div class="reviews-content">
                                    <reviewsItem v-for="item in reviewsData" :key="item._id" :data="item.data" />
                                    <div class="changePage" v-if="reviewsData.length>0">
                                        <el-pagination
                                            background
                                            layout="prev, pager, next"
                                            :current-page.sync="currentPage"
                                            @size-change="handleSizeChange"
                                            @current-change="handleCurrentChange"
                                            :total="totalPage * 10" v-if="reviewsData.length>0">
                                        </el-pagination>
                                    </div>
                                    <div class="no-comment" v-else>
                                        Be the first to review!
                                    </div>
                                </div>
                            </div>
                            
                        </el-tab-pane>
                    </el-tabs>
					<!-- <div class="title"><span>Details</span><span>Reviews (42)</span></div> -->
					
                    <div v-if="goodsInfo.categoryName == 25">
                        <img style="width: 750px;height:auto;display: block;margin: 0 auto;" src="http://api.mall.thatsmags.com/Public/ckfinder/images/special.jpg" alt="">
                    </div>
				</div>
			</div>

			<moreGoods :featuredGoods="goodsInfo.recommend"/>
		</div>
        <!-- 领券模态框 -->
        <div class="coupon-layer">
            <el-dialog :title="'Coupon(' + goodsInfo.couponList.length + ')'" :visible.sync="dialogCouponVisible">
                <div class="get-group-list">
                    <div class="item" v-for="(item,index) in goodsInfo.couponList" :key="index">
                        <img src="~static/images/quan-bg.png">
                        <div class="content">
                            <div class="left">
                                <em>￥</em>{{item.reduce}}
                            </div>
                            <div class="right">
                                <div class="title">{{item.name}}
                                    <span v-if="item.isGet==0" @click="getCouponItem(item.couponId,index)">GET</span>
                                    <span class="Collected" v-if="item.isGet==1">Collected</span>
                                </div>
                                <div class="reduce">For Order to <em>RMB{{item.over}}</em> or More</div>
                                <div class="time">{{item.startTime}}-{{item.endTime}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-dialog>
        </div>
        <!-- 关注公众号二维码 -->
        <div class="follow-box">
            <el-dialog title="Scan QR code for customer service" :visible.sync="follow">
                <img width="100%" height="auto" src="~static/images/thmartCode.jpg" alt="">
            </el-dialog>
        </div>
        <!-- 拼单二维码 -->
        <div class="follow-box">
            <el-dialog title="Scan the code to purchase" :visible.sync="spellCode">
                <div v-if="spellCode" id="qrcode" ref="qrcode"></div>
            </el-dialog>
        </div>
	</div>
</template>
<script>
	import moreGoods from "~/components/base/moreGoods"
	import PicZoom from "~/components/base/PicZoom"
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
    // 提示语
    import prompt from '~/assets/js/prompt'
    import CountDown from "~/components/base/countDown"
    import reviewsItem from "~/components/base/reviewsItem"
	export default {
		layout: 'shopHome',
        head () {
            return {
                title: this.goodsInfo.title
            }
        },
		props: {

	    },
		data(){
            return{
                goodsClassTabName: 'spell',   // 控制显示普通商品信息展示，还是拼单商品信息展示
                cur: 0, //评论有图，没有图标识
                activeName: 'first', //商品详情和评论 tab标识
                reviewsParam: {
                    page: 1,
                    pageSize: 10,
                    hasPic: 0
                },
                reviewsData: [],
                currentPage: 1, //评论页数
            	num1: 1,
            	smallImgActiveNumber: -1,
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
                skuInfo: null,
                styleObj: {
                    'border': '2px solid #c00',
                    'margin': '10px 0',
                    'padding-bottom': '15px'
                },
                groupBorder: false,
                hasGroupPrice: false,
                dialogCouponVisible: false,
                picZoomIsShow: true,
                follow: false, //关注公众号
                spellCode: false, //扫码走移动端拼单流程
                // onlyOne: false //当生成一次二维码就不能生成第二次了
	        }
        },
        async asyncData ({app,params,store}) {
        	console.log(params)
			let param = {
				id: params.id,
			}
		 	const goodsInfo = await app.$axios.post(interfaceApi.goodsDeatail,param);
            store.commit('SET_SHOP_INFO',goodsInfo.data.data.brand);
  			return {
  				goodsInfo: goodsInfo.data.data
            }
		},
		components: {
			moreGoods,
			PicZoom,
            CountDown,
            reviewsItem
		},
		mounted() {
			this.skuInitData(this.goodsInfo.skuList);
			this.getTextareaData();
		},
	  	computed: {

	  	},
        beforeRouteLeave (to, from, next) { // 如果没有配置回到顶部按钮或isBounce,则beforeRouteLeave不用写con
            this.picZoomIsShow = false;
            next()
        },
		methods:{
            handleTabClick() {
                console.log(123);
            },
            scqrcode(flag,orderNumber) {
                this.spellCode = true;
                this.$nextTick(() => {
                    this.qrcode(flag,orderNumber);
                })
            },
            qrcode (flag,orderNumber) {
                // this.onlyOne = true;
                if(flag=='buy') {
                    let qrcode = new this.$QRCode('qrcode',{
                        width: 300, // 设置宽度，单位像素
                        height: 300, // 设置高度，单位像素
                        text: 'http://mob.thmart.com.cn/GoodsDetails?id=' + orderNumber // 设置二维码内容或跳转地址
                    })
                } else {
                    let qrcode = new this.$QRCode('qrcode',{
                        width: 300, // 设置宽度，单位像素
                        height: 300, // 设置高度，单位像素
                        text: 'http://mob.thmart.com.cn/shareShow?id=' + orderNumber // 设置二维码内容或跳转地址
                    })
                }
                
            },
            handleReviewsClick(tab, event) {
                // console.log(event)
                var that = this;
                if (that.activeName == 'second') {
                    if (that.reviewsData.length == 0) {
                        that.getReviewsData();
                        that.goBackTop();
                    }
                }
            },
            allOrImg(flag) {
                var that = this;
                that.cur = flag;
                if (flag == 0) {
                    that.reviewsParam = {
                        page: 1,
                        pageSize: 10,
                        hasPic: 0
                    }
                } else if (flag == 1) {
                    that.reviewsParam = {
                        page: 1,
                        pageSize: 10,
                        hasPic: 1
                    }
                }
                that.getReviewsData();
            },
            getReviewsData() {
                var that = this;
                var reviewsParam = that.reviewsParam;
                reviewsParam.id = that.goodsInfo.id;
                that.$axios.post(interfaceApi.getGoodsReviews,reviewsParam).then(res=> {
                    console.log(res);
                    that.reviewsData = res.data.data.data;
                    that.totalPage = res.data.data.totalPage;
                });
            },
            // 改变页数
			handleSizeChange(val) {
                this.reviewsParam.page=val;
                this.getReviewsData();
                this.goBackTop();
		    },
		    // 上下页
		    handleCurrentChange(val) {
		        this.reviewsParam.page=val;
                this.getReviewsData();
                this.goBackTop();
            },
            goBackTop() {
				document.body.scrollTop = 760
				document.documentElement.scrollTop = 760
			},
            showChat() {
                this.follow = true;
            },
            getCouponItem(couponId,index) {
                var that = this;
                console.log(couponId);
                const param = {
                    id: couponId
                }
                that.$axios.post(interfaceApi.getCoupon,param).then(res=> {
                    that.goodsInfo.couponList[index].isGet = 1;
                });
            },
            // 点击get显示券列表
            getCoupon() {
                const that = this;
                // 公共函数里面的方法
                if (!that.user.isLogin()) {
                    that.$store.commit('LOGIN',true);
                } else {
                    this.dialogCouponVisible = true;
                }
            },
            countDownS_cb: function (x) {
                console.log(x)
            },
            countDownE_cb: function (x) {
                this.$alert('This Flash Sale has expired, thank you for your participation.', '', {
                  confirmButtonText: 'Done',
                  callback: action => {
                    location.reload();
                  }
                });
            },

			// 获取单个sku信息
            getSkuId(id) {
            	const that = this;
            	const param = {
            		id: id
            	}
				that.$axios.post(interfaceApi.getSkuInfo,param).then(res=> {
					that.skuInfo = res.data.data;
					that.goodsInfo.pic = that.skuInfo.pic;
					that.smallImgActiveNumber = -1;
                    that.groupBorder = false;
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
			      		// that.$router.push({path: '/loginModule/login'});
                        that.$store.commit('LOGIN',true);
			      	} else if (that.skuInfo.stock == 0) {
                        that.$message({
                            message: 'low stocks',
                            type: 'warning'
                        });
                    } else {
			      		that.$router.push({path:'/payProcess/orderConfirm',query: {skuId: that.skuId, number: that.num1}})
			      	}
	  			} else {
	  				that.groupBorder = true;
	  			}
            },
            // 加入购物车 flag标识是否为拼单商品加入购物车（拼单商品能加入购物车，购物车显示原价）
            addToCart(flag) {
            	var that = this;
            	if (that.mustChooseAll()) {
            		// 公共函数里面的方法
			      	if (!that.user.isLogin()) {
			      		that.$store.commit('LOGIN',true);
			      	} else if (that.skuInfo.stock == 0) {
                        that.$message({
                            message: 'low stocks',
                            type: 'warning'
                        });
                    } else {
			      		that.addToCartAjax(flag);
			      	}
	  			} else {
	  				that.groupBorder = true;
	  			}
            },
            addToCartAjax(flag) {
                const that = this;
                if(flag == 'spell') {
                    var param = {
                        goodsId: that.goodsInfo.id,
                        skuId: that.skuId,
                        number: that.num1,
                        isprimecost: 1
                    }
                } else {
                    var param = {
                        goodsId: that.goodsInfo.id,
                        skuId: that.skuId,
                        number: that.num1
                    }
                }
                
                that.$axios.post(interfaceApi.addCart,param).then(res=> {
                    that.$notify({
                      title: 'Add shopping cart success',
                      message: '',
                      type: 'success'
                    });
                })
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
	  		smallImgActive(index,item) {
	  			this.smallImgActiveNumber = index;
                this.goodsInfo.pic = item;
	  		},
            // 关闭购买提示框
            closeGroupBorder() {
                this.groupBorder = false;
            },
            favourite() {

                const that = this;
                // 公共函数里面的方法
                if (!that.user.isLogin()) {
                    that.$store.commit('LOGIN',true);
                } else {
                    that.goodsInfo.isCollect = this.goodsInfo.isCollect==1?0:1;
                    const param = {
                        contentId: that.goodsInfo.id,
                        type: 1,
                        isCollect: that.goodsInfo.isCollect
                    }
                    that.$axios.post(interfaceApi.Collect,param).then(res=> {
                        // that.$notify({
                        //   title: '收藏成功',
                        //   message: '',
                        //   type: 'success'
                        // });
                    });
                }

            }
        },
	  	watch: {
            skuId: function(newVal,oldVal) {
            	this.number = 1;
                this.num1 = 1;
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
                            margin-right: 5px
                            img
                                float: left
                                @include wh(100%, 100%)
                        .small-img-box.active
                            border: 1px solid #F9421E
                .goodsRight
                    float: left
                    .spell-content
                        border: 1px solid #F9421E
                        border-radius: 4px
                        overflow: hidden
                        margin-bottom: 20px
                        .el-tab-pane
                            padding: 0 10px
                        .box
                            width: 500px
                    .box
                        width: 540px
                        .list
                            overflow: hidden
                            .spell
                                margin-top: 10px
                                color: #666
                                .spell-list
                                    width: 420px
                                    height: 60px
                                    line-height: 60px
                                    >div
                                        float: left
                                    >div:nth-child(1)
                                        font-size: 16px
                                        width: 30%
                                        img
                                            width: 50px
                                            height: 50px
                                            float: left
                                            border-radius: 50%
                                            margin-right: 10px
                                        i
                                            float: left
                                            font-size: 16px
                                    >div:nth-child(2)
                                        width: 35%
                                        >div:nth-child(1)
                                            font-size: 14px
                                            color: #222
                                            height: 20px
                                            line-height: 20px
                                            margin-top: 12px
                                        >div:nth-child(2)
                                            font-size: 12px
                                            height: 16px
                                            color: #666
                                            line-height: 16px
                                            text-align: center
                                    >div:nth-child(3)
                                        
                                        text-align: right
                                        button
                                            width: 135px
                                            height: 28px
                                            border-radius: 20px
                                            background-color: #F9421E
                                            color: #fff
                            >.row-item.rowPrice
                                background-color: #eee
                                height: 48px
                                span
                                    margin-top: 17px
                                    @include sc(14px, #666)
                                >div
                                    margin-top: 13px
                                    del
                                        @include sc(14px, #999)
                                        margin-left: 75px

                            .row-item
                                margin-top: 15px
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
                                margin: 30px 0 20px 0
                                button
                                    @include whch(180px, 40px, center, 40px)
                                    background-color: $theme_color
                                    @include sc(16px, #fff)
                                    border-radius: $border_radius
                                button:first-child
                                    margin-right: 40px
                                button.start-duo-deal
                                    margin-left: 160px
                            .tips
                                margin-bottom: 20px
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
                    img
                        width: 750px
.no-comment
    height: 400px
    line-height: 400px
    text-align: center
    color: #666
#qrcode
    width: 300px
    height: 300px
    margin: 10px auto
</style>
