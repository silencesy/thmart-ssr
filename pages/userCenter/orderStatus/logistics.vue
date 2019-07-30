<template>
	<div class="logistics">
		<!-- <div class="statusInfo container" v-if="logistics != '单号不存在或者已经过期!' && logistics != '请提供快递公司编码' && param.logistics !=0"> -->
		<div class="statusInfo container" v-if="logistics.status == 1">
			<p>logistics: {{param.logistics}}&nbsp;&nbsp;&nbsp;&nbsp;company: {{logistics.com}} ({{logistics.company}})</p>
			<p v-for="(item,index) in logistics.list" :key="index">
				<span v-if="index == 0"><img src="~/static/images/icon-yuandian.png" alt="">{{item.datetime}}</span>
				<span v-if="index != 0"><i class="iconfont icon-dot"></i>{{item.datetime}}</span>
				<span>{{item.remark}}</span>
			</p>
		</div>
		<div class="nologistics" v-else-if="logistics.status == 126">
			{{logistics.msg}}
		</div>
		<div class="nologistics" v-else-if="logistics.status == 127">
			{{logistics.msg}}
		</div>
		<div class="nologistics" v-else-if="logistics.status == 128">
			{{logistics.msg}}
		</div>
		
	</div>
</template>
<script>
	// 接口API
	import interfaceApi from '~/plugins/interfaceApi'
	export default {
		layout: 'userHome',
		data() {
			return {
				
			}
		},
		async asyncData ({app,query}) {
			let param = {
				logistics: query.logistics,
				company: query.company
			}
			const logistics = await app.$axios.post(interfaceApi.logistics,param);
  			return {
  				param: param,
  				logistics: logistics.data.data
  			}
		},
		components: {

		},
		mounted() {
			
		},
	  	computed: {  
		    
	  	},
		methods: {

		}
	}
</script>

<style lang='sass' scoped>
	@import '~/assets/sass/common.sass'
	.logistics
		.statusInfo
			border: 1px solid #dfdfdf
			padding: 40px
			p:nth-child(1)
				font-size: 17px
			p 
				margin-bottom: 15px
				overflow: hidden 
				span 
					float: left
				span:first-child
					color: #666
					padding-right: 20px
					width: 193px
					line-height: 24px
					img 
						@include wh(13px, 13px)
						margin-right: 10px
					i.icon-dot
						color: #dfdfdf
						margin-right: 10px
						font-size: 13px
				span:nth-child(2)
					width: 500px
					font-size: 14px
	.nologistics
		text-align: center
		padding: 150px 0
</style>
