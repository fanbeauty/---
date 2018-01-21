var localData = require('../../data/data.js');
var musicControl = require('../../utils/music.js');

// piece.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    this.setData({
      gallery: localData.data.piece.img_url,
      banner:localData.data.piece.banner
    })
  },

  toMoment: function(event){
    var index = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/moment/moment?id='+index,
    })
  },

  onShow:function(){
      musicControl.data.audioStatus.call(this);
  },

  audioPlay: function () {
    musicControl.data.audioPlay.call(this);
  },

  audioPause: function () {
    musicControl.data.audioPause.call(this);
  },

  //监听音乐暂停
  

})