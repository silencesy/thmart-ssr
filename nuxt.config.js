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
            {
                hid: 'keywords', name: 'keywords', content: `
                online shopping, snacks, wine, beverages, alcohol, spirits, food, drink, tickets, events, concerts, shows, art, exhibits, gallery, entertainment, shanghai, beijing, guangzhou, shenzhen, suzhou, tianjin, china, expats, english, chinese, wechat, alipay, stage, family, sport, deals, event tickets, buy tickets, experiences, vegan, kitchen, house, home, homeware, furniture, cleaning, supplies, kids, children, family, household, pets, health, sports, office, school, dining, esssentials, decor, bed, bath, electornics, appliances, audio, video, gaming, phones, tablets, wearables, photo, film, games, parties, toys, fashion, men, women, girls, boys, babies, infants apparel, bags, accessories, beauty, cosmetics, fashion, nursery, maternity, pet care, beer, wine, liquor, bar, coffee, tea, pantry, bikes, scooters, fitness, sexual wellness, travel, tours, outdoors, hotel, resort, luxury, spa, coupons, gifts, haircare, skincare, skin, hair, makeup, books, magazines, music, computers, shoes, jewelry, tools, hardware, sporting goods, personal care, gourmet food, thmart.com
            ` },
            {
                hid: 'description', name: 'description', content: `
                thmart.com.cn, thmart, that's shanghai, thatsshanghai, thats shanghai, that's beijing, thatsbeijing, thats beijing, that's prd, thatsprd, thats prd, that's guangzhou, thatsguangzhou, thats guangzhou, that's shenzhen, thatsshenzhen, thats shenzhen, that's tianjin, thatstianjin, thats tianjin, that's suzhou, thatssuzhou, thats suzhou, foreign, foreigners, international, shipping, cell phones, watches, subscription, book store, video games, office products, baby products, baby care, garden, vacuums, nightlife, lifestyle, theater, theatre, e-commerce
            ` }
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
        {
            src: '~plugins/qrcode',
            ssr: false
        },
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