/**
 * 作用：当用户分享pc地址给用户，用户用移动端打开连接跳转移动端对应的页面
 */

export default function({ route, req, params, query, redirect }) {
    const userAgent = process.server ? req.headers['user-agent'] : navigator.userAgent;
    const routeName = route.name;
    const baseUrl = 'http://mob.thmart.com.cn/'
        // mobile
    if (userAgent.indexOf("Android") != -1 || userAgent.indexOf("iPhone") != -1 || userAgent.indexOf("iPad") != -1) {
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
                // 分类页
            case 'category-item':
                redirect(baseUrl + 'Categories?id=' + query.one + '&childid=' + query.two);
                break;
            case 'loginModule-login':
                if (route.query.ref.indexOf('uf.thatsmags.com/') != -1) {
                    redirect(baseUrl + '/Login?ref=' + route.query.ref);
                } else {
                    redirect(baseUrl + '/Login');
                }
                break;
                // 其他
            default:
                redirect(baseUrl);
        }
    }
}