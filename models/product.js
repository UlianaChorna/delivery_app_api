const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
    { 
        name: {type: String, require: true, unique : true},
        desc: {type: String,},
        img: {type: String},
        price:{type: Number,unique : true},
        shopId:{type:String,require:true}
        
        
    },
    {timestamps: true}
)

module.exports = mongoose.model("Product",ProductSchema)