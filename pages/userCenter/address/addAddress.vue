<template>
	<div class="addAddress">
		<div class="container">
			<userLayout active="Address">
				<div class="addInfo" slot="userContent">
					<div class="title">Address Book</div>
					<div class="box">
						<div class="boxFrom">
							<div>
								<label><i>*</i> Full Name :</label>
								<input type="text" name="" v-model="addAddressInfo.fullName">
							</div>
							<div>
								<label><i>*</i> Phone :</label>
								<input type="text" name="" v-model="addAddressInfo.phone">
							</div>
							<div>
								<label><i>*</i> Email :</label>
								<input type="text" name="" v-model="addAddressInfo.email">
							</div>
							<div>
								<label><i>*</i> Address :</label>
								<!-- <citySelect :provinceProps="addAddressInfo.province" :cityProps="addAddressInfo.city" @changeProvince="changeProvince" @changeCity="changeCity" /> -->
								<textarea name="" style="margin-left: 0;" v-model="addAddressInfo.province" placeholder="* Please write down your detailed address in Chinese"></textarea>
							</div>
							<div>
								<textarea name=""  v-model="addAddressInfo.regionDetail" placeholder="Please write down your detailed address in English"></textarea>
							</div>
							<div class="setDefault noselect" @click="toggleDefault">
								<label v-if="addAddressInfo.isDefault == 0"><i class="iconfont icon-weixuanzhong"></i>Default</label>
								<!-- 选为默认的情况 -->
								<label  v-if="addAddressInfo.isDefault == 1" class="default"><i class="iconfont icon-xuanzhong1"></i>Default</label>
							</div>
						</div>
						<div class="btn"><button @click="saveAddress">Save</button></div>
					</div>
				</div>
			</userLayout>
			<goodsItem :titleIsShow="titleIsShow" />
		</div>
	</div>
</template>
<script>
	import goodsItem from "~/components/base/goodsItem"
	import userLayout from "~/components/user/userLayout"
	import citySelect from "~/components/base/citySelect"
	// 表单验证正则
	import v from '~/assets/js/validate'
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	export default {
		layout: 'userHome',
		middleware: 'userAuth',
		head () {
    		return {
      			title: 'Address Book'
        	}
  		},
		data() {
			return {
				titleIsShow: true,
				addAddressInfo: {
					id: '',
					fullName: '',
					phone: '',
					province: '',
					city: '',
					email: '',
					regionDetail: '',
					isDefault: 0,
				}
			}
		},
		async asyncData ({app,query}) {
			// 修改
			if (query.id) {
				let param = {
					id: query.id
				}
			 	const addAddressInfo = await app.$axios.post(interfaceApi.oneAddress,param);
			 	// 如果优惠券数量大于一则赋值优惠券默认值
			 	
	  			return { 
	  				addAddressInfo: addAddressInfo.data.data
	            }	
			} else {
			// 添加
				let addAddressInfo = {
					id: '',
					fullName: '',
					phone: '',
					province: '',
					city: '',
					email: '',
					regionDetail: '',
					isDefault: 0,
				}
				return { 
	  				addAddressInfo: addAddressInfo
	            }	
			}
		},
		components: {
			goodsItem, 
			userLayout,
			citySelect
		},
		mounted() {

		},
	  	computed: {  
		    
	  	},
		methods: {
			toggleDefault() {
				this.addAddressInfo.isDefault = this.addAddressInfo.isDefault==0?1:0;
			},
			// 修改省份
			changeProvince(province) {
				this.addAddressInfo.province = province;
			},
			// 修改城市
			changeCity(city) {
				this.addAddressInfo.city = city;
			},
			// 保存地址
			saveAddress() {
				var that = this;
				if (!v.required(that.addAddressInfo.fullName)) {
					that.$message({
			          message: 'Please enter your name!',
			          type: 'warning'
			        });
				} else if(!v.tel(that.addAddressInfo.phone)) {
					that.$message({
			          message: 'Please enter a 11-digit valid number!',
			          type: 'warning'
			        });
				} else if(!v.email(that.addAddressInfo.email)) {
					that.$message({
			          message: 'Please enter a valid email address!',
			          type: 'warning'
			        });
				} else if(!v.required(that.addAddressInfo.province)) {
					that.$message({
			          message: 'Please write down your address!',
			          type: 'warning'
			        });
				} else {
					that.saveAddressAxios();
				}
			},
			// 添加地址发送请求
			saveAddressAxios() {
				var that = this;
				that.$axios.post(interfaceApi.addAddress,that.addAddressInfo).then(res=> {
					that.$router.push({path: '/userCenter/address/addressList'});
				})
			},
		}
	}
</script>

<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'
	.addAddress
		.container
			.addInfo
				.title
					padding-bottom: 13px 
					border-bottom: $border
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
								height: 150px
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
						margin-top: 50px
						button 
							@include whch(145px, 40px, center, 40px)
							background-color: $theme_color
							color: #fff
							border-radius: $border_radius

</style>
