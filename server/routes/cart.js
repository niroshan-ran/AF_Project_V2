const express = require('express');
const router = express.Router();
//const router = require('express').Router();
let Product = require('../schemas/product.model');
var Cart = require('../schemas/cart.model');
const User = require('../schemas/User');
const auth = require('../middleware/CartAuth');
const async = require('async');


router.route('/').get((req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(400).json('Error: ' + err));
});

/*
router.get('/addToCart', auth,function (req,res) {
    console.log('inside route');
    var productID = req.params.id;
    console.log(productID);
    var cart = new Cart(req.session.cart ? req.session.cart :{});

    Product.findById(productID,function (err,product) {
        if(err){
            console.log('add to cart not working');
            return res.redirect('/')
        }
        cart.add(product,product.id);
        req.session.cart = cart;
        console.log('from add tp cart');
        console.log(req.session.cart);
        res.redirect('/');
    })
});
*/

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
    });
});




router.post("/addToCart",auth, (req,res) => {
    User.findOne({_id:req.user._id},(err,userInfo) => {
        let duplicate = false;
        userInfo.cart.foreach((cartInfo) => {
            if(cartInfo.id === req.query.producId){
               duplicate = true;
            }
        })
        console.log(duplicate);
        if(duplicate){
            User.findOneAndUpdate(
                {_id:req.user._id,"cart.id": req.query.productId },
                {$inc:{"cart.$quantity":1}},
                {new: true},
                () => {
                    if(err) return res.json({success:false,err});
                    res.status(200).json(userInfo.cart)
                }
            )
        }else{
            User.findOneAndUpdate(
                {_id:req.user._id},
                {
                     $push:{
                         cart: {
                             id: req.query.productId,
                             quantity:1,
                             date: Date.now()
                         }
                     }
                },
                {new: true},
                (err,userInfo) => {
                    if(err) return res.json({success:false,err});
                    res.status(200).json(userInfo.cart)
                }
            )
        }
    })
})

router.route('/add').post((req, res) =>{
    const CUser = req.body.CUser;
    const CProduct = req.body.CProduct;
    const CQuantity = req.body.CQuantity;
    const CAmount = req.body.CAmount;

    const newCart = new Cart({
        CUser,
        CProduct,
        CQuantity,
        CAmount
    });

    newCart.save()
        .then(() => res.json('Check Out Added !!'))
        .catch(err => res.status(400).json('Error is: ' + err));
});

module.exports = router;