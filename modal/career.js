const mongoose  = require("mongoose");
const Schema  = mongoose.Schema;

const career = new Schema({
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
    education_level:{
        type:String
    },
    message:{
        type:String
    },
    resume_pdf:{
        filename:String,
        path:String
    }
})

module.exports = mongoose.model("career",career);