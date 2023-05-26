const router = require('express').Router();
const UserCartSchema = require('../models/userCart');
const ProductCartSchema = require('../models/productCart');



router.get('/' , async (req,res) => {
    try {
         let cart =  await UserCartSchema.findOne({isCompleted:false})
         let productList =  await ProductCartSchema.find({userCartId:cart._id})

         res.status(200).json(getResponse(cart, productList))
            }catch(err){
                res.status(500).json(err)
            }
       
    })

    //UPDATE

router.put('/', async (req,res) => {
        try{
            let cart;
            if (req.body._id) {
                cart = await UserCartSchema.findByIdAndUpdate(
                    req.body._id,{$set:req.body},{new: true})
               
            } else {
                cart = await UserCartSchema.create({
                    ...req.body,
                    isCompleted:false,
            })
        }
            
        let productList = await ProductCartSchema.find({userCartId:cart._id}) 
        res.status(201).json(getResponse(cart, productList))
           
        } catch(err) {
            res.status(500).json(err)
        }
})
// add product to cart
router.patch('/add' , async (req,res) => {
    try{

        let cart = await UserCartSchema.findOne({isCompleted:false});
        let productPrice = req.body.price * req.body.count;
        if (!cart || !cart._id) {
            cart = await UserCartSchema.create({
                isCompleted:false,
                totalPrice: null
           }, {new:true}) 
        }

        let productCartItem = await ProductCartSchema.findOne({userCartId:cart._id, productId: req.body.productId});
        if (productCartItem) {
            await ProductCartSchema.findByIdAndDelete(productCartItem._id)
        }

       productCartItem = await ProductCartSchema.create({
            ...req.body,
            totalPrice: productPrice,
            userCartId: cart._id
        })


        const productList = await ProductCartSchema.find({userCartId:cart._id})

        let totalPrice = 0;
        productList.forEach(element => {
            totalPrice += element.totalPrice;
          });

          let updatedCart = await UserCartSchema.findByIdAndUpdate(cart._id,
             {totalPrice: totalPrice},{new: true})

        res.status(201).json(getResponse(updatedCart, productList))   
       
    }catch(err){
        res.status(500).json(err)
    }
})

//DELETE

router.delete('/:id' , async (req,res) => {
        try {
           await ProductCartSchema.deleteMany({userCartId:req.params.id})
           await UserCartSchema.findByIdAndDelete(req.params.id)
           res.status(201).json('User card has been delete')
        } catch(err){
            res.status(500).json(err)
        }
})


const getResponse = (cart, productList) => {
 return {
    _id : cart ? cart._id : null,
    name: cart ? cart.name : null,
    address: cart ? cart.address : null,
    email: cart ? cart.email : null,
    phone: cart ? cart.phone : null,
    isCompleted: cart ? cart.isCompleted : null,
    totalPrice: cart ? cart.totalPrice : null,
    productList: productList? productList : []
 }
}
module.exports = router;