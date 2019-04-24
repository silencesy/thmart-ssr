/**
 * 作用：当用户分享pc地址给用户，用户用移动端打开连接跳转移动端对应的页面
 */

export default function(context) {
    let isClient = process.client;
    if (isClient) {
        window.dataLayer = window.dataLayer || [];

        function gtag() {
            dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', 'UA-119677916-1');
    }
}