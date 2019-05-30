import constant from "../constant/constant.js";

/**
 * 监听网络状态
 */
function getNetWorkStates(options) {
  wx.getNetworkType({
    success: res => {
      if (res.networkType == 'none') {
        wx.showToast({
          title: '当前无网络',
          icon: 'none'
        });
        if (options != undefined && options.none) {
          options.none();
        }
      } else {
        if (options != undefined && options.connect) {
          options.connect(res);
        }
      }
    },
    fail: res => {
      if (options != undefined && options.fail) {
        options.fail(res);
      }
    },
    complete: res => {
      if (options != undefined && options.complete) {
        options.complete(res);
      }
    }
  })
}

/**
 * 同步获取storage
 */
function getStorageSync(key) {
  var data = {};
  try {
    data = wx.getStorageSync(key);
  } catch (e) {
    console.log(e)
  }
  return data;
}

/**
 * 同步获取storage中的其中一个键值对
 */
function getStorageValueSync(options) {
  var data = {};
  try {
    data = wx.getStorageSync(options.storage);
  } catch (e) {
    console.log(e);
  }
  var result = this.getDataType(data);
  var value;
  if (result == "Object" || result == "Array") {
    for (var itemKey in data) {
      if (options.key == itemKey) {
        value = data[itemKey];
        break;
      }
    }
  }
  return value;
}

/**
 * 获取storage中的其中一个键值对
 */
function getStorageValue(options) {
  let that = this;
  wx.getStorage({
    key: options.storage,
    success: res => {
      var result = that.getDataType(res.data);
      var value;
      if (result == "Object" || result == "Array") {
        for (var itemKey in res.data) {
          if (options.key == itemKey) {
            value = res.data[itemKey];
            break;
          }
        }
      }
      if (options != undefined && options.success != undefined) {
        options.success(value);
      }
    },
    fail: res => {
      if (options != undefined && options.fail != undefined) {
        options.fail(res);
      }
    },
    complete: res => {
      if (options != undefined && options.complete != undefined) {
        options.complete(res);
      }
    }
  })
}

/**
 * 获取storage数据
 * options.datas => 数据类型是对象
 */
function setStorageValue(options) {
	let that = this;
  var data = {};
  try {
    const res = wx.getStorageInfoSync();
    for (let key in res.keys) {
			if (res.keys[key] == options.storage) {
        data = wx.getStorageSync(options.storage);
      }
    }
  } catch (e) {
    console.log(e);
  }
  for (var dataKey in options.datas) {
		data[dataKey] = options.datas[dataKey];
  }
  wx.setStorage({
    key: options.storage,
    data: data,
  })
}

/**
 * 将所有字段置为空字符串
 */
function cleanStorage(options) {
  var data = {};
  try {
    data = wx.getStorageSync(options.storage);
  } catch (e) {
    console.log(e);
  }
  for (var key in data) {
    data[key] = '';
  }
  wx.setStorage({
    key: options.storage,
    data: data,
  })
}

/**
	 * 判断对象是否为空
	 */
function isEmptyObject(obj) {
	for (var key in obj) {
		return false;
	};
	return true;
};

/**
 * 封装请求
 */
function baseRequest(options) {
  var url = "";
  if (options.url != undefined) {
    url = options.url;
  }
  // 请求的参数对象
  var requestObj = {
    method: "POST",
    header: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: url,
    data: options.data,
    success: res => {
      if (options != undefined && options.success != undefined) {
        options.success(res);
      }
    },
    fail: res => {
      if (options != undefined && options.fail != undefined) {
        options.fail(res);
      }
    },
    complete: res => {
      if (options != undefined && options.complete != undefined) {
        options.complete(res);
      }
      console.log("**********************");
      console.log(options);
      console.log(res);
      console.log("**********************");
    }
  };
  this.getNetWorkStates({
    connect: rs => {
      wx.request(requestObj);
    },
    none: () => {}
  });
}

/**
 * 上传文件的方法
 */
function uploadFile(options) {
  wx.uploadFile({
    url: options.url,
    filePath: options.filePath,
    name: options.name,
    formData: options.formData,
    header: {
      "Content-Type": "multipart/form-data"
    },
    success: function(res) {
      if (typeof res.data !== 'object') {
        res.data = JSON.parse(res.data);
      }
      if (options != undefined && options.success != undefined) {
        options.success(res);
      }
    },
    fail: function(res) {
      if (typeof res.data !== 'object') {
        res.data = JSON.parse(res.data);
      }
      if (options != undefined && options.fail != undefined) {
        options.fail(res);
      }
    },
    complete: function(res) {
      if (typeof res.data !== 'object') {
        res.data = JSON.parse(res.data);
      }
      if (options != undefined && options.complete != undefined) {
        options.complete(res);
      }
      console.log("**********************");
      console.log(options);
      console.log(res);
      console.log("**********************");
    },
  })
}

/**
 * 下载文件的方法
 */
function downloadFile(options) {
  wx.downloadFile({
    url: options.url,
    header: {
      "Content-Type": "multipart/form-data"
    },
    success: function(res) {
      if (options != undefined && options.success != undefined) {
        options.success(res);
      }
    },
    fail: function(res) {
      if (options != undefined && options.fail != undefined) {
        options.fail(res);
      }
    },
    complete: function(res) {
      if (options != undefined && options.complete != undefined) {
        options.complete(res);
      }
      console.log("**********************");
      console.log(options);
      console.log(res);
      console.log("**********************");
    },
  })
}

/**
 * 自动添加token的request方法
 */
function request(options) {
  let that = this;
  that.checkToken({
    success: token => {
      // token可用，直接请求
      var data = Object.assign(options.data, {
        token: token
      });
      that.baseRequest(options);
    }
  });
}

/**
 * 检查token是否可用
 * 回调一个可用的token
 */
function checkToken(options) {
  var userData = this.getStorageSync('userData');
  var tokenTime = this.getStorageValueSync({
    storage: 'userData',
    key: 'tokenTime'
  });
  var expired = this.getStorageValueSync({
    storage: 'userData',
    key: 'expired'
  });
  var token = this.getStorageValueSync({
    storage: 'userData',
    key: 'token'
  });
  var nowTime = new Date().getTime();
  if (nowTime > (tokenTime + (parseInt(expired) * 1000))) {
    // 超过了token有效时间，重新获取token
    this.refershToken({
      success: res => {
        // token获取成功后重新请求一次 
        this.checkToken(options);
      }
    });
  } else {
    if (options != undefined && options.success != undefined) {
      options.success(token);
    }
    return;
  }
}

/**
 * 获取token
 */
function refershToken(options) {
  let that = this;
  var data = {};
  wx.getStorage({
    key: 'userData',
    success: function(res) {
      data = res.data;
      that.baseRequest({
        method: "post",
        url: constant.baseUrl + "xxxx/xxxxx",
        data: {
          phone: data.phone,
          token: data.token
        },
        success: rs => {
          if (rs.data.meta.code == '0') {
            that.setStorageValue({
              storage: "userData",
              datas: {
                token: rs.data.data.token,
                expired: rs.data.data.expired,
                tokenTime: new Date().getTime()
              }
            });
            if (options != undefined && options.success != undefined) {
              options.success();
            }
          } else {
            wx.showToast({
              title: rs.data.meta.message,
              icon: 'none'
            });
            if (options != undefined && options.fail != undefined) {
              options.fail(rs);
            }
          }
        },
        fail: res => {
          if (options != undefined && options.fail != undefined) {
            options.fail(rs);
          }
        }
      });
    },
    fail: res => {

    },
    complete: res => {

    }
  });
}

/**
 * 获取对象类型
 */
function getDataType(o) {
  if (o instanceof Array) {
    return 'Array'
  } else if (o instanceof Object) {
    return 'Object';
  } else {
    return 'param is no object type';
  }
}


export default {
  getDataType: getDataType,
  request: request,
  baseRequest: baseRequest,
  checkToken: checkToken,
  uploadFile: uploadFile,
  downloadFile: downloadFile,
  refershToken: refershToken,
  setStorageValue: setStorageValue,
  getStorageValue: getStorageValue,
  getStorageValueSync: getStorageValueSync,
  getStorageSync: getStorageSync,
  cleanStorage: cleanStorage,
  getNetWorkStates: getNetWorkStates,
	isEmptyObject: isEmptyObject
}