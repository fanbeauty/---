import {Base} from '../../utils/util.js';

class Ninety extends Base{
  constructor(){
    super();
  }

  getNinetyData(callback){
    var params = {
      url:'api/ninety',
      sCallback:function(res){
        callback&&callback(res.data);
      }
    };
  this.request(params);
  }

  getDoneThing(data,callback){
    var params = {
      url:'api/user',
      type:'POST',
      data:{
        username:data.username
      },
      sCallback:function(res){
        callback&&callback(res.data)
      }
    }
    this.request(params)
  }


}

export {Ninety};