var Api = require('../../utils/api.js');
Page({
  data: {
    inputShowed: true,
    inputVal: "",
    result : [],
    eatType:0,
  },
  onLoad(e) {
    console.log("onload",e)
    if (e.eat_type) {
      this.setData({
        eatType:e.eat_type
      })
    }
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
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      inputVal: e.detail.value
    });
    var that = this
    wx.request({
      url: Api.search({q:e.detail.value}),
      success: function(res) {
        console.log(res.data)
        that.setData({
          result : res.data,
          loadProgress: 100
        });
        wx.hideLoading()
      }
    })

  }
});