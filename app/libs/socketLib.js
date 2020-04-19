const socketio = require('socket.io');
const mongoose = require('mongoose');
const shortid = require('shortid');
const logger = require('./loggerLib.js');
const events = require('events');
const eventEmitter = new events.EventEmitter();
const tokenLib=require('./../libs/tokenLib')
const time=require('./timeLib');
const check=require('./../libs/checkLib')


const userModel=mongoose.model('User')

let setServer = (server) => {

    let io = socketio.listen(server);

    let myIo = io.of('/')

    myIo.on('connection',function(socket){
 
   
   //sockets registering with server
   socket.on('register',(data)=>{
     socket.userId=data.userId;
     console.log(data.userId+ " registering with server")
   })
      /**
*  @apiGroup sockets
* 
* @api  socket.on('register')  Listen to this event to register socket.
*
* 

*/
   socket.on('assignee-alert',(data)=>{
       let dataMsg={msg:`Hi...${data.reporterName} has assigned a new issue`,issueId:data.issueId}
       console.log("Emiiting"+data.assigneeId)
       myIo.emit(data.assigneeId,dataMsg)
  })
     /**
         /**
     *  @apiGroup sockets
    
    * @api socket.emit('assignee-alert',data) emit this event when user creates a meeting.

    
    *
    * @apiParam {String} assigneeId  UserId of the assignee.(send this in data object)
    * @apiParam {String} title  Title of the issue.(send this in data object)
    * @apiParam {String} reporterName  Full name of the reporter.(send this in data object)
    */
  eventEmitter.on('emit-assign',(data)=>{
    let dataMsg={msg:`Hi...${data.reporterName} has assigned a new issue`,issueId:data.issueId}
    myIo.emit(data.assigneeId,dataMsg)
  })

  socket.on('edit-alert',(data)=>{
    let alertArray=data.assigneeId.concat(data.watchers);
    if(data.editorId!==data.reporterId){
    alertArray.push(data.reporterId);
    eventEmitter.emit('save-issue',data);
    }
    let dataMsg={ msg:`Hi...${data.editorName} has made changes to the issue "${data.title}"`,
                  issueId:data.issueId   }
    for(let i=0;i<alertArray.length;i++){
      if(alertArray[i]!==data.editorId){
      myIo.emit(alertArray[i],dataMsg)
      console.log(alertArray[i]);
      }
    }
  })
     /**
         /**
     *  @apiGroup sockets
    
    * @api socket.emit('edit-alert',data) emit this event when user edit a issue.

    
    *
     * @apiParam {array} assigneeId  User id's of all assignees of an issue.(send this in data object)
     * @apiParam {String} editorId  User id of the editor.(send this in data object)
    * @apiParam {String} reporterId  User id of the reporter.(send this in data object)
    * @apiParam {String} title  Issue title.(send this in data object)
    * @apiParam {String} editorName  Full name of the editor.(send this in data object)
    * @apiParam {array} watchers  User id's of all watchers of an issue.(send this in data object)




   */

  socket.on('comment-alert',(data)=>{
    let alertArray=data.assigneeArray.concat(data.watchers);
    if(data.commentorId!==data.reporterId){
      alertArray.push(data.reporterId);
      }
      
      console.log(alertArray);
    let dataMsg={ msg:`Hi...${data.commentorName} commented on issue "${data.title}"`,
                  issueId:data.issueId   }
    for(let i=0;i<alertArray.length;i++){
      if(alertArray[i]!==data.commentorId){
      myIo.emit(alertArray[i],dataMsg)
      console.log(alertArray[i]);
      }
    }
  })
  /**
         /**
     *  @apiGroup sockets
    
    * @api socket.emit('comment-alert',data) emit this event when user comments on  a issue.

    
    *
     * @apiParam {array} assigneeId  User id's of all assignees of an issue.(send this in data object)
     * @apiParam {String} commentorId  User id of the user who commented.(send this in data object)
    * @apiParam {String} reporterId  User id of the reporter.(send this in data object)
    * @apiParam {String} title  Issue title.(send this in data object)
    * @apiParam {String} commentorName  Full name of the commentor.(send this in data object)
    * @apiParam {array} watchers  User id's of all watchers of an issue.(send this in data object)




   */ 
  socket.on('disconnect',(data)=>{
    console.log("User disconnected")
  })
   /**
         /**
     *  @apiGroup sockets
    
    * @api socket.emit('disconnect',data) emit this event when user logs out.

    
    *
     * @apiParam {String} userId  User id of the user.(send this in data object)
     * @apiParam {String} name  Full name of the user.(send this in data object)
   */ 
})
  eventEmitter.on('save-issue',(data)=>{
    if(data.receiverId){
    var arr=data.receiverId.split(',');
    userModel.findOne({userId:arr[1]}).exec((err,result)=>{
      if(err){
          console.log("Error");
     
      } else if (check.isEmpty(result)) {
          console.log('User Not Found.')
      } else {
          result.issues.push(data.issueId)
          result.save((er, succ) => {
              if (er) {
                console.log("Error");
              }else{
                console.log("Issue saved");
                let data1={
                  assigneeId:arr[1],
                  issueId:data.issueId,
                  title:data.title,
                  reporterName:data.editorName
                }
                eventEmitter.emit('emit-assign',data1)
              }
  })
      }
    })
  }
})

}
   
module.exports = {
    setServer: setServer
}