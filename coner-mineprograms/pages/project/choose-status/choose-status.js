import coner from '../../../coner/coner.js'

var app = getApp();

Page(coner.page({

  datas() {
    return coner.extends({
      tabPath: '/pages/tabbar/tabpage/firsttab/firsttab'
    }, app.globalData);
  },
 
  onLoad: function() {
    let realList = coner.tabbar.getTabbarData();
    this.setData({
      tabPath: realList.data[0].mainPagePath
    });
  },

  statusClick: function(event) {
    let status = event.currentTarget.dataset.status;
    app.setStorageValue({
      storage: 'userData',
      datas: {
        status: status
      }
    });
    wx.switchTab({
      url: this.data.tabPath
    });
  }
}));