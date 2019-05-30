import coner from '../coner/coner.js';
var app = getApp();
Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#d4237a",
    backgroundColor: "white",
    list: {}
  },
  attached() {
		let realList = coner.tabbar.getTabbarData();
		this.setData({
			list: realList
		});
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({
        url: url,
				complete: res => {
				}
      })
      this.setData({
        selected: data.index
      })
      app.syncTabData();
    }
  }
})