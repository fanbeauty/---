var localData = require('../../data/data.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentData:null,
    //音乐播放状态,2:没有音乐在播放 1：播放中 0：暂停
    audioStatus:2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取传递过来的id
    var id = options.id;
    //通过id找数据
    var currentData = localData.data.moment[id];
    this.setData({
      currentData:currentData
    })

  },

  onReady: function () {
    //
    
  },

  audioPlay:function(){
    var that = this;
    // this.audioCtx.play();
    /*
    backgroundAudioManager.src = this.data.currentData.music;
    backgroundAudioManager.title = this.data.currentData.music_title;
    backgroundAudioManager.play();
    */

    wx.playBackgroundAudio({
      dataUrl: this.data.currentData.music,
    });
    //给全局变量music_title赋值
    getApp().globalData.music_title = this.data.currentData.music_title;
    this.setData({
      audioStatus:1
    });
  },

  audioPause:function(){
    var that = this;
    //this.audioCtx.pause();
    //wx.pauseBackgroundAudio();
    backgroundAudioManager.pause();
    this.setData({
      audioStatus:0
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if(res.from=='button'){
      //来自页面内部转发按钮
  }

  return {
    title:"自定义转发标题",
    path:"/pages/moment/moment",
    success:function(res){
      //转发成功
    },
    fail:function(res){
      //转发失败
    }
  } 

  }
})