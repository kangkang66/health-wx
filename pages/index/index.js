var wxCharts = require('../../utils/wxcharts.js');
var Api = require('../../utils/api.js');
var columnChart = null;
Page({
  data: {
    //运动列表
    sports: ["静坐", "轻度运动", "中度运动", "重度运动","高强度运动"],
    //饮食类型
    tabs: ["早餐", "午餐", "晚餐", "零食"],
    //列表切换
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    //目标数据
    targetData:[0,0,0,0],
    //当前数据
    currentData:[0,0,0,0],
    //食用列表
    eat:{date:"",uid:"",eat_score:0,breakfast:[],lunch:[],dinner:[],snacks:[],score:{},exercise:1.37},
  },
  onLoad:function (e) {
    //登录
    wx.login({
      success (res) {
        console.log(res)
        wx.request({
          url: Api.wxLogin({code: res.code}),
          success: function(res) {
            console.log(res.data)
            wx.setStorageSync("openid", res.data.openid)
          }
        })
      },
      fail(res) {
        console.log(res)
      }
    })

    //获取数据
    var that = this
    wx.request({
      url:Api.Eat(),
      success(res) {
        console.log(res.data)
        that.setData({
          targetData:[res.data.score.calorie_target, res.data.score.fat_target, res.data.score.carbohydrate_target, res.data.score.protein_target],
          currentData:[res.data.score.calorie_today, res.data.score.fat_today, res.data.score.carbohydrate_today, res.data.score.protein_today],
          eat:res.data
        })

      }
    })
  },
  onReady: function (e) {
    this.canvas(e)
  },
  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.navigateTo({url:"/pages/search/search?search=123456"})
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
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
  canvas: function (e) {
    var windowWidth = 320;
    try {
      var res = wx.getSystemInfoSync();
      windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }
    columnChart = new wxCharts({
      canvasId: 'columnCanvas',
      type: 'column',
      animation: true,
      categories: ['总热量', '碳水', '蛋白质', '脂肪'],
      series: [{
        name: '目标营养',
        data: this.data.targetData,
        format: function (val, name) {
          //return val.toFixed(2);
          return val;
        }
      }, {
        name: '今日营养',
        data: this.data.currentData,
        format: function (val, name) {
          return val;
        }
      }],
      yAxis: {
        format: function (val) {
          return val;
        },
        title: '今日饮食数据',
        min: 0
      },
      xAxis: {
        disableGrid: true,
        type: 'calibration'
      },
      extra: {
        column: {
          width: 15
        }
      },
      width: windowWidth,
      height: 200,
    });
  }
});