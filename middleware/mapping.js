/**
 * 作用：当用户分享pc地址给用户，用户用移动端打开连接跳转移动端对应的页面
 */

export default function({ route, req, params, query, redirect }) {
    const userAgent = process.server ? req.headers['user-agent'].toLowerCase() : navigator.userAgent.toLowerCase();
    const routeName = route.name;
    const baseUrl = 'http://mob.thmart.com.cn/'
        // mobile
    if (userAgent.indexOf("android") != -1 || userAgent.indexOf("iphone") != -1 || userAgent.indexOf("ipad") != -1 || userAgent.indexOf("ipod") != -1) {
        switch (routeName) {
            // 首页
            case 'index':
                redirect(baseUrl + '?from=singlemessage&isappinstalled=0');
                break;
                // 文章列表页
            case 'article-articleList':
                redirect(baseUrl + 'Guide');
                break;
                // 商户列表页
            case 'shop-shopList':
                redirect(baseUrl + 'ShopList');
                break;
                // 商户详情页
            case 'shop-id':
                redirect(baseUrl + '/ShopHome?id=' + params.id);
                break;
            case 'shop-peaceHotel':
                redirect(baseUrl + '/ShopHome?id=32');
                break;
                // 商品详情页
            case 'goods-id':
                redirect(baseUrl + 'GoodsDetails?id=' + params.id);
                break;
                // 热销商品
            case 'deals-id':
                redirect(baseUrl + 'GoodsList?id=17');
                break;
                // 分类页
            case 'category-item':
                redirect(baseUrl + 'Categories?id=' + query.one + '&childid=' + query.two);
                break;
            case 'userCenter-coupons-getCoupon':
                redirect(baseUrl + 'getCoupon?id=' + query.id);
                break;
            case 'loginModule-login':
                var url = route.fullPath;
                var finallyUrl = url.substr(23, url.length);
                if (finallyUrl.indexOf('urban-family.com') != -1) {
                    redirect(baseUrl + 'Login?ref=' + finallyUrl);
                } else {
                    redirect(baseUrl + 'Login');
                }
                break;
                // 其他
            default:
                redirect(baseUrl);
        }
    }
}