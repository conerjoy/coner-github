import extend from './extend.js';
import utilSupport from '../utils/util.js';
import constant from '../constant/constant.js';

export default function(options) {
  var app = getApp();
  if (options != undefined) {
    if (options.datas != undefined) {
      options.data = options.datas();
    }
    var onLoads = options.onLoad; // page的onLoad
    var onReadys = options.onReady; // page的onReady
    var onShows = options.onShow; // page的onShow
    var onHides = options.onHide; // page的onHide
    var onUnloads = options.onUnload; // page的onUnload 
  }
  return extend(options || {}, {
    /**
     * 这是真正处理原生onLoad(options)的方法
     * 重写以下方法意在可以自定义在方法执行前可以做其他操作
     */
    onLoadHandle: onLoads,
    onReadyHandle: onReadys,
    onShowHandle: onShows,
    onHideHandle: onHides,
    onUnloadHandle: onUnloads,

    onLoad: function(args) {
      this.pageOptions = args;
      if (options.datas != undefined) {
        // 如果data为空则给一个默认值
        // 若datas对象不为未定义，那么page的data已datas为准
        options.data = options.datas();
        // if (this.setData != undefined) {
        this.data = Object.assign(this.data, options.datas());
        this.setData(Object.assign(this.data, options.datas()));
        // }
      }
      // 默认给定app的名字
			// style=self 表示使用json文件中的title，style=outside时，取出title字段作为标题
      if (this.style != "self") {
				let title = constant.appName;
				if (this.style == "outside" && this.title != undefined && this.title.length > 0) {
					title = this.title;
				}
        wx.setNavigationBarTitle({
          title: title,
        });
			}
			// 自定义tabbar第一次载入的选中方法
			if (this.tabData != undefined) {
				if (typeof this.getTabBar === 'function' &&
					this.getTabBar()) {
					this.getTabBar().setData({
						selected: this.tabData.selected
					})
				}
			}
      if (this.onLoadHandle != undefined) {
        this.onLoadHandle(args)
      }
      if (this.onLoadListener) {
        this.onLoadListener(args);
      }
    },

    onReady: function() {
      if (this.onReadyHandle != undefined) {
        this.onReadyHandle()
      }
      if (this.onReadyListener) {
        this.onReadyListener();
      }
    },

    onShow: function() {
      if (this.onShowHandle != undefined) {
        this.onShowHandle()
      }
      if (this.onShowListener) {
        this.onShowListener();
      }
    },

    onHide: function() {
      if (this.onHideHandle != undefined) {
        this.onHideHandle()
      }
    },

    onUnload: function() {
      if (this.onUnloadHandle != undefined) {
        this.onUnloadHandle()
      }
    },

    /**
     * 刷新当前页面
     */
    refreshPage: function() {
      let that = this;
      this.onLoadListener = (args) => {
        that.onReady();
        that.onLoadListener = undefined;
      }
      this.onReadyListener = () => {
        that.onShow();
        that.onReadyListener = undefined;
      }
      this.onLoad(this.pageOptions);
    },

    /**
     * 统一的跳转方法
     */
    jumpTo: utilSupport.throttle(function(event) {
      var app = getApp();
      var url = event.currentTarget.dataset.url;
      var disabled = event.currentTarget.dataset.disabled;
      if (disabled == undefined) {
        disabled = false;
      }
      console.log("url=" + url);
      if (disabled) {
        var toastMessage = event.currentTarget.dataset.message;
        if (toastMessage == undefined || toastMessage == '') {
          toastMessage = '暂未开放';
        }
        wx.showToast({
          title: toastMessage,
          icon: 'none'
        });
      } else {
        if (typeof url == 'string') {
          if (url !== "" && url !== null && url !== undefined) {
            if (url.indexOf("http") == 0 || url.indexOf("Http") == 0) {
              url = "/pages/common/pages/webview/webview?url=" + encodeURIComponent(encodeURIComponent(url));
            }
            if ((event.currentTarget.dataset.mold != undefined &&
                event.currentTarget.dataset.mold == 'redirect')) {
              wx.redirectTo({
                url: url,
              });
            } else {
              wx.navigateTo({
                url: url,
              });
            }
          }
        } else {
          if (url.action == 'showActionSheet') {
            var data = url.data;
            var nameList = [];
            var urlList = [];
            for (var key in data.item) {
              nameList = nameList.concat(data.item[key].name);
              urlList = urlList.concat(data.item[key].url);
            }
            wx.showActionSheet({
              itemList: nameList,
              success: res => {
                wx.navigateTo({
                  url: urlList[res.tapIndex]
                })
              }
            });
          }
        }
      }
    }, 1000)

  });
}