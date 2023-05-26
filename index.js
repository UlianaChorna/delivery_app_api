const express = require("express")
const app = express();
const dotenv = require("dotenv")
const mongoose = require('mongoose');
const Shop = require("./routers/shop.js")
const Product = require("./routers/product.js")

const UserCart =require("./routers/userCart.js")

dotenv.config()
// mongoose.set('strictQuery', true);

mongoose.connect(process.env.MONGO_URL, {
   useNewUrlParser:true,
   useUnifiedTopology:true,
    
}).then( ( ) => {
console.log("DB Connection") 

}).catch((err) => console.log(err))

app.listen(8800, ()=> {
    console.log("Backend server is running")
})

app.use(express.json());

app.use("/api/shop",Shop);
app.use("/api/product",Product);
app.use("/api/cart", UserCart)