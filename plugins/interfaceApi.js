let api = {
    // 首页
    home: 'Ads/Home/list',
    // 分类列表
    categoryList: 'Category/loopList',
    exploreChina: 'Category/list',
    // 登录接口（密码登录和验证码登录）
    login: 'User/mobileLogin',
    // 获取验证码
    UsermobileCode: 'User/mobileCode',
    // 验证码判断是否正确
    UserMobileRegisterByPc: 'User/mobileRegisterByPc',
    // 手机验证码 验证
    mobileRegisterByPc: 'User/mobileRegisterByPc',
    // 手机注册
    mobileRegister: 'User/mobileRegister',
    // 重置密码获取短信
    checkMobileAndCode: 'User/checkMobileAndCode',
    // 重置密码
    resetPassword: 'User/resetPassword',
    // 所以商户列表页
    brandList: 'Brand/list',
    // 商户首页
    shop: 'Brand/detail',
    // 商品列表页
    goodsList: 'Item/list',
    // 文章列表
    articleList: 'Article/list',
    // 文章详情页
    articleDetail: 'Article/detail',
    /**
     * 广告位置id，5：推荐品牌；12：首页热销商品；17：首页促销商品；34：thDispatcher
     */
    adsList: 'Ads/list',
    // 商品详情页
    goodsDeatail: 'Item/detail',
    // 获取单个sku
    getSkuInfo: 'Sku/detail',
    //获取评论
    getGoodsReviews: 'Comment/list',
    // 购物车列表
    cartList: 'Cart/list',
    // 收藏
    Collect: 'Collect/collect',
    // 收藏列表
    CollectList: 'Collect/list',
    // 订单列表
    orderList: 'Order/list',
    // 订单详情页
    OrderDetail: 'Order/detail',
    // 支付页信息
    payOrderDetail: 'Order/payOrderDetail',
    /**
     * 购物车
     */
    changeSelectAndTotalPrice: 'Cart/changeSelectAndTotalPrice',
    // 修改购物车数量
    editNumber: 'Cart/editNumber',
    // 添加购物车
    addCart: 'Cart/edit',
    // 删除
    cartDelete: 'Cart/delete',
    /**
     * 订单模块
     */
    prepareOrder: 'Order/prepareOrder',
    placeOrder: 'Order/placeOrder',
    // 删除订单
    orderDelete: 'Order/delete',
    /**
     * 地址模块
     */
    // 地址列表
    addressList: 'User/Address/list',
    // 修改默认地址
    changeDefault: 'User/Address/changeDefault',
    // 添加地址
    addAddress: 'User/Address/edit',
    // 删除地址栏
    deleteAddAddress: 'User/Address/delete',
    // 获取单条地址
    oneAddress: 'User/Address/detail',
    /**
     * 收藏
     */
    collectList: 'Collect/list',
    collect: 'Collect/collect',
    /**
     * 优惠券
     */
    couponList: 'Coupon/list',
    couponItemList: 'Coupon/itemList',
    // 个人中心
    changeNickName: 'User/changeNickName',
    // 修改密码
    changePassword: 'User/changePassword',
    // 修改头像
    changeHead: 'User/changeHead',
    /**
     * 团购
     */
    groupBuying: 'Item/groupBuying',
    /**
     * 微信支付成功跳转
     */
    weixinpayed: 'Wx/orderQuery',
    // 物流
    userLogistics: 'Logistics/twoLatest',
    logistics: 'Logistics/detail',
    // 微信扫码绑定手机号
    wxPcBindMobile: 'User/Wx/wxBindMobile',
    // 领取单个优惠券
    getCoupon: 'Coupon/get',
    // 添加评论
    addComment: 'Comment/add',
    // 添加评论详情
    commentDetails: 'Order/ordersSkuDetail',
    // 优惠券广告页面
    discountlist: 'Ads/Home/discountlist',
    userWelogin: 'User/welogin',
    // thats补全信息
    userWeuserUpdate: 'User/weuserupdate',
    // 个人中心商品推荐
    itemWehotproduct:'Item/wehotproduct'
}
export default api