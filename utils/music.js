//此js控制音乐的播放和暂停


var music = {
  audioStatus:function(){
    var that = this;
    wx.getBackgroundAudioPlayerState({
      success: function (res) {
        var status = res.status;
        if (status == 2) {
          //没有音乐在播放
          that.setData({
            isBgMusic: false,
            status: status
          })
        }
        else {
          that.setData({
            isBgMusic: true,
            pannelStyle: 'margin-top:40px;',
            status: status,
            music_title: getApp().globalData.music_title
          })
        }
      }
    })
  },


  audioPlay:function() {
    this.setData({
      status: 1
    })
    wx.playBackgroundAudio();
  },

  audioPause:function() {
    this.setData({
      status: 0
    })
    wx.pauseBackgroundAudio();
  }
}

module.exports.data = music;