<template>
	<div class="user">
		<div class="container">
			<userLayout active="userInfo">
				<div class="userInfo" slot="userContent">
					<div class="title">Personal Info</div>
					<div class="info">
						<div>
							<span>Profile Photo :</span>
							<div class="photo">
								<div><img :src="$store.state.headimgurl" alt=""></div>
								<button class="photoBtn">Edit</button>
								<input @change="change" type="file" name="file" class="imgForm" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg">
							</div>
						</div>
						<div>
							<span>Username :</span>
							<div class="name">
								<span @click="changeName">{{$store.state.nickname}}<i class="iconfont icon-bianji"></i></span>
							</div>
						</div>
						<div>
							<span class="changePassword">Change Password :</span>
							<div class="password">
								<span class="noselect" @click="resetPassword">Reset</span>
							</div>
						</div>
					</div>
				</div>
			</userLayout>
			<el-dialog title="Change Password" :visible.sync="dialogFormVisible">
			  	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
					<el-form-item label="Current Password" prop="oldPassword">
						<el-input type="password" v-model="ruleForm.oldPassword"></el-input>
					</el-form-item>
					<el-form-item label="New Password" prop="password">
						<el-input type="password" v-model="ruleForm.password"></el-input>
					</el-form-item>
					<el-form-item label="New Password" prop="rePassword">
						<el-input type="password" v-model="ruleForm.rePassword"></el-input>
					</el-form-item>
					<el-form-item>
					    <el-button type="danger" @click="submitForm('ruleForm')">Revision</el-button>
					    <el-button type="info" @click="resetForm('ruleForm')">Reset</el-button>
					</el-form-item>
				</el-form>
			</el-dialog>
			<goodsItem :titleIsShow="titleIsShow" :hotData='hotData' />
		</div>
	</div>
</template>
<script>
		// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	// 验证正则
	import v from "~/assets/js/validate"
	// 设置cookie
	import Cookie from 'js-cookie'
	import goodsItem from "~/components/base/goodsItem"
	import userLayout from "~/components/user/userLayout"
	export default {
		layout: 'userHome',
		middleware: 'userAuth',
		head () {
    		return {
      			title: 'Personal Info'
        	}
  		},
		data() {
			var pass = (rule, value, callback) => {
				if (value == '') {
					callback(new Error('Please enter your original password!'));
				} else if (!v.password(value)) {
					callback(new Error('The original password is incorrect!'));
				} else {
					callback();
				}
			};
			var validatePass = (rule, value, callback) => {
				if (value == '') {
					callback(new Error('Please enter your new password!'));
				} else if (!v.password(value)) {
					callback(new Error('Please enter your password with 6-16 digits (must contain numbers and letters)!'));
				} else {
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === '') {
					callback(new Error('Please enter your new password again!'));
				} else if (value !== this.ruleForm.password) {
					callback(new Error('The two passwords you entered did not match!'));
				} else {
					callback();
				}
			};
			return {
				titleIsShow: true,
				dialogFormVisible: false,
				ruleForm: {
					oldPassword: '',
					password: '',
					rePassword: ''
				},
				rules: {
					oldPassword: [
						{ validator: pass, trigger: 'blur' }
					],
					password: [
						{ validator: validatePass, trigger: 'blur' }
					],
					rePassword: [
						{ validator: validatePass2, trigger: 'blur' }
					]
				}
			}
		},
		async asyncData ({app}) {
			let param2 = {
				id: 12,
				pageSize: 12,
				page: 0,
				sort: 'order_asc'
			}
		 	const hotData = await app.$axios.post(interfaceApi.adsList,param2);
  			return { 
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
		    // 
	  	},
		methods: {
			changeName() {
				this.$prompt('Input Nickname', 'info', {
					confirmButtonText: 'Done',
					cancelButtonText: 'Cancel',
					inputPattern: /\S/,
					inputErrorMessage: 'Required'
				}).then(({ value }) => {
					this.changeNameAxios(value);
				}).catch(() => {
					     
				});
			},
			changeNameAxios(name) {
				var that = this;
				const param = {
					nickname: name
				}
				that.$axios.post(interfaceApi.changeNickName,param).then(res=> {
					Cookie.set('nickname',name);
					that.$store.commit('NICKNAME',name);
				});
			},
			resetPassword() {
				console.log(123);
				this.dialogFormVisible = true;
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.changePasswordAxios();
					} else {
						console.log('error submit!!');
						return false;
					}
				});	
			},
			changePasswordAxios() {
				var that = this;
				const param = that.ruleForm;
				that.$axios.post(interfaceApi.changePassword,param).then(res=> {
					that.dialogFormVisible = false;
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			change(e) {
		        let that = this
		        var files = e.target.files[0]
		        if (!e || !window.FileReader) return  // 看支持不支持FileReader
		        let reader = new FileReader()
		        reader.readAsDataURL(files) // 这里是最关键的一步，转换就在这里
		        reader.onloadend = function () {
		          	var _self = this;
		          	// 不压缩
		    //       	that.$http.post(that.urls.changeHead,{
						// 	headimg: _self.result
						// })
						// .then(function (response) {
						// 	that.userInfo.pic = _self.result;
						// });
					// 压缩
		          	let w = 300;
                	let h = 300;
                	let compressPic = function(base64) {
                		var param = {
                			headimg: base64
                		}
						that.$axios.post(interfaceApi.changeHead,param).then(res=> {
							Cookie.set('headimgurl',res.data.data.headimg_url);
							that.$store.commit('HEADIMGURL',base64);
						});
					};
		          	that.canvasDataUrl(_self.result,w,h,compressPic);
		        }
			},
			// 压缩图片
			canvasDataUrl(data, w, h, callback) {
				let newImg = new Image();
					newImg.src = data;
				let imgWidth, imgHeight;
				newImg.onload = () => {
					let img = document.createElement('img');
					img.src = newImg.src;
					imgWidth = img.width;
					imgHeight = img.height;
					let canvas = document.createElement('canvas');
					let ctx = canvas.getContext('2d');
				if (imgWidth > imgHeight) {
					imgWidth = w * imgWidth / imgHeight;
					imgHeight = h;
				} else {
					imgHeight = h * imgHeight / imgWidth;
					imgWidth = w;
				};
				canvas.width = imgWidth;
				canvas.height = imgHeight;
				ctx.clearRect(0, 0, w, h);
				// 处理png格式图片背景变黑的问题
				ctx.fillStyle = '#fff';
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, 0, 0, imgWidth, imgHeight);
				let rate = 0.7;
				let base64 = canvas.toDataURL('image/jpeg', rate);
					callback(base64);
				};
			},
		}
		
	}
</script>

<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'
	.el-form-item
		margin-bottom: 30px
	.el-button
		padding: 5px 10px
	.user 
		.container
			.userInfo
				.title
					padding-bottom: 13px 
					border-bottom: $border
				.info 
					margin-top: 20px
					>div 
						margin-bottom: 30px
						overflow: hidden 
						>span 
							float: left 
							width: 155px
							display: inline-block
						>div 
							float: left
							width: 810px
							color: #666
						.photo
							position: relative
							>div 
								overflow: hidden
								@include wh(80px, 80px)
								background-color: #eee
								border-radius: 40px
								float: left
								img 
									@include wh(80px, 80px)
									border-radius: 40px
							.photoBtn 
								float: left
								@include whch(100px, 30x, center, 30px)
								background-color: #fff 
								@include sc(16px, #666)
								border: $border
								border-radius: $border_radius
								display: inline-block 
								margin-top: 30px
								margin-left: 30px
							.imgForm
								position: absolute
								left: 0
								top: 0
								width: 210px
								height: 100%
								cursor: pointer
								opacity: 0
						.name, .password
							span 
								cursor: pointer
					>div:first-child 
						>span 
							margin-top: 35px
					.icon-bianji 
						padding-left: 30px
	.noselect 
		display: inline-block
		width: 100px
		height: 30px
	.changePassword 
		margin-top: 5px
	.user .container .userInfo .info > div > .password
			display: inline-block
			border: 1px solid #dfdfdf
			width: 100px
			text-align: center
			height: 30px
			line-height: 30px
			border-radius: 4px
</style>
