import coner from '../../../../coner/coner.js';
import utilSupport from "../../../../utils/util.js"

var app = getApp();

Page(coner.page({

  datas: () => {
    return coner.extends({
      webUrl: "",
      title: "coner-miniprogram"
    }, app.globalData)
  },

  onLoad: function(options) {
    var url = options.url,
      decodeURI = "",
      newTitle = this.data.title;
    if (url != undefined) {
      decodeURI = decodeURIComponent(decodeURIComponent(url));
      var params = utilSupport.getUrlParams(decodeURI);
      for (var item in params) {
        if (item.key == "title") {
          // 如果传来的参数中有title参数则以参数title为准
          newTitle = item.value
          break;
        }
      }
    }
    wx.setNavigationBarTitle({
      title: newTitle
    });
    this.setData({
      webUrl: decodeURI,
      title: newTitle
    });
  }
}))