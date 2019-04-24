<template>
  	<el-carousel :interval="6000" arrow="always" height="340px">
    	<el-carousel-item v-for="(item,index) in swiperData" :key="index">
    		<a :href="item.url">
    			<div class="slide-item" :style="{backgroundImage:'url(' + item.pic + ')'}"></div>
    		</a>
    	</el-carousel-item>
  	</el-carousel>
</template>
<script>
	export default {
		props: {
			swiperData: {
				type: Array,
				default: function () {  
			      return []
			    }  
			}
		},
	}
</script>
<style type="text/css" scoped>
    .slide-item {
    	width: 100%;
    	height: 340px;
    	background-size: cover;
    	background-position: center center;
    }
</style>