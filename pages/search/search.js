var Api = require('../../utils/api.js');

Page({
  data: {
    inputShowed: true,
    inputVal: "",
    result : [],
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    console.log(e.detail.value)
    this.setData({
      inputVal: e.detail.value
    });
    this.fetchData({q:e.detail.value})
  },

  fetchData: function(params) {
    var that = this
    wx.request({
      url: Api.search(params),
      success: function(res) {
        console.log(res.data)
        that.setData({
          result : res.data
        });
      }
    })
  },
});