const mongoose=require('mongoose');
Schema=mongoose.Schema;

let UserSchema=new Schema({
    userId:{
        type:String,
        unique:true,
        index:true,
        default:''
    },
    firstName:{
        type:String,
        default:''
    },
    lastName:{
        type:String,
        default:''
    },
    countryCode:{
        type:Number,
        default:''
    },
    mobileNumber:{
        type:Number,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    password:{
        type:String,
        default:''
    },
    createdOn:{
        type:Date,
        default:Date.now
    },
    issues:{
        type:Array,
        default:[]
    }
})

mongoose.model('User',UserSchema)