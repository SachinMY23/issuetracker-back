
const mongoose=require('mongoose');
Schema=mongoose.Schema;

let IssueSchema=new Schema({
    issueId:{
        type:String,
        unique:true,
        index:true,
        default:''
    },
    status:{
        type:String,
        default:''
    },
    reporterId:{
        type:String,
        default:''
    },
   reporterName:{
        type:String,
        default:''
   },
    description:{
        type:String,
        default:''
    },
    title:{
       type:String,
       default:''
    },
    attachments:{
        type:Array,
        default:[]
    },
    createdOn:{
        type:Date,
        default:Date.now
    },
    watchers:{
        type:Array,
        default:[]
    },
    assigneeId:{
        type:Array,
        default:[]
    }
})

mongoose.model('Issue',IssueSchema)