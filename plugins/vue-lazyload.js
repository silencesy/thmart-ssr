import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad,{
    error:'http://proj6.thatsmags.com/Public/ckfinder/images/lazyimg.png',
    loading:'http://proj6.thatsmags.com/Public/ckfinder/images/lazyimg.png'
})