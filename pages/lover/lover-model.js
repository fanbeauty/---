import {Base} from '../../utils/util.js';

class Lover extends Base{
  constructor(){
    super();
  }

  addUser(data,callback)
  {
    var params = {
      url:'api/adduser',
      type:'POST',
      data:{
        username:data.username,
        sex:data.sex
      },
      sCallback:function(res){
        callback && callback(res);
      }
      }
    this.request(params);
  }
}

export {Lover};