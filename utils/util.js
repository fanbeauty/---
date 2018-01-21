import {Config} from 'config.js';


class Base {
  constructor(){
    'use strict';
    this.baseRestUrl = Config.restUrl;
  }

  //http请求类
  request(params)
  {
    var that = this,
        url=this.baseRestUrl+params.url;
    if (!params.type) {
         params.type = 'get';
    }
    
    wx.request({
      url: url,
      data: params.data,
      method: params.type,
      success:function(res)
      {
        params.sCallback && params.sCallback(res);
      },
      fail:function(res){
        console.log(res);
      }
    });
  }

  /**获取元素上绑定的值 */
  getDataSet(event, key) {
    return event.currentTarget.dataset[key];
  }



}

export {Base};