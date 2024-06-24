const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
    type:{
        type:String
    },
    seat:{
        type:String
    },
    price:{
        type:Number
    },
})

module.exports = new mongoose.model('seat',seatSchema)