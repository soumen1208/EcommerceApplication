// const Product = require("./models/product");
const Product = require("./model/Product");
const { productSchema, reviewSchema} = require("./schema");


const validateProduct = (req, res, next)=>{
    let {name, img, price, desc} = req.body;
    const {error} = productSchema.validate({name, img, price, desc})   // return an object one error and 2nd value, here we only use error because we don't want value
    if(error){
        const msg = error.details.map((err)=>err.message).join(',')
        return res.render('allProduct/error', {err:msg})
    }
    next();
}

const validateReview = (req, res, next)=>{
    let {rating, comment} = req.body;
    const {error} =  reviewSchema.validate({rating,comment})
    if(error){
        const msg = error.details.map((err)=>err.message).join(',');
        // return res.render('error', {err:msg})
        return res.render('allProduct/error', {err:msg})
    }
    next();
}

const isLoggedIn = (req, res, next)=>{

    // console.log(req.xhr); // return true and false for existing ajax request 
    if(req.xhr && !req.isAuthenticated()){
        // return redirect('/login')
        // return res.error({msg: 'you need to login first'});
        return res.status(401).send('unauthorised');
    }

    if(!req.isAuthenticated()){
        req.flash('error', 'you need to login first');
        res.redirect('/login');
    }
    next();
}

const isSeller = (req, res, next)=>{
    if(!req.user.role){
        req.flash('error', 'you need to login first');
        res.redirect('/products')
    }else if (req.user.role !== 'seller'){
        req.flash('error', 'you have no permission');
        res.redirect(`/products/${id}`);
    }
    next();
}

const isProductAuthor = async(req, res, next)=>{
    let {id} = req.params; 
    let product = await Product.findById(id);
    console.log(product.author, 'author');
    console.log(req.user, 'user');

    if(!product.author.equals(req.user._id)){
        req.flash('error', 'you are not the owner of this product');
        return res.redirect(`/products`);
    }
    next();
}


module.exports = {validateProduct, validateReview, isLoggedIn, isSeller, isProductAuthor}