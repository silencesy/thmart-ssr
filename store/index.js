import Vue from 'vue'
import Vuex from 'vuex'
import utils from '~/assets/js/utils'
Vue.use(Vuex)

// window.fetch() 的 Polyfill
// require('whatwg-fetch')

const store = () => new Vuex.Store({


    state: {
        token: false,
        nickname: '',
        headimgurl: '',
        // 搜索文字
        searchText: '',
        classification: 'categories',
        shopInfo: {},
        dialogFormVisible: false,
        // 分类数据
        categoryList: [],
        // 首页顶部广告
        topBanner: [],
        // 登录页面布局标识,
        layoutFlag: '' 
    },

    mutations: {
        //设置页面的布局
        SET_LAYOUT: function (state,name) {
            state.layoutFlag = name;
        },
        // 设置用户token
        SET_USER: function(state, token) {
            state.token = token;
        },
        // 设置用户昵称
        NICKNAME: function(state, nickname) {
            state.nickname = nickname;
        },
        // 设置用户头像地址
        HEADIMGURL: function(state, headimgurl) {
            state.headimgurl = headimgurl;
        },
        // 搜索页设置搜索文字
        SET_SEARCH: function(state, text) {
            state.searchText = text;
        },
        // 搜索页设置搜索分类
        SET_CLASSIFICATION: function(state, text) {
            state.classification = text;
        },
        // 设置商户信息
        SET_SHOP_INFO: function(state, obj) {
            state.shopInfo = obj;
        },
        // 弹出框
        LOGIN: function(state, flag) {
            state.dialogFormVisible = flag;
        },
        // 分类数据
        SET_CATEGORYLIST: function(state, arr) {
            state.categoryList = arr;
        },
        SET_SHOW_CATEGORYLIST: function(state, id) {
            state.categoryList.forEach(item => {
                if (item.id == id) {
                    item.isSubShow = true;
                } else {
                    item.isSubShow = false;
                }
            })
        },
        // 顶部广告
        SET_TOPBANNER: function(state, arr) {
            state.topBanner = arr;
        }
    },

    actions: {
        nuxtServerInit({ commit }, { route, req, redirect }) {
            console.log(utils.getcookiesInServer(req).token);
            // 获取token
            if (req.headers.cookie) {
                commit('SET_USER', decodeURIComponent(decodeURIComponent(utils.getcookiesInServer(req).token)));
                commit('NICKNAME', decodeURIComponent(decodeURIComponent(utils.getcookiesInServer(req).nickname)));
                commit('HEADIMGURL', decodeURIComponent(decodeURIComponent(utils.getcookiesInServer(req).headimgurl)));
                commit('SET_LAYOUT', utils.getcookiesInServer(req).websiteflag);
            }
        }
    }

})

export default store