const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    admin_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"  
    },
    name:{
        type:String
    },
    image:{
        type:String
    },
    description:{
        type:String
    },
    screen:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "screen"
    },
    time:{
        type:String
    },
    date:{
        type:String
    },
    language:{
        type:String
    },
    type:{
        type:Array
    },
    viewtype:{
        type:String
    },
    silverseats:{
        type:String
    },
    goldseats:{
        type:String
    },
    diamondseats:{
        type:String
    },
    silverprice:{
        type:Number
    },
    goldprice:{
        type:Number
    },
    diamondprice:{
        type:Number
    },
    seats:{
        type:Array
    }
})

module.exports = new mongoose.model('movie',movieSchema)