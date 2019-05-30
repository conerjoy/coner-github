import coner from "./coner/coner.js";
import constant from "./constant/constant.js";

App(coner.app({
  globalData: coner.extends({
    userInfo: null
  }, constant),

  onLaunch: function() {
    console.log(this.globalData)
  }
}));