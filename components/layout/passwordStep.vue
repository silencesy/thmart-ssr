<template>
    <div class="step">
        <ul>
        	<li>
				<i :class="{green: flag==1 || flag==2 || flag==3}">1</i>
				<span>Verification of Mobile No.</span>
        	</li>
        	<p></p>
        	<li>
        		<i :class="{green: flag==2 || flag==3 }">2</i>
        		<span>Setting of New Password</span>
        	</li>
        	<p class="plusLine"></p>
        	<li>
        		<i :class="{green: flag==3}">3</i>
        		<span>Password Reset Success</span>
        	</li>
        </ul>
    </div>
</template>
<script>
	export default {
		props: {
			flag: {
				type: [Number,String],
				default: 1
			}
		}
	}
</script>
<style lang='sass' type="text/css" scoped>
    @import '~/assets/sass/common.sass'

    .step
    	width: 770px 
    	margin: 0 auto
    	ul 
    		overflow: hidden
    		position: relative
    		margin: 30px 0
    		li
    			float: left
    			margin-right: 110px
    			text-align: center
    			i
    				color: #999
    				border: $border
    				border-radius: 50% 
    				@include whch(24px, 24px, center, 24px)
    				display: inline-block
    				margin-bottom: 8px
    			.green 
    				color: #fff 
    				background-color: #13A230
    			span
    				display: block
    				color: #666
    		li:last-child
    			margin-right: 0
    		p
    			position: absolute
    			width: 120px
    			border-top: 1px dashed #dfdfdf
    			top: 13px
    			left: 165px
    		.plusLine
    			left: 470px

</style>