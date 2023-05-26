const mongoose = require("mongoose");

const ProductCartSchema = new mongoose.Schema({
    userCartId:{type:String,require:true},
    productId:{type: String, require: true},
    productName:{type: String, require: true},
    count:{type:Number},
    imgProduct: {type: String},   
    price:{type:Number},
    totalPrice:{type:Number},

})
module.exports = mongoose.model("ProductCartSchema", ProductCartSchema)