var wxCharts = require('../../utils/wxcharts.js');
var app = getApp();
var columnChart = null;
var chartData = {
  main: {
    title: '营养成分',
    data: [15, 20, 45, 37],
    categories: ['总热量', '碳水', '蛋白质', '脂肪']
  },
  sub: [{
    title: '2012年度成交量',
    data: [70, 40, 65, 100, 34, 18],
    categories: ['1', '2', '3', '4', '5', '6']
  }, {
    title: '2013年度成交量',
    data: [55, 30, 45, 36, 56, 13],
    categories: ['1', '2', '3', '4', '5', '6']
  }, {
    title: '2014年度成交量',
    data: [76, 45, 32, 74, 54, 35],
    categories: ['1', '2', '3', '4', '5', '6']
  }, {
    title: '2015年度成交量',
    data: [76, 54, 23, 12, 45, 65],
    categories: ['1', '2', '3', '4', '5', '6']
  }]
};
Page({
  data: {
    chartTitle: '总成交量',
    isMainChartDisplay: true,

    sports: ["静坐", "轻度运动", "中度运动", "重度运动","高强度运动"],

    tabs: ["早餐", "午餐", "晚餐", "零食"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,

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

  backToMainChart: function () {
    this.setData({
      chartTitle: chartData.main.title,
      isMainChartDisplay: true
    });
    columnChart.updateData({
      categories: chartData.main.categories,
      series: [{
        name: '成交量',
        data: chartData.main.data,
        format: function (val, name) {
          return val.toFixed(2) + '万';
        }
      }]
    });
  },

  touchHandler: function (e) {
    var index = columnChart.getCurrentDataIndex(e);
    if (index > -1 && index < chartData.sub.length && this.data.isMainChartDisplay) {
      this.setData({
        chartTitle: chartData.sub[index].title,
        isMainChartDisplay: false
      });
      columnChart.updateData({
        categories: chartData.sub[index].categories,
        series: [{
          name: '成交量',
          data: chartData.sub[index].data,
          format: function (val, name) {
            return val.toFixed(2) + '万';
          }
        }]
      });

    }
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  onReady: function (e) {
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
          return val.toFixed(2) + '万';
        }
      }, {
        name: '今日营养',
        data: chartData.main.data,
        format: function (val, name) {
          return val.toFixed(2) + '万';
      }
    }],
      yAxis: {
        format: function (val) {
          return val + '万';
        },
        title: 'hello',
        min: 0
      },
      xAxis: {
        disableGrid: false,
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