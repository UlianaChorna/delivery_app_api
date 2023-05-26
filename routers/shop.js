const router = require('express').Router();
const Shop = require('../models/shop');



router.get('/' , async (req,res) => {
   
    try{
    const shops = await Shop.find();

        res.status(201).json(shops.reverse())
   
  
               
            }catch(err){
                res.status(500) .json(err)
            }
        
    })


module.exports = router;