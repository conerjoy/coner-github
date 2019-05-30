import coner from '../../../../coner/coner.js';

export default {
  createPage: createPage
}

function createPage() {
  var app = getApp();
  return coner.page({
    style: "outside",
    tabData: {
      selected: 1
    },

    datas() {
      return coner.extends({

      }, app.globalData);
    },

    onLoad: function(options) {
      
    }
  });
}