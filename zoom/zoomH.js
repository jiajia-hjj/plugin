var zoomUA = navigator.userAgent.toLowerCase();
function zoom(width, height) {
    var ratio; //缩放比例
    var docEl = document.documentElement;
    var clientWidth = docEl.clientWidth;
    var clientHeight = docEl.clientHeight;
    if (clientWidth / clientHeight > width / height) {
        ratio = clientHeight / height;
    } else {
        ratio = clientWidth / width;
    }
    document.getElementById("ratioCss").innerHTML = ".main{-webkit-transform: scale(" + ratio + ");}"
}

function zoomHtml(width) {
    document.querySelector('meta[name="viewport"]').content = 'minimal-ui, width=' + width + ', user-scalable=0';
}
//控制viewport的值，避免ios旋转放大bug
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
    setTimeout(function () {
        document.querySelector('meta[name="viewport"]').content = ''
    }, 200);
    setTimeout(function () {
        zoomHtml(1334);
        zoom(1100, 600);
    }, 310);
}, false);
zoom(1100, 600);
//解决关闭/开启屏幕 页面放大bug
window.addEventListener("webkitvisibilitychange", function () {
    zoomHtml(1334);
    zoom(1100, 600);
}, false);
window.onpageshow = function (evt) {
    if ((zoomUA.match(/android/i) || zoomUA.match(/oppo/i)) && !zoomUA.match(/MicroMessenger/i)) {
        setTimeout(function () {
            zoom(1100, 600);
        }, 200);
    } else {
        zoom(1100, 600);
    }
};
