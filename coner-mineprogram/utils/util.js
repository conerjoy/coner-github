function formatTime(number, format) {
  if (number == undefined || number == '') {
    return '';
  }
  if(format == undefined) {
    format = 'Y-M-D h:m:s';
  }
  var formateArr = ['Y', 'M', 'D', 'h', 'm', 's'];
  var returnArr = [];
  var date = new Date(number);
  returnArr.push(date.getFullYear());
  returnArr.push(formatNumber(date.getMonth() + 1));
  returnArr.push(formatNumber(date.getDate()));
  returnArr.push(formatNumber(date.getHours()));
  returnArr.push(formatNumber(date.getMinutes()));
  returnArr.push(formatNumber(date.getSeconds()));
  for (var i = 0; i < returnArr.length; i++) {
    format = format.replace(formateArr[i], returnArr[i]);
  }
  return format;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 这是防止因为用户多次点击而发生错误的方法
 */
function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null

  // 返回新的函数
  return function() {
    let _nowTime = +new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments) //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}

/**
 * 函数去抖
 * 空闲控制 返回函数连续调用时，空闲时间必须大于或等于 wait，func 才会执行
 * @param func {function}  请求关联函数，实际应用需要调用的函数
 * @param wait   {number}    空闲时间，单位毫秒
 * @param immediate   {boolean}    是否立即执行
 * @return {function}    返回客户调用函数
 */
function debounce(func, wait, immediate) {
  let time;
  let debounced = function() {
    let context = this;
    if (time) clearTimeout(time);

    if (immediate) {
      let callNow = !time;
      if (callNow) func.apply(context, arguments);
      time = setTimeout(
        () => {
          time = null
        }, wait);
    } else {
      time = setTimeout(
        () => {
          func.apply(context, arguments);
        }, wait);
    }
  }
  debounced.cancel = function() {
    clearTimeout(time);
    time = null;
  }
  return debounced;
}

/**
 * 获取url中的参数信息
 * 返回一个数组，每个对象key/value
 */
function getUrlParams(url) {
  var paramList = [];
  var newUrl = url;
  var urlArray = newUrl.split("?");
  var protocol = urlArray[0];
  if (urlArray.length > 1) {
    var paramString = urlArray[1]
    var params = paramString.split("&");

    for (var item in params) {
      var itemObj = {};

      var keyValue = item.split("=");
      itemObj.key = keyValue[0];
      itemObj.value = keyValue[1];
      paramList = paramList.concat(keyValue);
    }
  }
  return paramList;
}

module.exports = {
  formatTime: formatTime,
  throttle: throttle,
  debounce: debounce,
  getUrlParams: getUrlParams
}