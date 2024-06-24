const mongoose = require("mongoose");

const screenSchema = new mongoose.Schema({
    admin_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"  
    },
    name:{
        type:String
    },
})

module.exports = new mongoose.model('screen',screenSchema)