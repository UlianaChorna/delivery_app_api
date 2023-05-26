
const router = require('express').Router();
const Product = require('../models/product');

router.get('/find/:id' , async (req,res) => {
    try{
    const product =   await Product.find({shopId:req.params.id} )
               res.status(201).json(product)
            }catch(err){
                res.status(500).json(err)
            }
       
    })

module.exports = router;