// foodDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    ingredients: {},
    imtro: '',
    steps: '',
    albums:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var ingredients = getApp().globalData.ingredients;
    //数据在此页面，重新绑定
    this.setData({
      title:getApp().globalData.title,
      ingredients:this._splitIngredients(ingredients),
      imtro:getApp().globalData.imtro,
      steps:getApp().globalData.steps,
      albums:getApp().globalData.albums
    })
  },
  
  //将用料字符串切分成数组对象

  _splitIngredients:function(ingredients){
    var arr = ingredients.split(";");
    var ary = {};
    for(var i=0;i<arr.length;i++)
    {
      var newArr = arr[i].split(",");
      ary[i] = newArr;
    }
    return ary;
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
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    if (res.from == 'button') {
      //来自页面内部转发按钮
    }
    return {
      title: "for you",
      path: "/pages/foodDetail/foodDetail",
      success: function (res) {
        //转发成功
      },
      fail: function (res) {
        //转发失败
      }
    } 
  }
})