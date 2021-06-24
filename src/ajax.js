/** @description  封装ajax函数
 *  @param {string}obj.type http连接的方式，包括POST和GET两种方式
 *  @param {string}obj.url 发送请求的url
 *  @param {boolean}obj.async 是否为异步请求，true为异步的，false为同步的
 *  @param {object}obj.data 发送的参数，格式为对象类型
 *  @param {function}obj.success ajax发送并接收成功调用的回调函数
 *  @param {function}obj.error ajax发送失败或者接收失败调用的回调函数
 */
function ajax(obj) {
  let _options = Object.assign({
    type: 'GET',
    url: '',
    async: true,
    data: null,
    success() {
    },
    error() {
    }
  }, obj);
  _options.type = _options.type.toUpperCase();
  let xmlHttp = null;
  if (XMLHttpRequest) {
    xmlHttp = new XMLHttpRequest();
  } else {
    xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
  }
  let params = [];
  for (let key in _options.data) {
    params.push(key + '=' + _options.data[key]);
  }
  let postData = params.join('&');
  if (_options.type.toUpperCase() === 'GET') {
    xmlHttp.open(_options.type, `${_options.url}?${postData}`, _options.async);
    xmlHttp.send(null);
  } else if (_options.type.toUpperCase() === 'POST') {
    xmlHttp.open(_options.type, _options.url, _options.async);
    xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
    xmlHttp.send(postData);
  }
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
      _options.success(xmlHttp.responseText);
    } else {
      _options.error(xmlHttp.responseText);
    }
  };
}