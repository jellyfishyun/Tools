/**
 * @description 适配rem
 * @param _client 效果图的宽度
 */
function getFontSize(_client) {
  let doc = document,
    win = window;
  let docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    countSize = function () {
      let clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      //如果屏幕大于750（750是根据我效果图设置的，具体数值参考效果图），就设置clientWidth=750，防止font-size会超过100px
      if (clientWidth > _client) {
        clientWidth = _client
      }
      //设置根元素font-size大小
      docEl.style.fontSize = 100 * (clientWidth / _client) + 'px';
    };
  //屏幕大小改变，或者横竖屏切换时，触发函数
  win.addEventListener(resizeEvt, countSize, false);
  //文档加载完成时，触发函数
  doc.addEventListener('DOMContentLoaded', countSize, false);
}
/**
 * @description 到某一个时间的倒计时
 * @param endTime
 * @return {{d: number, h: number, m: number, s: number}}
 */
function getEndTime(endTime) {
  let t = +new Date(endTime) - +new Date(); //时间差的毫秒数
  let d = 0,
    h = 0,
    m = 0,
    s = 0;
  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor(t / 1000 / 60 / 60 % 24);
    m = Math.floor(t / 1000 / 60 % 60);
    s = Math.floor(t / 1000 % 60);
  }
  return { d, h, m, s };
}
/**
 * @description 时间格式化
 * @param date
 * @param fmt
 * @return {*}
 */
function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
  let _date = new Date(date), _fmt = fmt;
  let o = {
    "M+": _date.getMonth() + 1,                 //月份
    "d+": _date.getDate(),                    //日
    "h+": _date.getHours(),                   //小时
    "m+": _date.getMinutes(),                 //分
    "s+": _date.getSeconds()                 //秒
  };
  if (/(y+)/.test(_fmt)) {
    _fmt = _fmt.replace(RegExp.$1, (_date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(_fmt)) {
      _fmt = _fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return _fmt;
}
/**
 * @description 随机产生颜色
 * @return {string}
 */
function randomColor(sum) {
  if (sum) {
    return '#' + Math.random().toString(16).substring(2).substr(0, 6);
  }
  else {
    return 'rgb(' + randomNumber(255) + ',' + randomNumber(255) + ',' + randomNumber(255) + ')';
  }
}
/**
 * @description 随机返回一个范围的数字
 * @param n1
 * @param n2
 * @return {number}
 */
function randomNumber(n1, n2) {
  switch (arguments.length) {
    case 2:
      return Math.round(n1 + Math.random() * (n2 - n1));
    case 1:
      return Math.round(Math.random() * n1);
    default:
      return Math.round(Math.random() * 100000000);
  }
}
/**
 * @description 设置url参数
 * @param url
 * @param obj
 * @return {string}
 */
function setUrlParam(url, obj) {
  let _rs = [];
  for (let p in obj) {
    if (obj[p] !== null && obj[p] !== '' && obj[p] !== undefined) {
      _rs.push(p + '=' + obj[p])
    }
  }
  return url + '?' + _rs.join('&');
}
/**
 * @description 获取url参数
 * @param url
 * @return {Object}
 */
function getUrlParam(url = window.location.href) {
  let _param = url.substring(url.indexOf('?') + 1).split('&'),
    _rs = {}, pos;
  for (let i = 0, _len = _param.length; i < _len; i++) {
    pos = _param[i].split('=');
    if (pos.length === 2) {
      _rs[pos[0]] = pos[1];
    }
  }
  return _rs;
}
/**
 * @description 现金额大写转换函数
 * @param n
 * @return {string}
 */
function upDigit(n) {
  let fraction = ['角', '分', '厘'];
  let digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  let unit = [
    ['元', '万', '亿'],
    ['', '拾', '佰', '仟']
  ];
  let head = n < 0 ? '欠人民币' : '人民币';
  n = Math.abs(n);
  let s = '';
  for (let i = 0; i < fraction.length; i++) {
    s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
  }
  s = s || '整';
  n = Math.floor(n);
  for (let i = 0; i < unit[0].length && n > 0; i++) {
    let p = '';
    for (let j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
    }
    s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    //s = p + unit[0][i] + s;
  }
  return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}
/**
 * @description 清除对象中值为空的属性
 * @param obj
 * @param keepValues
 * @return {{}}
 */
function clearKeys(obj, keepValues = [0, false]) {
  keepValues.forEach((item, index) => {
    keepValues[index] = Number.isNaN(item) ? 'NaN' : item
  });
  let _newPar = {};
  for (let key in obj) {
    if (checkValue(obj[key], keepValues) || (obj[key] && obj[key].toString().replace(/(^\s*)|(\s*$)/g, '') !== '')) {
      _newPar[key] = obj[key];
    }
  }
  return _newPar;
}
/**
 * @description 设置对象中值为空的属性的默认值
 * @param obj
 * @param keepValues
 * @param val
 * @return {{}}
 */
function fillKeys(obj, keepValues = [null, undefined, ''], val = '--') {
  keepValues.forEach((item, index) => {
    keepValues[index] = Number.isNaN(item) ? 'NaN' : item
  });
  let _newPar = {};
  for (let key in obj) {
    _newPar[key] = checkValue(obj[key], keepValues) ? val : obj[key];
  }
  return _newPar;
}
/**
 * @description 数据类型判断
 * @param o
 * @param type
 * @return {*}
 */
function isType(o, type) {
  if (!type) {
    //return Object.prototype.toString.call(o).split(/\s/)[1].replace(']','')
    return Object.prototype.toString.call(o).match(/\s(.*)]/)[1]
  }
  let _types = type.toLowerCase().split(',');
  let typeObj = {
    'string': '[object String]',
    'number': '[object Number]',
    'boolean': '[object Boolean]',
    'null': '[object Null]',
    'function': '[object Function]',
    'array': '[object Array]',
    'object': '[object Object]',
    'symbol': '[object Symbol]'
  }
  let typeFn = {
    nan() {
      return Number.isNaN(o);
    },
    elements() {
      return Object.prototype.toString.call(o).indexOf('HTML') !== -1;
    }
  }
  let _result;
  for (let item of _types) {
    if (typeObj[item]) {
      _result = Object.prototype.toString.call(o) === typeObj[item];
    }
    else {
      _result = typeFn[item]();
    }
    if (_result) {
      return _result;
    }
  }
  return false;
}
/**
 * @description 手机类型判断
 * @param type
 * @return {*}
 */
function getBrowserInfo(type) {
  let typeObj = {
    android: 'android',
    iphone: 'iphone',
    ipad: 'ipad',
    weixin: 'micromessenger'
  }
  return type ? navigator.userAgent.toLowerCase().indexOf(typeObj[type]) !== -1 : navigator.userAgent.toLowerCase();
}
/**
 * @description 函数节流
 * @param fn 执行的函数
 * @param delay 延迟的时间
 * @param mustDelay 最大间隔时间
 */
function throttle(fn, delay, mustDelay) {
  let timer = null;
  let t_start;
  return function () {
    let context = this, args = arguments, t_cur = +new Date();
    //先清理上一次的调用触发（上一次调用触发事件不执行）
    clearTimeout(timer);
    //如果不存触发时间，那么当前的时间就是触发时间
    if (!t_start) {
      t_start = t_cur;
    }
    //如果当前时间-触发时间大于最大的间隔时间（mustDelay），触发一次函数运行函数
    if (t_cur - t_start >= mustDelay) {
      fn.apply(context, args);
      t_start = t_cur;
    }
    //否则延迟执行
    else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    }
  };
}
/**
 * @description 函数防抖(在事件被触发n毫秒后再执行回调，如果在这n毫秒内又被触发，则重新计时)
 * @param fn 执行函数
 * @param delay 间隔时间
 */
function debounce(fn, delay) {
  return function (args) {
    let _this = this
    let _args = args
    clearTimeout(fn.id);
    fn.id = setTimeout(function () {
      fn.call(_this, _args)
    }, delay)
  }
}