<template>
	<div class="articleContent">
		<div class="container articleListBox">
			<div class="articleList">
				<div class="item">
					<articleRank @Sort="Sort" />
				</div>
				<articleItem :articleData="articleListData.data" />
				<div class="changePage">
					<el-pagination
					  	background
					  	layout="prev, pager, next"
					  	:current-page.sync="currentPage"
						@size-change="handleSizeChange"
	      				@current-change="handleCurrentChange"
					  	:total="articleListData.totalPage * 10">
					</el-pagination>
				</div>
			</div>
			<moreGoods :featuredGoods="articleListData.recommend"/>
		</div>
	</div>
</template>
<script>
	import moreGoods from "~/components/base/moreGoods"
	import articleRank from "~/components/base/articleRank"
	import articleItem from "~/components/base/articleItem"
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
	        		page: 1,
	        		pageSize: 22,
	        		sort: 'createTime_desc'
	        	},
	        	currentPage: 1,
				
	        }
        },
        async asyncData ({app,params,store}) {
        	const param = {
        		page: 1,
        		pageSize: 22,
        		sort: 'createTime_desc'
        	}
		 	const articleListData = await app.$axios.post(interfaceApi.articleList,param);
		 	// 获取分类
		 	const categoryList = await app.$axios.post(interfaceApi.categoryList,{fname: 0})
		 	store.commit('SET_CATEGORYLIST',categoryList.data.data);
  			return { articleListData: articleListData.data.data}
		},
		components: {
			moreGoods,
			articleRank,
			articleItem
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
				that.$axios.post(interfaceApi.articleList,that.param).then(res=> {
					that.articleListData = res.data.data;
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
			}
        }
	}
</script>
<style lang='sass' type="text/css" scoped>
	@import '~/assets/sass/common.sass'
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
			margin-bottom: 15px
</style>