const mongoose=require('mongoose');

const usersSchema=new mongoose.Schema({
    Username:{
        type:String,
        required:true,
        unique:true
        },
    Password:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Phone_no:{
        type:String,
        required:true
    },
    Admin:{
        type:Boolean,
        required:true,
        default:false
    }
});

module.exports=mongoose.model('Users',usersSchema);