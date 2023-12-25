const mongoose  = require("mongoose");
const Schema  = mongoose.Schema;

const gallery = new Schema({
    text_1:{
        type:String,
        unique:true
    },
    image:{
        filename:String,
        path:String
    },
})

module.exports = mongoose.model("gallery",gallery);