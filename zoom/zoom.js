
var zoomUA = navigator.userAgent.toLowerCase();
var zoomHeight = 0;
function zoom(width, height) {
    var ratio;//缩放比例
    var docEl = document.documentElement;
    var clientWidth = docEl.clientWidth;
    if (zoomUA.match(/android/i) || zoomUA.match(/oppo/i)) {
        zoomHeight = docEl.clientHeight - window.innerHeight;
    }
    var clientHeight = docEl.clientHeight - zoomHeight * window.devicePixelRatio;
    var ratioClient = clientWidth / clientHeight;
    var ratioObj = width / height;
    if (ratioObj >= ratioClient) {
        ratio = clientWidth / width;
    } else {
        ratio = clientHeight / height;
    }
    document.getElementById("ratioCss").innerHTML = ".main,main{-webkit-transform: translate(-50%,-50%) scale(" + ratio + ");margin-top:-" + zoomHeight + "px}"
}
function zoomHtml(width) {
    document.querySelector('meta[name="viewport"]').content = 'minimal-ui,width=' + width + ', user-scalable=0';
}
//控制viewport的值，避免ios旋转放大bug
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
    setTimeout(function () {
        document.querySelector('meta[name="viewport"]').content = ''
    }, 200);
    setTimeout(function () {
        zoomHtml(750);
        zoom(650, 1200);
    }, 310);
}, false);
//解决关闭/开启屏幕 页面放大bug
window.addEventListener("webkitvisibilitychange", function () {
    zoomHtml(750);
    zoom(650, 1200);
}, false);
window.onpageshow = function (evt) {
    setTimeout(function () {
        zoom(650, 1200);
    }, 300);
};
//处理安卓浏览器第一次进行meta缩放解析不正确bug
// var zoomUA = navigator.userAgent.toLowerCase();
// if (window.performance.navigation.type == 1 || zoomUA.match(/MicroMessenger/i)) {
// 	zoom(650,1200);
// }else if(window.performance.navigation.type != 1 && (zoomUA.match(/android/i) || zoomUA.match(/oppo/i)) ) {
// 	location.reload()
// }
