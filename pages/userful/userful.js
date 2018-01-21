// userful.js
var musicControl = require('../../utils/music.js');
Page({

  data: {
    foodName:"",
    greens:null,
    key:'keyWord',
    keyArr:[],

    //背景音乐  
    isBgMusic: false,
    //背景音乐状态 2-无背景音乐 1-播放 0-暂停
    status: 1,
    //音乐标题
    music_title: '',
    //地下的要下移
    pannelStyle: ''

  },

 
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    musicControl.data.audioStatus.call(this);
    var keyWord = wx.getStorageSync(this.data.key);
    if(keyWord===''){
      keyWord=[];
    }
    this.setData({
      keyArr:keyWord
    })
  },

  audioPlay: function () {
    musicControl.data.audioPlay.call(this);
  },

  audioPause: function () {
    musicControl.data.audioPause.call(this);
  },

  formSubmit:function(event){
    //将搜索的内容存入缓存中
    var foodName = event.detail.value.food;
    var keyValue = this.data.keyArr;
    if (keyValue.length==5){
      keyValue.shift();
    }
    keyValue.push(foodName);
    keyValue.reverse();
    this.saveKeyToStorage(keyValue);
    this._request(foodName);
  },  
  saveKeyToStorage:function(data){
    wx.setStorageSync(this.data.key, data);
  },



  toDetail:function(event){
    var ingredients = this._getEventData(event, 'ingredients');
    var burden = this._getEventData(event, 'burden');
    /**
     * 设置全局属性值
     */
    getApp().globalData.title = this._getEventData(event, 'title');
    getApp().globalData.ingredients = ingredients+";"+burden;
    getApp().globalData.imtro = this._getEventData(event, 'imtro');
    getApp().globalData.steps = this._getEventData(event, 'steps');
    getApp().globalData.albums = this._getEventData(event, 'albums');

    wx.navigateTo({
      url: '/pages/foodDetail/foodDetail',
    })
  },

  _getEventData:function(event,key){
    return event.currentTarget.dataset[key];
  },


  onShareAppMessage:function(){
    if (res.from == 'button') {
      //来自页面内部转发按钮
    }
    return {
      title: "菜谱",
      path: "/pages/userful/userful",
      success: function (res) {
        //转发成功
      },
      fail: function (res) {
        //转发失败
      }
    } 
  },

  clearKeyArr:function(){
    wx.clearStorageSync();
    this.setData({
      keyArr:[],
    })
  },

  searchKeyWord:function(event){
    var foodName = this._getEventData(event,'item');
    this._request(foodName);
  },


  /**
   * 请求查询
   */
  _request:function(foodName){
    var that = this;
    that.setData({
      foodName: foodName
    }),
      wx.request({
        url: 'https://apis.juhe.cn/cook/query.php',
        data: {
          //系统级参数
          key: '642c19e410c3be75160be63b1e56231f',
          //应用级参数
          menu: that.data.foodName,
        },
        success: function (res) {

          console.log(res);

          that.setData({
            greens: res.data.result.data,
          })
        }
      })
  }
})