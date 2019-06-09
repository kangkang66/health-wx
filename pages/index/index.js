var wxCharts = require('../../utils/wxcharts.js');
var Api = require('../../utils/api.js');
var columnChart = null;
var targetData = [0,0,0,0];
var currentData = [0,0,0,0];

Page({
  data: {
    //运动列表
    sports: ["静坐", "轻度运动", "中度运动", "重度运动","高强度运动"],
    sportsVal: [1.2, 1.37, 1.55, 1.73, 1.9],
    sportIndex:0,
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
    var that = this
    wx.login({
      success (res) {
        console.log(res)
        //请求后端登录
        wx.request({
          url: Api.wxLogin({code: res.code}),
          success: function(res) {
            console.log(res.data)
            wx.setStorageSync("openid", res.data.openid)
            if (res.data.height==0 || res.data.weight==0) {
              //新用户引导填充信息
              wx.redirectTo({url:"/pages/info/info"})
            }else{
              console.log("hello", that.data.eat)
              if(that.data.eat.uid === "") {
                //登录成功获取首页数据. 防止和onShow重复拉取，因为先执行onShow
                that.indexData()
              }
            }
          }
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  },
  onShow:function(){
    //每次进入这个页面都需要刷新
    this.indexData()
  },
  indexData: function () {
    //获取数据
    var that = this
    wx.request({
      url:Api.Eat(),
      success(res) {
        console.log(res.data)
        var idx = that.data.sportsVal.indexOf(res.data.exercise)
        idx == -1 ? 0:idx
        that.setData({
          sportIndex:idx,
          targetData:[res.data.score.calorie_target, res.data.score.fat_target, res.data.score.carbohydrate_target, res.data.score.protein_target],
          currentData:[res.data.score.calorie_today, res.data.score.fat_today, res.data.score.carbohydrate_today, res.data.score.protein_today],
          eat:res.data
        })
        targetData = [res.data.score.calorie_target, res.data.score.fat_target, res.data.score.carbohydrate_target, res.data.score.protein_target]
        currentData = [res.data.score.calorie_today, res.data.score.fat_today, res.data.score.carbohydrate_today, res.data.score.protein_today]
        //绘图
        that.canvas()
        //停止下拉刷新动画
        wx.stopPullDownRefresh()
      }
    })
  },
  onPullDownRefresh: function() {
    console.log("pull down")
    this.indexData();
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  bindSportChange : function(e) {
    this.setData({
      sportIndex:e.detail.value
    })
    var exerVal = this.data.sportsVal[e.detail.value]
    wx.request({
      url:Api.Exercise(),
      method:"POST",
      data:{"exercise":exerVal},
      success(res) {
        console.log(res)
        //重新渲染数据
        wx.startPullDownRefresh()
      }
    })

  },
  canvas: function () {
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
      categories: ['总热量', '脂肪', '碳水物', '蛋白质'],
      series: [{
        name: '目标营养',
        data: targetData,
        format: function (val, name) {
          return val;
        }
      }, {
        name: '今日营养',
        data: currentData,
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