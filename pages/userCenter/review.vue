<template>
	<div class="review">
		<div class="bread">
			<el-breadcrumb separator-class="el-icon-arrow-right">
			  <el-breadcrumb-item to="/userCenter/user">User Center</el-breadcrumb-item>
			  <el-breadcrumb-item>Orders</el-breadcrumb-item>
			  <el-breadcrumb-item>Review</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="box">
				<div class="addReview" v-for="(item,index) in data" :key="index">
					<div class="goods">
						<div>
							<div><img :src="item.pic" alt=""></div>
							<div class="goodsInfo">
								<p>{{item.goodsName}}</p>
								<p><i v-for="(val,index) in item.prop" :key="index">{{index}}: {{val[0]}}</i></p>
								<span>¥ {{item.price}}</span>
							</div>
						</div>
					</div>
					<div class="content">
						<div class="contentBox">
							<span>Review :</span>
							<textarea v-model="comment" placeholder="Enter comments here, maximum 500 words"></textarea>
						</div>
						<div class="addPhoto">
							<Upload  @getFiles="getImageList" @removeFiles="removeImage" ref="upload" />
							<div class="img-tip">Maximum 5 photos with PNG/JPG/jpeg format.</div>
						</div>
					</div>
				</div>
				
				<div class="reviewSubmit">
					<div class="btn" @click="submit">Submit</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	// 提示语
	import prompt from '~/assets/js/prompt'
	import userLayout from "~/components/user/userLayout"
	import Upload from "~/components/base/Upload"
	export default {
		layout: 'userHome',
		head () {
    		return {
      			title: 'Review'
        	}
  		},
		data() {
			return {
				comment: '',
				picList: []
			}
		},
		async asyncData ({app,query}) {
			let param = {
				id: query.id
			}
		 	const data = await app.$axios.post(interfaceApi.commentDetails,param);
  			return { 
  				data: data.data.data.data
  			}
		},
		components: {
			userLayout,
			Upload
		},
		mounted() {
			console.log(this.$route.query.id)
			
		},
	  	computed: {  
		    
	  	},
		methods: {
			getImageList(files) {
				console.log(123)
				this.picList = [];
				this.$nextTick(() => {
					for (let i = 0, len = files.length; i < len; i++) {
						this.picList.push(files[i].src);
					}
				});
			},
			//删除图片
			removeImage(index) {
				this.picList.splice(index, 1);
			},
			submit() {
				var that = this;
				if (!that.comment || that.comment.length < 5) {
					this.$message({
						message: prompt.commentTip,
						type: 'warning'
			        });
				} else {
					let params = {
						comment: that.comment,
						picList: that.picList,
						id: that.$route.query.id
					}
					console.log(params)
					that.$axios.post(interfaceApi.addComment,params).then(res=> {
						that.$message({
							message: prompt.success,
							type: 'warning'
						});
						setTimeout(() => {
							that.$router.back(-1);
						}, 1000);
					});
				}
			}
		}
	}
</script>

<style lang='sass' scoped>
@import '~/assets/sass/common.sass'
.review 
	.bread
		width: 100%
		background-color: #eee
		margin-bottom: 15px
		.el-breadcrumb
			@include hh(36px, 36px)
			width: 1200px
			margin: 0 auto
	.container
		.box 
			.addReview
				padding-bottom: 20px
				margin-bottom: 22px
				border-bottom: 1px solid #dfdfdf
				overflow: hidden
				.goods 
					width: 454px
					float: left
					border-right: 1px solid #dfdfdf
					text-align: center
					> div 
						width: 253px
						margin: 0 auto
					img 
						@include wh(130px, 130px)
					.goodsInfo
						p:first-child
							overflow: hidden
							text-overflow: ellipsis
							display: -webkit-box
							-webkit-box-orient: vertical
							-webkit-line-clamp: 2
							height: 36px
						p:nth-child(2)
							font-size: 14px
							color: #666
							padding: 8px 0
						span
							color: #F9421E
				.content 
					float: left
					.contentBox
						padding-left: 30px
						padding-bottom: 14px
						> span 
							color: #666
						textarea
							@include wh(614px, 167px)
							margin-left: 39px
							padding: 10px
							vertical-align: top
					.addPhoto
						padding-left: 130px
						.img-tip
							color: #999
							font-size: 14px
			.reviewSubmit
				width: 200px
				margin: 0 auto
				padding: 22px 0
				.btn
					@include whch(200px, 36px, center, 36px)
					background: #F9421E
					border-radius: 4px
					color: #fff
					cursor: pointer

</style>
