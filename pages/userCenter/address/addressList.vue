<template>
	<div class="address">
		<div class="container">
			<userLayout active="Address">
				<div class="addressList" slot="userContent">
					<div class="title">
						<span>Address Book</span>
						<nuxt-link to="/userCenter/address/addAddress">+ Add New Shipping Address</nuxt-link>
					</div>
					<div class="addressBox" v-if="addressList.data.length>0" v-for="(item,index) in addressList.data" :key="item.id">
						<div class="box">
							<div class="left">
								<p>
									<span>Name</span>
									<span>{{item.fullName}}</span>
								</p>
								<p>
									<span>Phone</span>
									<span>{{item.phone}}</span>
								</p>
								<p>
									<span>Email</span>
									<span>{{item.email}}</span>
								</p>
								<p>
									<span>Address</span>
									<span>{{item.province}}{{item.city}}{{item.regionDetail}}</span>
								</p>
							</div>
							<div class="right">
								<!-- 去掉default这个class 取消默认 -->
								<p class="default noselect" :class="{active: item.isDefault==1}" @click="setDefault(item,index)"><i class="iconfont icon-duihao"></i> Default</p>
								<p class="noselect edit" @click="editAddr(item.id)"><i class="iconfont icon-bianji"></i> Edit</p>
								<p class="noselect edit"></p>
								<p class="noselect delete" @click="deleteAdrr(item,index)"><i class="iconfont icon-shanchu"></i> Delete</p>
							</div>
						</div>
					</div>
					<!-- 没有地址的情况 -->
					<div class="noAddress" v-if="addressList.data.length==0"><p>No more address</p></div>
					<div class="changePage" v-if="addressList.totalPage!=0">
						<el-pagination
						  	background
						  	layout="prev, pager, next"
						  	:current-page.sync="currentPage"
							@size-change="handleSizeChange"
		      				@current-change="handleCurrentChange"
						  	:total="addressList.totalPage * 10">
						</el-pagination>
					</div>
				</div>
			</userLayout>
	
		</div>
	</div>
</template>
<script>
	import goodsItem from "~/components/base/goodsItem"
	import userLayout from "~/components/user/userLayout"
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	export default {
		layout: 'userHome',
		head () {
    		return {
      			title: 'Address Book'
        	}
  		},
		data() {
			return {
				titleIsShow: true,
				currentPage: 1
			}
		},
		middleware: 'userAuth',
		async asyncData ({app,query}) {
			let param = {
				pageSize: 10,
				page: 1
			}
			let param2 = {
				id: 12,
				pageSize: 30,
				page: 0,
				sort: 'order_asc'
			}
		 	
		 	const hotData = await app.$axios.post(interfaceApi.adsList,param2);
		 	const addressList = await app.$axios.post(interfaceApi.addressList,param);
  			return { 
  				addressList: addressList.data.data,
  				hotData: hotData.data.data.data
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
					pageSize: 10
				}
				that.$axios.post(interfaceApi.addressList,param).then(res=> {
					that.addressList = res.data.data;
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
		    // 删除地址
		    deleteAdrr(item,index) {
				this.$confirm('Are you sure to delete this address?', '', {
					confirmButtonText: 'Done',
					cancelButtonText: 'Cancel',
					type: 'warning'
				}).then(() => {
					this.deleteAddrAxios(item.id,index);
				}).catch(() => {
					       
				});
		    },
		    // 删除地址
		    deleteAddrAxios(id,index) {
		    	var that = this;
				var param = {
					id: id
				}
				that.$axios.post(interfaceApi.deleteAddAddress,param).then(res=> {
					that.addressList.data.splice(index,1);
				})
		    },
		    // 修改默认地址
		    setDefault(item,index) {
		    	this.setDefaultAxios(item.id,index);
		    },
		    // 修改默认地址
		    setDefaultAxios(id,index) {
		    	var that = this;
				var param = {
					id: id
				}
				that.$axios.post(interfaceApi.changeDefault,param).then(res=> {
					for (var i = 0; i < that.addressList.data.length; i++) {
						that.addressList.data[i].isDefault = 0;
					}
					that.addressList.data[index].isDefault = 1;
				})
		    },
		    // 编辑地址
		    editAddr(id) {
		    	this.$router.push({name: 'userCenter-address-addAddress',query: {id: id}});
		    }
		}
	}
</script>

<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'
	.address
		.container
			.addressList
				.title
					overflow: hidden
					border-bottom: $border
					padding-bottom: 15px
					span
						float: left
						display: inline-block 
						padding-top: 5px
					a
						float: right
						padding: 3px 7px
						border: $border
						color: #666
						border-radius: $border_radius
					a:hover 
						color: $theme_color
						border: 1px solid $theme_color
				.box 
					background-color: #eee
					margin-top: 15px
					overflow: hidden
					padding-left: 0
					.left
						float: left
						p 
							margin: 15px 0 15px 15px
							span:first-child
								display: inline-block
								width: 75px
							span:nth-child(2)
								font-size: 14px
								color: #666
					.right 
						float: right
						p 
							font-size: 14px
							color: #666
							cursor: pointer
							i 
								font-size: 16px
								padding-right: 5px
						p.default
							padding: 15px 15px 7px 15px
						p.active
							color: $theme_color
						p.edit 
							padding: 8px 15px 7px 15px
						p.delete 
							padding: 8px 15px 15px 15px
			.noAddress
				position: relative
				height: 376px
				p
					@include center
					color: #999
</style>
