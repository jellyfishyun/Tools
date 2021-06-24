/**
 * @description 图片没加载出来时用一张图片代替
 * @param obj.dom
 * @param obj.url
 * @param obj.errorUrl
 * @param obj.fn
 */
function aftLoadImg(obj) {
  let oImg = new Image(), _this = this;
  oImg.src = obj.url;
  oImg.onload = function () {
    obj.dom.src = oImg.src;
    if (obj.fn && isType(obj.fn, 'function')) {
      obj.fn(obj.dom);
    }
  };
  if (obj.errorUrl) {
    oImg.onerror = function () {
      obj.src = obj.errorUrl;
      if (obj.fn && isType(obj.fn, 'function')) {
        obj.fn(obj.dom);
      }
    }
  }
}
/**
 * @description 图片滚动懒加载
 * @param className 要遍历图片的类名
 * @param num 距离多少的时候开始加载 默认 0
 * @param errorUrl 出错时候的图片
 */
function lazyLoadImg(className = 'ec-load-img', num = 0, errorUrl = null) {
  let oImgLoad = document.getElementsByClassName(className), _this = this, _src = '';
  for (let i = 0, len = oImgLoad.length; i < len; i++) {
    //如果图片已经滚动到指定的高度
    if (document.documentElement.clientHeight + document.documentElement.scrollTop > oImgLoad[i].offsetTop - num && !oImgLoad[i].isLoad) {
      //记录图片是否已经加载
      oImgLoad[i].isLoad = true;
      //设置过渡，当图片下来的时候有一个图片透明度变化
      oImgLoad[i].style.cssText = "transition: ''; opacity: 0;";
      oImgLoad[i].style.transition = "";
      oImgLoad[i].style.opacity = "0";
      _src = oImgLoad[i].dataset ? oImgLoad[i].dataset.src : oImgLoad[i].getAttribute("data-src");
      aftLoadImg({
        dom: oImgLoad[i],
        url: _src,
        errorUrl: errorUrl,
        fn: function (o) {
          //添加定时器，确保图片已经加载完了，一秒后再把图片指定的css样式清掉
          setTimeout(() => {
            if (o.isLoad) {
              o.style.transition = "";
            }
          }, 1000)
        }
      });
      //加上动画，透明度样式
      (function (i) {
        setTimeout(() => {
          oImgLoad[i].style.cssText = "transition:all 1s; opacity: 1;";
        }, 16)
      })(i);
    }
  }
}
/**
 * @description 加载图片
 * @param className
 * @param cb
 */
function loadImg(className, cb) {
  let _dom = [...document.querySelectorAll('.' + className)], now = 0, len = _dom.length;

  function handleLoad(dom) {
    dom.src = dom.dataset ? dom.dataset.src : dom.getAttribute("data-src");
    dom.onerror = dom.onload = function () {
      now++
      console.log(now, len)
      //如果还有图片待加载
      if (_dom.length > 0) {
        //递归调用加载
        handleLoad(_dom.shift());
      }
      else {
        cb && cb();
      }
    }
  }

  handleLoad(_dom.shift());
}