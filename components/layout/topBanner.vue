<template>
	<div class="topBanner" v-if="$store.state.topBanner.length > 0 && $route.path == '/'">
        <a :href="$store.state.topBanner[0].url">
            <img v-lazy="$store.state.topBanner[0].pic" alt="">
        </a>
    </div>
</template>
<script>
// 是否显示首页顶部广告
export default {
	data() {
		return {
			path: false
		}
	}
}
</script>
<style type="text/css" scoped>
    .topBanner {
    	width: 1200px;
    	height: 112px;
    	margin: 0 auto;
        padding-top: 12px;
    }
    .topBanner img {
    	display: inline-block;
    	width: 100%;
    	height: 100%;
    }
</style>