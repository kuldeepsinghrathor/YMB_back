const mongoose  = require("mongoose");
const Schema  = mongoose.Schema;

const contactUs = new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    mobile:{
        type:Number,
        unique:true
    },
    subject:{
        type:String
    },
    message:{
        type:String
    }
})

module.exports = mongoose.model("contactus",contactUs);