var Api = require('../../utils/api.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodId:0,
    eatTypes: ['早餐', '午餐', '中餐', '零食'],
    eatTypeIndex:0,
    time: '08:00',
    unitsCheckedIndex:0,
    result : {id:0,name:"未知",components:[],href:""},
  },
  TimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  eatTypeChange(e){
    this.setData({
      eatTypeIndex: e.detail.value
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
  unitsChange: function(e) {
    this.setData({
      unitsCheckedIndex: e.detail.value
    })
  },
  formSubmit: function(e) {
    //todo 添加进食
    var params = {
      "food_id":parseInt(this.data.foodId),
      "unit_name": this.data.result.components[this.data.unitsCheckedIndex].unit_name,
      "unit_id": parseInt(this.data.result.components[this.data.unitsCheckedIndex].id),
      "eat_type":e.detail.value.eat_type,
      "eat_time":e.detail.value.eat_time,
      "eat_num":parseInt(e.detail.value.eat_num)
    }
    console.log(params)
    wx.request({
      url: Api.addEat(),
      data:params,
      method:"POST",
      dataType:"json",
      success: function(res) {
        console.log(res.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({foodId:options.id})
    console.log(options)
    var that = this
    wx.request({
      url: Api.info({id:options.id}),
      success: function(res) {
        console.log(res.data)
        that.setData({
          result : res.data
        });
      }
    })
  },

})