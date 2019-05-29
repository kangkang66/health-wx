var wxCharts = require('../../utils/wxcharts.js');
var columnChart = null;
var chartData = {
  main: {
    title: '营养成分',
    data: [15, 20, 45, 37],
    data2: [10, 24, 35, 40],
    categories: ['总热量', '碳水', '蛋白质', '脂肪']
  }
};
Page({
  data: {
    //运动列表
    sports: ["静坐", "轻度运动", "中度运动", "重度运动","高强度运动"],
    //饮食类型
    tabs: ["早餐", "午餐", "晚餐", "零食"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

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
      categories: chartData.main.categories,
      series: [{
        name: '目标营养',
        data: chartData.main.data,
        format: function (val, name) {
          //return val.toFixed(2);
          return val;
        }
      }, {
        name: '今日营养',
        data: chartData.main.data2,
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