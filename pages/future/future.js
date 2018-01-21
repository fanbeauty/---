import {Future} from 'future-model.js';
var future = new Future();
var musicControl = require('../../utils/music.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // status 定义页面的状态 , 1,left 2,right
    status:1,
    aqi:'',
    temperature:'',
    weather_pic:'',
    weather:'',
    lastSay:[],

    //背景音乐
    isBgMusic: false,
    //背景音乐状态 2-无背景音乐 1-播放 0-暂停
    status: 1,
    //音乐标题
    music_title: '',
    //地下的要下移
    pannelStyle: ''

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取用户信息
    var that = this;
    wx.getUserInfo({
      withCredentials: false,
      lang: 'zh_CN',
      success: function (res) {
        that.setData({
          userInfo:res.userInfo
        })
      }
    });        

    wx.getLocation({
      success: function(res) {
        //通过经纬度请求数据
        wx.request({
          url: 'https://route.showapi.com/9-5',
          data:{
            //系统级参数
            showapi_appid: '44515',
            showapi_sign: '6baa86673b934b478c1f5e62b2d33861',
            //
            from:'5',
            lng:res.longitude,
            lat:res.latitude,
            needIndex:'1',
          },
          success:function(res){
            that.setData({
              aqi:res.data.showapi_res_body.now.aqi,
              temperature:res.data.showapi_res_body.now.temperature,
              weather_pic: res.data.showapi_res_body.now.weather_pic,
              weather: res.data.showapi_res_body.now.weather
            })
          }
        })
      }
    });

    //从服务器获取以往对话数据

    this._getFromServer();

  },

  //从服务器获取信息

  _getFromServer:function()
  {
    future.getSay((res) => {
      //对时间进行处理
      for (var i = 0; i < res.length; i++) {
        var time = this._fomateDate(res[i].create_time);
        res[i].time = time;
      }
      this.setData({
        lastSay: res
      })
    })
  },

  _fomateDate:function(date)
  {
    var date = new Date(date);
    var time = {};
    time.year = date.getFullYear();
    time.month = date.getMonth()+1;
    time.day = date.getDate();
    time.hours = date.getHours();
    time.minute = date.getMinutes();
    var xinqi = date.getDay();
    var zh_xinqi = ['周日','周一','周二','周三','周四','周五','周六'];
    time.xinqi = zh_xinqi[xinqi];
    return time; 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  toMemory:function() {
    this.setData({
     status:2 
    })
  },

  toPlan:function(){
    this.setData({
      status:1
    });
    this._getFromServer();
  },

  bindFormSubmit:function(event){
    var heartWord = event.detail.value.heartWord;
    
    var data = {
      username:this.data.userInfo.nickName,
      content:heartWord,
      location:this.data.userInfo.city,
      aqi:this.data.aqi,
      weather: this.data.weather,
      temperature: this.data.temperature,
      img_url:this.data.weather_pic
    };

    future.postSay(data,(res)=>{
      this.toPlan();
    })
  },

  onShow: function () {
    musicControl.data.audioStatus.call(this);
  },

  audioPlay: function () {
    musicControl.data.audioPlay.call(this);
  },

  audioPause: function () {
    musicControl.data.audioPause.call(this);
  }
})