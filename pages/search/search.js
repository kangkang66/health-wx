var Api = require('../../utils/api.js');
var erWeiMa = ['QR_CODE','DATA_MATRIX','PDF_417','WX_CODE']

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
  },
  scan(e){
    console.log("scan")
    var that = this
    wx.scanCode({
      success(res) {
        if (erWeiMa.indexOf(res.scanType) !== -1) {
          wx.showToast({
            title:"请扫描商品条形码",
            icon:"none"
          })
        }else{
          console.log(res.result)
          wx.request({
            url:Api.scanCode({code:res.result}),
            success(res) {
              var e = {detail:{value:res.data.name}}
              that.inputTyping(e)
            }
          })
        }
      }
    })
  }
});