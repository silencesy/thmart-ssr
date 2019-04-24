<template>
	<div class="business">
		<div class="wrapper">
	        <div class="example">
	            <img src="~/static/images/1_01.jpg" alt="">
	            <img src="~/static/images/1_02.jpg" alt="">
	            <img src="~/static/images/1_03.jpg" alt="">
	        </div>
			<backEn />
	    </div>
	</div>
</template>
<script>
	import backEn from "~/components/business/backEn"
	export default {
		layout: 'business',
		head () {
    		return {
      			title: 'Do Business With Us'
        	}
  		},
		data() {
			return {

			}
		},
		components: {
			backEn
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
	.business
		.wrapper
			.example 
				margin-bottom: 40px
				img 
					width: 100%
					border: 0
					vertical-align: middle

</style>