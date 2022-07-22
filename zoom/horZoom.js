var zoomUA = navigator.userAgent.toLowerCase();
var zoomSafariHeight = 0;
var zoomHeight = 0;
var zoomIsSafari = /safari/i.test(zoomUA) && (/iphone/i.test(zoomUA) || /ipod/i.test(zoomUA)) && !/qqbrowser|ucbrowser|baidu|sougou|qhbrowser|MicroMessenger/i.test(zoomUA);

function zoom(width, height) {
    var ratio;//缩放比例
    var docEl = document.documentElement;
    var clientWidth = docEl.clientWidth;
    if (zoomUA.match(/android/i) || zoomUA.match(/oppo/i)) {
        zoomHeight = docEl.clientHeight - window.innerHeight;
    }
    if (zoomIsSafari) {
        if (screen.height < 667) {
            zoomSafariHeight = 220;
        } else if (screen.height >= 736) {
            zoomSafariHeight = 150;
        } else {
            zoomSafariHeight = 100;
        }
    }
    var clientHeight = docEl.clientHeight - zoomSafariHeight - zoomHeight * window.devicePixelRatio;
    if (clientWidth / clientHeight > width / height) {
        ratio = clientHeight / height;
    } else {
        ratio = clientWidth / width;
    }
    document.getElementById("ratioCss").innerHTML = ".main{-webkit-transform:translate(-50%,-50%) scale(" + ratio + "); margin-top:-" + zoomHeight / 2 + "px}"
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
        zoom(1254, 600);
    }, 310);

    //适配safari
    if (zoomIsSafari) {
        setTimeout(function () {
            window.scroll(0, -10)
        }, 200);
        setTimeout(function () {
            window.scroll(0, zoomSafariHeight / 2)
        }, 600);
    }

}, false);
//解决关闭/开启屏幕 页面放大bug
window.addEventListener("webkitvisibilitychange", function () {
    zoomHtml(1334);
    zoom(1254, 600);
}, false);
zoom(1254, 600);
window.onpageshow = function (evt) {
    setTimeout(function () {
        zoom(1254, 600);
    }, 50);
    if (zoomIsSafari) {
        setTimeout(function () {
            window.scroll(0, zoomSafariHeight / 2)
        }, 200);
    }
};
