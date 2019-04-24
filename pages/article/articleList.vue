<template>
	<div class="articleContent">
		<div class="container articleListBox">
			<div class="articleList">
				<div class="item">
					<!-- <articleRank @Sort="Sort" /> -->
					<div class="sort">
						<rank @Sort = "Sort"/>
					</div>
					<div class="down">
						<el-dropdown @command="handleCommand">
							<span class="el-dropdown-link">
								{{Destination}}<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown" >
								<el-dropdown-item command="all">All</el-dropdown-item>
								<el-dropdown-item :command="item" v-for="item in category" :key="item.id">{{item.title}}</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</div>
				<!-- <articleItem :articleData="articleListData.data" /> -->
				<exploreChina :articleData="goodsList.data" />
				<div class="changePage" v-if="goodsList.totalPage >= 1">
					<el-pagination
					  	background
					  	layout="prev, pager, next"
					  	:current-page.sync="currentPage"
						@size-change="handleSizeChange"
	      				@current-change="handleCurrentChange"
					  	:total="goodsList.totalPage * 10">
					</el-pagination>
				</div>
			</div>
			<moreGoods :featuredGoods="goodsList.recommend"/>
		</div>
	</div>
</template>
<script>
	import moreGoods from "~/components/base/moreGoods"
	// import articleRank from "~/components/base/articleRank"
	import rank from "~/components/base/rank"
	// import articleItem from "~/components/base/articleItem"
	import exploreChina from "~/components/base/exploreChina"
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	export default {
		layout: 'indexHome',
		head () {
    		return {
      			title: 'Editor’s Pick'
        	}
  		},
		props: {

	    },
		data(){
            return{
            	param: {
	        		catOneId: 160,
					catTwoId: 161,
					catThreeId: '',
					page: 1,
					pageSize: 20,
					sort: 'createTime_desc',
					totalPage: -1
	        	},
				currentPage: 1,
				Destination: 'Destination'
				
	        }
        },
        async asyncData ({app,params,store}) {
        	const param = {
        		fname: 161
			}
			const param2 = {
        		catOneId: 160,
				catTwoId: 161,
				catThreeId: '',
				page: 1,
				pageSize: 20,
				sort: 'createTime_desc',
				// totalPage: -1
        	}
		 	const category = await app.$axios.post(interfaceApi.exploreChina,param);
			 const goodsList = await app.$axios.post(interfaceApi.goodsList,param2);
			 console.log(goodsList);
		 	// 获取分类
		 	const categoryList = await app.$axios.post(interfaceApi.categoryList,{fname: 0})
		 	store.commit('SET_CATEGORYLIST',categoryList.data.data);
  			return { category: category.data.data,goodsList: goodsList.data.data}
		},
		components: {
			moreGoods,
			// articleRank,
			rank,
			// articleItem
			exploreChina
		},
		mounted() {

			
		},
	  	computed: {  
		    
	  	},
		methods:{
			// 初始化参数
			initParam() {
				this.param.page = 1;
			},
			
			// 改变排序
			changeSortParam(sort) {
				this.param.sort = sort;
				this.currentPage = 1;
			},
			// 获取数据
			getData() {
				var that = this;
				that.$axios.post(interfaceApi.goodsList,that.param).then(res=> {
					that.goodsList = res.data.data;
				})
			},
			// 回到顶部
			goBackTop() {
				document.body.scrollTop = 0
				document.documentElement.scrollTop = 0
			},
			// 改变页数
			handleSizeChange(val) {
		        this.param.page = val;
		        this.getData();
		    },
		    // 上下页
		    handleCurrentChange(val) {
		        this.param.page = val;
		        this.goBackTop();
		        this.getData();
		    },
		    // 排序方式
			Sort(index) {
				// console.log(index);
				var that = this;
				that.goBackTop();
				that.initParam();
				that.changeSortParam(index);
				that.getData();
			},
			handleCommand(command) {
				// console.log(command);
				if(command == 'all') {
					this.Destination = 'Destination';
					this.param.catThreeId = '';
				} else {
					this.Destination = command.title;
					this.param.catThreeId = command.id;
				}
				this.getData();
				
			}
        }
	}
</script>
<style lang='sass' type="text/css" scoped>
@import '~/assets/sass/common.sass'
.el-dropdown
	.el-dropdown-link
		color: #666
		font-size: 16px
		.el-icon-arrow-down.el-icon--right
			margin-left: 5px
.el-dropdown-menu
	width: 100px
	text-align: center
	.el-dropdown-menu__item
		font-size: 16px
		color: #666
	.el-dropdown-menu__item:hover
		color: #F9421E
		background-color: #fff
		font-size: 16px
.el-dropdown-link
	cursor: pointer
	color: #409EFF
.el-icon-arrow-down
	font-size: 12px
.articleContent
	.bread 
		width: 100%
		background-color: #eee
		margin-bottom: 15px
		.el-breadcrumb
			@include hh(36px, 36px)
			width: 1200px
			margin: 0 auto
	.articleListBox 
		overflow: hidden
		margin-top: 15px
		.articleList
			float: left
			width: 942px
			.item
				height: 36px
				line-height: 36px
				background-color: #eee
				.down
					float: right
					margin-right: 15px
					text-align: center
				.sort
					float: left
	.item 
		margin-bottom: 15px
</style>