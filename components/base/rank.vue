<template>
    <div class="rank">
        <div class="rankBox">
            <div class="title">
                <div>
                    <span class="noselect latest" @click="tab('createTime_desc')" :class="{active:index == 'createTime_desc'}">Latest</span>
                    <span class="noselect sale" @click="tab('sellNumber_desc')" :class="{active:index == 'sellNumber_desc'}" v-if="isShowObj.saleIsShow">Sale</span>
                    <span class="noselect price" @click="tab('price_desc')" :class="{active:index == 'price_desc'}" v-if="isShowObj.priceIsShow">Price</span>
                </div>
                <div @click="tab('price_desc')" v-if="isShowObj.priceIsShow">
                    <i class="el-icon-caret-top" :class="{active:index == 'price_desc' && lift == 'price_asc'}"></i>
                    <i class="el-icon-caret-bottom" :class="{active:index == 'price_desc' && lift == 'price_desc'}"></i>
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
                    if (index == 'createTime_desc'||index == 'sellNumber_desc') {
                        that.$emit('Sort',index);
                    }
                }
                setTimeout(function(){
                    if(that.first) {
                        that.first = false;
                        that.$emit('Sort',that.lift);
                    } else if (that.index == 'price_desc' && index == 'price_desc'){
                        if (that.lift == 'price_desc') {
                            that.lift = 'price_asc';
                            that.$emit('Sort',that.lift);
                        } else {
                            that.lift = 'price_desc';
                            that.$emit('Sort',that.lift);
                        }
                    }
                },20);
            },
            init() {
                this.index = 'createTime_desc';
                this.lift ='price_desc';
                this.first = false;
            }
        },
        watch: {
            index: function(newVal,oldVal) {
                var that = this;
                if (newVal=='price_desc') {
                    that.first = true;
                } else {
                    that.first = false;
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
                span.latest
                    margin-right: 90px
                span.sale
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