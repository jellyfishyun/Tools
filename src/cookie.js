/**
 * @description 设置cookie
 */
function setCookie(name, value, iDay) {
  let oDate = new Date();
  oDate.setDate(oDate.getDate() + iDay);
  document.cookie = name + '=' + value + ';expires=' + oDate;
}

/**
 * @description 获取cookie
 */
function getCookie(name) {
  let arr = document.cookie.split('; '), arr2;
  for (let i = 0; i < arr.length; i++) {
    arr2 = arr[i].split('=');
    if (arr2[0] === name) {
      return arr2[1];
    }
  }
  return '';
}

/**
 * @description 删除cookie
 */
function removeCookie(name) {
  setCookie(name, 1, -1);
}

/**
 * @description 操作cookie
 */
function cookie(name, value, iDay) {
  if (arguments.length === 1) {
    return getCookie(name);
  }
  else {
    setCookie(name, value, iDay);
  }
}