module.exports = {
    /*
     ** Headers of the page
     */
    head: {
        title: 'thMart',
        meta: [
            { charset: 'utf-8' },
            { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge,chrome=1' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Nuxt.js project' }
        ],
        // 谷歌统计
        script: [{
            src: 'https://www.googletagmanager.com/gtag/js?id=UA-119677916-1'
        }],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/thmart.ico' },
            { rel: 'stylesheet', href: '//at.alicdn.com/t/font_771689_xdf03xyy8e.css' }
        ]
    },
    // css重置
    css: [
        { src: 'element-ui/lib/theme-chalk/index.css' },
        '~assets/css/style.css',
        'swiper/dist/css/swiper.css',
        { src: '~assets/sass/common.sass', lang: 'sass' }

    ],
    /*
     ** Customize the progress bar color
     */
    loading: { color: '#F9421E', height: '1px' },
    /**
     * [plugins description]
     * @type {Array}
     */
    modules: [
        '@nuxtjs/axios',
    ],
    axios: {
        // 是否使用https协议
        https: false,
        // 设置请求基础路径
        prefix: 'http://api.mall.thatsmags.com/thmartApi/',
        baseURL: 'http://api.mall.thatsmags.com/thmartApi/',
        browserBaseURL: 'http://api.mall.thatsmags.com/thmartApi/',
        // prefix: 'http://api.com/thmartApi/',
        // baseURL: 'http://api.com/thmartApi/',
        // browserBaseURL: 'http://api.com/thmartApi/',
        // prefix: 'http://proj6.thatsmags.com/thmartApi/',
        // baseURL: 'http://proj6.thatsmags.com/thmartApi/',
        // browserBaseURL: 'http://proj6.thatsmags.com/thmartApi/',
        proxy: true
    },

    plugins: [
        { src: '~/plugins/vue-awesome-swiper', ssr: false },
        { src: '~plugins/element-ui', ssr: true },
        { src: '~plugins/vue-lazyload', ssr: false },
        // {src:'~plugins/api', ssr: true},
        /**
         * [公共函数]
         * @type {String，Function}
         */
        { src: '~plugins/common', ssr: false },
        '~/plugins/axios'
    ],
    /*
     ** Build configuration
     */
    build: {
        /*
         ** Run ESLint on save
         */
        // loaders配置
        loaders: [{
            test: /\.(png|jpe?g|gif|svg)/,
            loader: "url-loader",
            query: {
                limit: 10000,
                name: 'img/[name].[hash].[text]'
            }
        }],
        vendor: ['axios'],
        extend(config, { isDev, isClient }) {
            if (isDev && isClient) {
                config.module.rules.push({
                    enforce: 'pre',
                    test: /\.(js|vue)$/,
                    loader: 'eslint-loader',
                    exclude: /(node_modules)/
                })
            }
        }
    },
    /**
     * [router]
     * @type {Object}
     */
    router: {
        scrollBehavior: function(to, from, savedPosition) {
            return { x: 0, y: 0 }
        },
        middleware: ['mapping', 'googleAnalytics']
    }
}