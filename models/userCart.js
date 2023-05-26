const mongoose = require("mongoose");
const UserCartSchema = new mongoose.Schema(
    {
        name: {type: String},
        address:{type:String},
        email:{type:String},
        phone:{type:String},
     
        isCompleted:{type:Boolean},
        totalPrice:{type:Number},
        
    
    },

    {timestamps: true}
)

module.exports = mongoose.model("UserCartSchema", UserCartSchema)
