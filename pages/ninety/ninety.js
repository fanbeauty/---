import {Ninety} from 'ninety-model.js';
var ninety = new Ninety();
Page({
  data: {
    ninety:[],
    doneThings:[]
  },
  onLoad: function (options) {
   this._bindData();
  },

  //绑定数据
  _bindData:function(){
    var that = this;
    //获取用户已经做过的事儿
    var data = {
      username: getApp().globalData.username
    };
    ninety.getDoneThing(data, (res) => {

      //对获取到的res.things 数组中的create_time进行格式化

      var things = res.things;
      for(var i=0 ;i<things.length;i++)
      {
          things[i].create_time=this._formateDate(things[i].create_time);
      }
      this.setData({
        doneThings: things
      });
      //获取99件事
      ninety.getNinetyData((data) => {
        this.setData({
          ninety: data
        });
        that._compareToNinety(that.data.doneThings, that.data.ninety);
      });
    });
  },

  //对时间进行格式化
  _formateDate:function(date){
    var date = new Date(date);
    return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
  },

  _compareToNinety: function (doneThings,ninety)
  {
    for (var i = 0; i < doneThings.length; i++) {
      var id = doneThings[i].to_ninety.id;
      //遍历ninety
      for (var j = 0; j < ninety.length; j++) {
        if (id === ninety[j].id) {
          ninety[j].img_url = doneThings[i].img_url;
          ninety[j].mood = doneThings[i].mood;
          ninety[j].create_time = doneThings[i].create_time;
        }
      }
    }
    //ninety数据重新进行绑定
    this.setData({
      ninety:ninety
    });
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
  upload:function(event){
    var that = this;  
    var index = ninety.getDataSet(event,'index');
    var thing = this._getThing(index);

    wx.chooseImage({
      success: function(res) {
        var tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: 'https://www.huany.top/index.php/api/dothings',
          filePath: tempFilePaths[0],
          name: 'img',
          header: { "Content-Type": "multipart/form-data"},
          formData:{
            'username':getApp().globalData.username,
            'thing':thing,
          },
          success:function(res){
            //上传成功，立即绑定
            that._bindData();

          },
          fail:function(res){
            console.log(res);
          }
        })
      },
    })  
  },
  //.通过索引找对应那件事儿
  _getThing:function(index)
  {
    return this.data.ninety[index].description;
  }
})