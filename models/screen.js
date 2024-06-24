const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema({
    name:{
        type:String
    },
})

module.exports = new mongoose.model('screen',screenSchema)