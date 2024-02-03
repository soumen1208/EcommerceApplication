const express = require('express');
const Product = require('../model/Product');
const Review = require('../model/Review');
const { validateReview, isLoggedIn } = require('../middleware');
// const { validateReview } = require('../middleware');
const router =express.Router(); // mini 

router.post('/products/:id/rating', isLoggedIn, validateReview, async (req, res)=>{
    // console.log(req.body);
    // res.send(req.body)
    try{
        let{id} = req.params;
        let {rating, comment} = req.body;
        let product = await Product.findById(id);
        let review = new Review({rating, comment});
        product.reviews.push(review);
        
        await product.save();
        await review.save();
        
        //addding flash messages 
        req.flash('msg', 'review added succesfully')
        res.redirect(`/products/${id}`)
    }catch(e){
        res.render('allProduct/error', {err:e.message})
    }
})


module.exports = router;

