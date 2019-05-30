import constant from '../constant/constant.js';

const permissions = {
  "scope.userInfo": "用户信息",
  "scope.userLocation": "地理位置",
  "scope.address": "通讯地址",
  "scope.invoiceTitle": "发票抬头",
  "scope.invoice": "获取发票",
  "scope.werun": "微信运动步数",
  "scope.record": "录音功能",
  "scope.writePhotosAlbum": "保存到相册",
  "scope.camera": "摄像头",
};

/**
 * 请求单个或多个权限 
 * @param permissions 权限数组
 */
function requestPermissions(options) {
  let that = this;
  if (options == undefined || options.permissions == undefined) {
    return;
  }
  for (let key in options.permissions) {
    let permission = options.permissions[key]
    wx.authorize({
      scope: permission,
      success: res => {
        console.log(res);
      },
      fail: res => {
        // 报错信息为errMsg: "authorize:fail auth deny"
        if (res.errMsg.indexOf("deny") >= 0) {
          wx.showModal({
            title: '提示',
            content: constant.appName + '缺少' + that.permissions[permission] + '权限，是否立即去开启？',
            showCancel: true,
            confirmText: '前往',
            cancelText: '取消',
            confirmColor: '#0f0',
            success: res => {
              if (res.confirm) {
                wx.openSetting({});
              }
            }
          })
        }
      }
    });
  }
}

/**
 * 判断传入的单个或多个权限是否被授权了
 * @param permissions 权限数组
 * @param needRequest 是否需要请求权限
 * success: res 返回未获得权限的数组
 */
function checkPermissions(options) {
  if (options == undefined || options.permissions == undefined) {
    return;
  }
  let that = this;
  // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
  wx.getSetting({
    success(res) {
      let noPermissions = [];
      for (let permission in options.permissions) {
        if (!res.authSetting[permission]) {
          noPermissions = noPermissions.concat(options.permissions[permission]);
        }
      }
      if (options.success != undefined) {
        options.success({
          noPermissions: noPermissions
        });
      }
      if (options.needRequest) {
        that.requestPermissions({
          permissions: noPermissions
        });
      }
    }
  })
}

/**
 * 自定义tabbar的同步数据的方法
 */
function syncTabData() {
  let pages = getCurrentPages();
  let currentPage = pages[pages.length - 1];
  if (currentPage != undefined) {
    if (typeof currentPage.getTabBar === 'function' &&
      currentPage.getTabBar()) {
      if (currentPage.tabData != undefined) {
        currentPage.getTabBar().setData({
          selected: currentPage.tabData.selected
        })
      }
    }
  }
}

/**
 * 其他一些辅助方法放在这里
 */
export default {
  permissions: permissions,
  checkPermissions: checkPermissions,
  requestPermissions: requestPermissions,
  syncTabData: syncTabData
}