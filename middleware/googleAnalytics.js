/**
 * 作用：google分析
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