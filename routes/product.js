const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../model/Product');
const Review = require('../model/Review');
const { validateProduct, isLoggedIn, isSeller, isProductAuthor } = require('../middleware');
// const validateProduct = require('../middleware');

router.get('/', async (req, res)=>{
    try{
        // let products = await Product.find({}); //return promise
        res.render('home')
    }catch(e){
        res.render('error', {err:e.message})
    }
})

// task 1: show the all products
router.get('/products', async (req, res)=>{
    try{
        let products = await Product.find({}); //return promise
        res.render('allProduct/index',{products} )
    }catch(e){
        res.render('error', {err:e.message})
    }
})

// task 2: show a particular product
router.get('/products/:id',isLoggedIn, async (req,res)=>{
    try{
        let {id} = req.params;
        let foundProducts = await Product.findById(id).populate('reviews');
    
        res.render('allProduct/show', {foundProducts, success:req.flash('msg')});
    }catch(e){
        res.render('error', {err:e.message})
    }
})

// task 3: new form create for adding new products
router.get('/product/new',isLoggedIn,isSeller, (req,res)=>{
    try{
        res.render('allProduct/new')
    }catch(e){
        res.render('error', {err:e.message})
    }
})

// task 4: actually add new products
router.post('/products',isLoggedIn, isSeller, validateProduct, async (req, res)=>{
    try{
        let {name, img, price, desc} = req.body;
        await Product.create({name, img, price, desc, author:req.user._id}); // save user_id to author after login

        req.flash('success', 'product added succesfully')
        res.redirect('/products')
    }catch(e){
        res.render('error', {err:e.message})
    }
})

// task 4: the edited view
router.get('/products/:id/edit',isLoggedIn, isSeller, async(req,res)=>{
    try{
        let {id} = req.params;
        let foundProducts = await Product.findById(id);
        // console.log(foundProducts);
        res.render('allProduct/edit',  {foundProducts})
    }catch(e){
        res.render('error', {err:e.message})
    }
})

// task 5: edit the actually products
router.patch('/products/:id',isLoggedIn, isSeller,isProductAuthor, validateProduct, async(req, res)=>{
    try{isProductAuthor
        let {id} = req.params;
        let {name, img, price, desc} = req.body;
        await Product.findByIdAndUpdate(id,{name, img, price, desc});

        // flash message
        req.flash('success', 'edited successfully')
        res.redirect('/products');
    }catch(e){
        res.render('error', {err:e.message})
    }
})

// task 6: delete the product
router.delete('/products/:id',isLoggedIn, isSeller, isProductAuthor, async (req, res)=>{
    try{
        let {id} = req.params;
        let foundProducts = await Product.findById(id);
         // delete review before delete product
        for(let ids of foundProducts.reviews){
            await Review.findByIdAndDelete(ids)
        }
        await Product.findByIdAndDelete(id);

        // flash message create
        req.flash('success', 'deleted successfully')
        res.redirect('/products')
    }catch(e){
        res.render('error', {err:e.message})
    }
    
})



module.exports = router;