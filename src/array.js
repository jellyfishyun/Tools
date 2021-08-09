/**
 * @description 数组去重
 * @param arr
 * @return {[*]}
 */
function unique(arr) {
  return [...new Set(arr)]
}

/**
 * @description 数组顺序打乱
 * @param arr
 * @return {Array.<T>}
 */
function upset(arr) {
  let j, _item;

  for (let i = 0; i < arr.length; i++) {
    j = Math.floor(Math.random() * i);
    _item = arr[i];
    arr[i] = arr[j];
    arr[j] = _item;
  }

  return arr;
}

/**
 * @description 数组最大值（数值数组）
 * @param arr
 */
function max(arr) {
  return Math.max(...arr);
}

/**
 * @description 数组最小值（数值数组）
 * @param arr
 */
function min(arr) {
  return Math.min(...arr);
}

/**
 * @description 数组求和（数值数组）
 * @param arr
 */
function sum(arr) {
  return arr.reduce((pre, cur) => pre + cur)
}

/**
 * @description 数组平均值,小数点可能会有很多位，这里不做处理，处理了使用就不灵活了（数值数组）
 * @param arr
 */
function average(arr) {
  return sum(arr) / arr.length;
}

/**
 * @description 深拷贝
 * @param obj
 */
function clone(obj) {
  if (!obj && typeof obj !== 'object') {
    return;
  }
  let newObj = obj.constructor === Array ? [] : {};

  for (let key in obj) {
    if (obj[key]) {
      if (obj[key] && typeof obj[key] === 'object') {
        newObj[key] = obj[key].constructor === Array ? [] : {};
        //递归
        newObj[key] = clone(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  return newObj;
}

/**
 * @description 从数组中随机获取元素
 * @param arr
 * @param num
 * @return {*}
 */
function getRandom(arr, num = 1) {
  let _arr = clone(arr), nowIndex, result = [];

  for (let i = 0; i < num; i++) {
    nowIndex = Math.floor(Math.random() * _arr.length);
    result.push(_arr[nowIndex]);
    _arr.splice(nowIndex, 1);
  }

  return num > 1 ? result : result[0];
}

/**
 * @description 降序返回数组（字符串）每个元素的出现次数
 * @param arr
 * @param item
 * @return {Array|Number}
 */
function count(arr, item) {
  //是否只返回一个元素的次数
  if (item) {
    let num = 0;
    for (let i = 0, len = obj.length; i < len; i++) {
      if (item === obj[i]) {
        num++;
      }
    }
    return num;
  }
  let obj = {}, k, arr1 = []
  //记录每一元素出现的次数
  for (let i = 0, len = arr.length; i < len; i++) {
    k = arr[i];
    if (obj[k]) {
      obj[k]++;
    } else {
      obj[k] = 1;
    }
  }
  //保存结果{el-'元素'，count-出现次数}
  for (let o in obj) {
    arr1.push({ el: o, count: obj[o] });
  }
  //排序（降序）
  arr1.sort(function (n1, n2) {
    return n2.count - n1.count
  });
  return arr1;
}
/**
 * @description 删除值为'val'的数组元素
 * @param arr
 * @param val
 * @return {Array}
 */
function removeArrayForValue(arr, val) {
  return arr.filter(item => item !== val)
}
/**
 * @description 删除值含有'val'的数组元素
 * @param arr
 * @param val
 * @return {Array}
 */
function removeArrayForLike(arr, val) {
  return arr.filter(item => item.indexOf(val) === -1);
}
/**
 * @description 排除对象某些项
 * @param obj
 * @param keys
 * @return {Array}
 */
function filterKeys(obj, keys) {
  let newArr = [];
  let _keys = keys.split(','), newArrOne = {};
  let _arr = [].concat(obj);
  for (let i = 0, len = _arr.length; i < len; i++) {
    newArrOne = {};
    for (let key in _arr[i]) {
      //如果key不存在排除keys里面,添加数据
      if (_keys.indexOf(key) === -1) {
        newArrOne[key] = _arr[i][key];
      }
    }
    newArr.push(newArrOne);
  }
  return newArr;
}
/**
 * @description 对象数组排序
 * @param arr
 * @param sortText
 * @return {*}
 */
function sortBy(arr, sortText) {
  if (!sortText) {
    return arr
  }
  let _sortText = sortText.split(',').reverse(), _arr = arr.slice(0);
  for (let i = 0, len = _sortText.length; i < len; i++) {
    _arr.sort((n1, n2) => {
      return n1[_sortText[i]] - n2[_sortText[i]]
    })
  }
  return _arr;
}
/**
 * @description 数组扁平化
 * @param arr
 * @return {Array}
 */
function steamroller(arr) {
  let flattened = [].concat(...arr);
  return flattened.some(item => Array.isArray(item)) ? steamroller(flattened) : flattened;
}