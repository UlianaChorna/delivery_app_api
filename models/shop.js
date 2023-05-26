const mongoose = require("mongoose");

const ShopSchema = new mongoose.Schema(
    {
        name: {type: String, require: true, unique : true},
        imgTitle: {type: String},
    
    },
    {timestamps: true}
)

module.exports = mongoose.model("Shop",ShopSchema)