import {Lover} from 'lover-model.js';
var lover = new Lover();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取用户信息
    var that = this;
    wx.getUserInfo({
      withCredentials:false,
      lang:'zh_CN',
      success:function(res){
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var sex = that._getGender(gender);
        var data = {
          username:nickName,
          sex:sex
        };
        lover.addUser(data,(res)=>{
          //处理回调函数
        })
        that.setData({
          username:nickName
        });
        //设置全局数据
        getApp().globalData.username=nickName;
      }
    })        
  },

  /**
   * 设置用户的性别
   */

  _getGender:function(num){
    if(num===0){
      return "未知";
    }
    if(num==1){
      return "男";
    }
    if(num==2){
      return "女";
    }
  },

  toNinety:function(){
    wx.navigateTo({
      url: '/pages/ninety/ninety',
    })
  }
})