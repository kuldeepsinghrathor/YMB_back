const mongoose  = require("mongoose");
const Schema  = mongoose.Schema;

const clientReview = new Schema({
    name:{
        type:String,
    },
    designation:{
        type:String,
    },
    message:{
        type:String,
    },
    image:{
        filename:String,
        path:String
    },
})

module.exports = mongoose.model("clientreview",clientReview);