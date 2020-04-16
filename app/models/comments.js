const mongoose=require('mongoose');
Schema=mongoose.Schema;

let CommentSchema=new Schema({
    commentId:{
        type:String,
        unique:true,
        index:true,
        default:''
    },
    issueId:{
        type:String,
        default:''
    },
    name:{
        type:String,
        default:''
    },
    createdOn:{
        type:Date,
        default:Date.now
    },
    comment:{
        type:String,
        default:''
    }
})

mongoose.model('Comment',CommentSchema)