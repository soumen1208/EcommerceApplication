const express = require('express');
const User = require('../../model/User');
const { isLoggedIn } = require('../../middleware');
const router = express.Router();

router.post('/products/:productsId/like', isLoggedIn, async(req, res)=>{
    let {productsId} = req.params;
    // console.log(productsId);
    // res.send(productsId);

    let user = req.user;  
    
    let isLiked = user.wishlist.includes(productsId)
    // console.log(isLiked);
    
    if(isLiked){
        await User.findByIdAndUpdate(req.user._id, {$pull: {wishlist: productsId}})
    }else{
        await User.findByIdAndUpdate(req.user._id, {$addToSet: {wishlist: productsId}})
    }
})



module.exports = router;