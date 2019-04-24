<template>
    <div class="rank">
        <div class="rankBox">
            <div class="title">
                <div>
                    <span class="noselect" @click="tab('createTime_desc')" :class="{active:index == 'createTime_desc'}">Latest</span>
                    <span class="noselect" @click="tab('click_desc')" :class="{active:index == 'click_desc'}" v-if="isShowObj.saleIsShow">Hottest</span>
                </div>
            </div>
            <div class="rankSearch" v-if="isShowObj.rankSearchIsShow"></div>
		</div>
    </div>
</template>
<script>

	export default {
        props: {
            isShowObj: {
                type: Object,
                default: function() {
                    return {
                        rankSearchIsShow: false,
                        priceIsShow: true,
                        saleIsShow: true
                    }
                }
            }
        },
        data () {
            return {
                index: 'createTime_desc',
                lift: 'price_desc',
                first: false
            }
        },
        methods: {
           tab(index) {
                var that = this;
                if (that.index!=index) {
                    that.index = index;
                    that.$emit('Sort',index);
                }
            }

        }
	}
</script>
<style lang='sass' type="text/css" scoped>
    @import '~/assets/sass/common.sass'
    .active
        color: $theme_color
    .rankBox 
        @include whh(100%, 36px, 36px)
        background-color: #eee
        padding: 0 15px 
        overflow: hidden
        .title
            float: left
            >div 
                float: left
            >div:first-child
                span
                    color: $describe_color
                    cursor: pointer
                .active
                    color: $theme_color
                span:first-child
                    margin-right: 90px
                span:nth-child(2)
                    margin-right: 90px
            >div:nth-child(2)
                position: relative
                padding-left: 5px
                cursor: pointer
                i 
                    position: absolute 
                i:first-child
                    top: 6px
                i:nth-child(2)
                    top: 14px


    
    					
</style>