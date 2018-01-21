var localData = require('../../data/data.js');
var musicControl = require('../../utils/music.js');
Page({
  data: {
    //摄影图片
    panel:'',
    //主题
    topic:'',
    //内容
    content:[],
      //背景音乐
    isBgMusic: false,
      //背景音乐状态 2-无背景音乐 1-播放 0-暂停
    status: 1,
      //音乐标题
    music_title: '',
    //地下的要下移
    pannelStyle:''
  },

  onLoad: function (options) {
    var from = localData.data.from;
    //数据绑定
    this.setData({
      panel:from.panel,
      topic:from.topic,
      content:from.content
    })
  },

  toMovie:function(event){
    wx.navigateTo({
      url: '/pages/movie/movie',
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