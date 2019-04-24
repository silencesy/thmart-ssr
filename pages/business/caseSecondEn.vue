<template>
	<div class="business">
		<div class="wrapper">
	        <div class="example">
	            <img src="~/static/images/2_01.jpg" alt="">
	            <img src="~/static/images/2_02.jpg" alt="">
	            <img src="~/static/images/2_03.jpg" alt="">
	            <img src="~/static/images/2_04.jpg" alt="">
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