var Api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    picker: ['早餐', '午餐', '中餐', '零食'],
    time: '08:00',
    unitsCheckedIndex:0,
    units: [],
    result : {id:0,name:"未知",components:[],href:""},
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
    this.setData({
      unitsCheckedIndex: e.detail.value
    })
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    this.fetchData({id:options.id})
  },

  fetchData: function(params) {
    var that = this
    wx.request({
      url: Api.info(params),
      success: function(res) {
        console.log(res.data)
        that.setData({
          result : res.data
        });
        that.setData({
          infos: res.data.components[0]
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})