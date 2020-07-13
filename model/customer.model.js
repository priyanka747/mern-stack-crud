const mongoose=require('mongoose');
const Schema=mongoose.Schema;
let Customer=new Schema({
    cust_id:{
        type: String,
        unique: true
    },
    cust_name:{
        type: String
    }, cust_email:{
        type: String
    }, cust_address:{
        type: String
    }, approved:{
        type: Boolean
    }
});
module.exports=mongoose.model('Customer', Customer);