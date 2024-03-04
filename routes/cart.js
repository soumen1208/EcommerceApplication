const express = require('express');
const { isLoggedIn } = require('../middleware');
const User = require('../model/User');
const Product = require('../model/Product');
const router =express.Router(); // mini 
const stripe = require('stripe')('sk_test_51OdP2PSEoGgIljxyKfOjluLqfMoJuqV3h3c9wRgcIofXorKNIETneLZ8daxcTKixfdAYWvaBjTeHkOhDY2lIfGgr00vAFv4BkQ')

router.get('/user/cart', async (req, res)=>{
    let userId = req.user._id;
    let user = await User.findById(userId).populate("cart");
    console.log(user, "sou");
    let totalAmount = user.cart.reduce((sum, curr)=> sum + curr.price, 0)
    console.log(totalAmount);
    res.render('cart/cart', {user, totalAmount})
});

router.post('/user/:productId/add', isLoggedIn, async (req, res)=>{ 
     
    let {productId} = req.params;
    let userId = req.user._id;
    let user = await User.findById(userId);
    let product = await Product.findById(productId)
    user.cart.push(product);
    await user.save();

    res.redirect('/user/cart')
})

router.get('/checkout/:id', async (req,res)=>{
    let userId = req.user._id;
 
    let user = await User.findById(userId).populate("cart");

    let cart = [...user.cart]
    let cartQ = cart.map((item)=>{

      return item;
    })
    console.log(cartQ, "Soumen");

    const session = await stripe.checkout.sessions.create({
        line_items:
          cartQ.map(item=>{
            return       {
              price_data: {
                currency: 'inr',
                product_data: {
                  name: item.name,
                },
                unit_amount: item.price*100,
              },
              quantity: 1, // HW
            }
          }),
        mode: 'payment',
        success_url: 'http://localhost:4242/success',  //HW
        cancel_url: 'http://localhost:5050/products',  // HW
      });
    
    res.redirect(303, session.url);
})


module.exports = router;

