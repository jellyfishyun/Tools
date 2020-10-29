/**
 * 根据 UA 判断访问终端
 */
const browserVersion = () => {
  const UA = navigator.userAgent

  return {
    trident: UA.indexOf('Trident') > -1, // IE内核
    presto: UA.indexOf('Presto') > -1, // opera内核
    webKit: UA.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
    gecko: UA.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, // 火狐内核
    mobile: !!UA.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!UA.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: UA.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
    iPhone: UA.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
    iPad: UA.indexOf('iPad') > -1, // 是否iPad
    webApp: UA.indexOf('Safari') == -1, // 是否web应该程序，没有头部与底部
    weixin: UA.indexOf('MicroMessenger') > -1, // 是否微信 （2015-01-22新增）
    qq: UA.match(/\sQQ/i) == ' qq' // 是否QQ
  }
}

export default { browserVersion }
