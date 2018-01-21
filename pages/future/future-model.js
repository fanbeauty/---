import {Base} from '../../utils/util.js';

class Future extends Base{
  constructor(){
    super();
  }

getSay(callback)
{
  var params = {
    url : 'api/say',
    sCallback:function(res){
      callback && callback(res.data);
    }
  }
  this.request(params);
}

postSay(data,callback)
{
  var params = {
    url:'api/sayto',
    type:'POST',
    data:{
      username: data.username,
      content: data.content,
      location: data.location,
      aqi: data.aqi,
      weather: data.weather,
      temperature: data.temperature,
      img_url: data.img_url
    },
    sCallback: function (res) {
      callback && callback(res);
    }
  };
  this.request(params);
}
}
export {Future};