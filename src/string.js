/**
 * @description 清除左右空格
 */
function trim(str) {
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * @description 清除所有空格
 */
function trimAll(str) {
  return str.replace(/\s+/g, "");
}

/**
 * @description 清除左空格
 */
function trimLeft(str) {
  return str.replace(/(^\s*)/g, "");
}

/**
 * @description 清除右空格
 */
function trimRight(str) {
  return str.replace(/(\s*$)/g, "");
}

/**
 * @description 大小写切换
 */
function toggleCase(str) {
  let itemText = ""
  str.split("").forEach(item => {
    if (/^([a-z]+)/.test(item)) {
      itemText += item.toUpperCase();
    } else if (/^([A-Z]+)/.test(item)) {
      itemText += item.toLowerCase();
    } else {
      itemText += item;
    }
  });
  return itemText;
}

/**
 * @description 首字母大写
 */
function firstWordUpper(str) {
  return str.replace(/\b\w+\b/g, word => word.substring(0, 1).toUpperCase() + word.substring(1));
}

/**
 * @description 首字母小写
 */
function firstWordLower(str) {
  return str.replace(/\b\w+\b/g, word => word.substring(0, 1).toLowerCase() + word.substring(1));
}

/**
 * @description 加密字符串
 */
function encryptStr(str, regIndex, ARepText = '*') {
  let regText = '',
    Reg = null,
    _regIndex = regIndex.split(','),
    replaceText = ARepText;
  //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
  _regIndex = _regIndex.map(item => +item);
  regText = '(\\w{' + _regIndex[0] + '})\\w{' + (1 + _regIndex[1] - _regIndex[0]) + '}';
  Reg = new RegExp(regText);
  //let replaceCount = repeatStr(replaceText, (1 + _regIndex[1] - _regIndex[0]));
  let replaceCount = replaceText.repeat((1 + _regIndex[1] - _regIndex[0]));
  return str.replace(Reg, '$1' + replaceCount);
}

/**
 * @description 不加密字符串
 */
function encryptUnStr(str, regIndex, ARepText = '*') {
  let regText = '',
    Reg = null,
    _regIndex = regIndex.split(','),
    replaceText = ARepText;
  _regIndex = _regIndex.map(item => +item);
  regText = '(\\w{' + _regIndex[0] + '})(\\w{' + (1 + _regIndex[1] - _regIndex[0]) + '})(\\w{' + (str.length - _regIndex[1] - 1) + '})';
  Reg = new RegExp(regText);
  //let replaceCount1 = repeatStr(replaceText, _regIndex[0]);
  let replaceCount1 = replaceText.repeat(_regIndex[0]);
  //let replaceCount2 = repeatStr(replaceText, str.length - _regIndex[1] - 1);
  let replaceCount2 = replaceText.repeat(str.length - _regIndex[1] - 1);
  return str.replace(Reg, replaceCount1 + '$2' + replaceCount2);
}

/**
 * @description 字符串开始位置加密
 */
function encryptStartStr(str, length, replaceText = '*') {
  let regText = '(\\w{' + length + '})';
  let Reg = new RegExp(regText);
  //let replaceCount = repeatStr(replaceText, length);
  let replaceCount = replaceText.repeat(length);
  return str.replace(Reg, replaceCount);
}

/**
 * @description 字符串结束位置加密
 */
function encryptEndStr(str, length, replaceText = '*') {
  return encryptStartStr(str.split('').reverse().join(''), length, replaceText).split('').reverse().join('');
}

/**
 * @description 检测字符串
 */
function checkType(str, type) {
  return !!ruleData.checkType[type](str);
}

/**
 * @description 检测密码强度
 */
function checkPwdLevel(str) {
  let nowLv = 0;
  // if (str.length < 6) {
  //     return nowLv
  // }
  let rules = [/[0-9]/, /[a-z]/, /[A-Z]/, /[\.|-|_]/];
  for (let i = 0; i < rules.length; i++) {
    if (rules[i].test(str)) {
      nowLv++;
    }
  }
  return nowLv;
}

/**
 * @description 随机码
 */
function randomWord(count = 36) {
  return Math.random().toString(count).substring(2);
}

/**
 * @description 统计特定字符串的次数
 */
function countStr(str, strSplit) {
  return str.split(strSplit).length - 1
}

/**
 * @description 过滤特定类型字符串
 */
function filterStr(str, type, replaceStr = '') {
  let arr = Array.prototype.slice.call(arguments);
  let fnName = 'filter' + firstWordUpper(type);
  arr.splice(1, 1);
  return filterObj[fnName] ? filterObj[fnName].apply(null, arr) : false;
}

let filterObj = {
  /**
   * @description 过滤字符串的特殊符号
   */
  filterSpecialStr(str, replaceStr = '', spStr) {
    let regText = '$()[]{}?\|^*+./\"\'+', pattern, _regText = "[^0-9A-Za-z\\s", nowStr;
    //是否有哪些特殊符号需要保留
    if (spStr) {
      for (let j = 0, len = spStr.length; j < len; j++) {
        nowStr = '';
        if (regText.indexOf(spStr[j]) === -1) {
          nowStr = '\\';
        }
        _regText += nowStr + spStr[j];
      }
      _regText += ']';
    }
    else {
      _regText = "[^0-9A-Za-z\\s]";
    }
    pattern = new RegExp(_regText, 'g');
    return str = str.replace(pattern, replaceStr);
  },
  /**
   * @description 过滤字符串的html标签
   */
  filterHtml(str, replaceStr = '') {
    return str.replace(/<\/?[^>]*>/g, replaceStr);
  },
  /**
   * @description 过滤字符串的表情
   */
  filterEmjoy(str, replaceStr = '') {
    return str.replace(/[^\u4e00-\u9fa5|\u0000-\u00ff|\u3002|\uFF1F|\uFF01|\uff0c|\u3001|\uff1b|\uff1a|\u3008-\u300f|\u2018|\u2019|\u201c|\u201d|\uff08|\uff09|\u2014|\u2026|\u2013|\uff0e]/ig, replaceStr);
  },
  /**
   * @description 过滤字符串的大写字母
   */
  filterWordUpper(str, replaceStr = '') {
    return str.replace(/[A-Z]/g, replaceStr);
  },
  /**
   * @description 过滤字符串的小写字母
   */
  filterWordLower(str, replaceStr = '') {
    return str.replace(/[a-z]/g, replaceStr);
  },
  /**
   * @description 过滤字符串的数字
   */
  filterNumber(str, replaceStr = '') {
    return str.replace(/[1-9]/g, replaceStr);
  },
  /**
   * @description 过滤字符串的中文
   */
  filterChinese(str, replaceStr = '') {
    return str.replace(/[\u4E00-\u9FA5]/g, replaceStr);
  },
}
/**
 * @description 过滤字符串的特殊符号
 */
function filterSpecialStr(str, replaceStr = '', spStr) {
  return filterObj.filterSpecialStr.apply(null, arguments);
}
/**
 * @description 过滤字符串的html标签
 */
function filterHtml(str, replaceStr = '') {
  //return str.replace(/<\/?[^>]*>/g, replaceStr);
  return filterObj.filterHtml.apply(null, arguments);
}
/**
 * @description 过滤字符串的表情
 */
function filterEmjoy(str, replaceStr = '') {
  //return str.replace(/[^\u4e00-\u9fa5|\u0000-\u00ff|\u3002|\uFF1F|\uFF01|\uff0c|\u3001|\uff1b|\uff1a|\u3008-\u300f|\u2018|\u2019|\u201c|\u201d|\uff08|\uff09|\u2014|\u2026|\u2013|\uff0e]/ig, replaceStr);
  return filterObj.filterEmjoy.apply(null, arguments);
}
/**
 * @description 过滤字符串的大写字母
 */
function filterWordUpper(str, replaceStr = '') {
  //return str.replace(/[A-Z]/g, replaceStr);
  return filterObj.filterWordUpper.apply(null, arguments);
}
/**
 * @description 过滤字符串的小写字母
 */
function filterWordLower(str, replaceStr = '') {
  //return str.replace(/[a-z]/g, replaceStr);
  return filterObj.filterWordLower.apply(null, arguments);
}
/**
 * @description 过滤字符串的数字
 */
function filterNumber(str, replaceStr = '') {
  //return str.replace(/[1-9]/g, replaceStr);
  return filterObj.filterNumber.apply(null, arguments);
}
/**
 * @description 过滤字符串的中文
 */
function filterChinese(str, replaceStr = '') {
  //return str.replace(/[\u4E00-\u9FA5]/g, replaceStr);
  return filterObj.filterChinese.apply(null, arguments);
}
/**
 * @description 格式化处理字符串
 */
function formatText(str, size = 3, delimiter = ',') {
  let regText = '\\B(?=(\\w{' + size + '})+(?!\\w))';
  let reg = new RegExp(regText, 'g');
  return str.replace(reg, delimiter);
}
/**
 * @description 找出最长单词
 * @param str
 * @param splitType
 * @return {{el: string, max: number}}
 */
function longestWord(str, splitType = /\s+/g) {
  let _max = 0, _item = '';
  let strArr = str.split(splitType);
  strArr.forEach(item => {
    if (_max < item.length) {
      _max = item.length;
      _item = item;
    }
  });
  return { el: _item, max: _max };
}
/**
 * @description 句中单词首字母大写
 * @param str
 * @param splitType
 * @return {*}
 */
function titleCaseUp(str, splitType = /\s+/g) {
  //这个我也一直在纠结，英文标题，即使是首字母大写，也未必每一个单词的首字母都是大写的，但是又不知道哪些应该大写，哪些不应该大写
  let strArr = str.split(splitType),
    result = "";
  strArr.forEach(item => {
    result += firstWordUpper(item, 1) + ' ';
  });
  return trimRight(result)
}

