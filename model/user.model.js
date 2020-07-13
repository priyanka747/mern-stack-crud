const mongoose=require('mongoose');
const Schema=mongoose.Schema;
let User=new Schema({
    email:{
        type:String,
        unique: true
    }, password:{
        type:String
    }
});
module.exports=mongoose.model('User', User);