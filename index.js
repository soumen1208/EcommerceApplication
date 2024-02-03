const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const seedDB = require('./seed');
const session = require('express-session');  // for validation msg
const flash = require('connect-flash');  // for validation flash msg
const User = require('./model/User');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const productRouter = require('./routes/product');
const reviewRouter = require('./routes/review');
const authRouter = require('./routes/authRoute');
const apiRoutes= require('./routes/api/productsapi');
const cartRoutes= require('./routes/cart');
const dotenv = require('dotenv').config();  // in config we can use path if our env file is inside any folder



// mongoose connections....................................................................................................................................
mongoose.set("strictQuery", true)
let url = 'mongodb+srv://soumenmahato4454:1234soumen@cluster0.fvqd9sj.mongodb.net/shopshopretryWrites=true&w=majority'
mongoose.connect(url) // return promise
.then(()=>{console.log("DB connected")})
.catch((err)=>{console.log("error is:", err);});

// all set................................................................................................................................................... 
app.set('view engine', 'ejs'); // view engine
app.set('views', path.join(__dirname,'views')); // views path set

app.use(express.static(path.join(__dirname,'public'))); // static file include
app.use(express.urlencoded({extended: true})); // for form data body parsing
app.use(methodOverride('_method')); // for method changing

// database ....................................................................................................................................................................
// seedDB()

let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        // secure: true // secure means http ka s version
        httpOnly: true,
        expires: Date.now() + 7*24*60*60*1000,
        maxAge: 7*24*60*60*1000
    }  
}

app.use(session(configSession));
app.use(flash());


// for setup mongoose-local-mongoose.............................................................................................................................................
// requires the model with Passport-Local Mongoose plugged in
// const User = require('./models/user');

app.use(passport.initialize());  
app.use(passport.session())
// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// middleware for flash - success, error message and req.user to accesable everywhere user related required............................................................................................................................................. 
app.use((req,res,next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next();
})


// product router for displaying all the products
app.use(productRouter);
app.use(reviewRouter);
app.use(authRouter);
app.use(apiRoutes);
app.use(cartRoutes);

// let PORT = 5050;
app.listen(process.env.PORT, ()=>{
    console.log(`Hey I am Connecting with port at ${process.env.PORT}`);
})

// ====================================================== All formalities and task ==========================================================================
// 1. first basic server create
// 2. mongoose create and schema and create collection
// 3. model create then seed data create then routes create and all set
// 4. review add, model, routes, ...... 
// 5. validation - user side, in ejs and all things have write (required) bydefault validation --- novalidate -- also use a bootstarp code -> validdation
// 6. validation - server side, use joi 3rd party package - 1.define scheama 2.validate the schema using joi, needsvalidation class is out  
// 7. middleware - between in every incoming request check is it validate then adding 
// 8. class-needs validation -> it is used client side validate also    
// 9. try{}catch(e){render('error', {err.e.msg})} ==>> this block helps when we have right things that are store try block and which are error that's through catch block
// 10. cookies and session  => cookies-personalization,stateful,depend on previous data so we can find easily require data => cookie-parser which is help to see cookies
//     req.cookie
//     session-> 
// 11. flash -> connect-flash it is with session, 1st session and then flash install then use middleware then where it is put there require.flash
//     locals: locals is a middleware which is help to throught the application everywhere it is accessble -> locals are present in response -> res.locals
//     middleware: it is work in every incoming request -> req,res,next these three things make together middleware -> index.js ->  success and error
// 12. Authentication: sign up is strore in DB then check login info is match to signup details => using PASSSPORT tools -> 
//     passport-> helps to sign up and details are save in DB, for next time log in. for salting and hashing we use =>> passport-local-mongoose
//     and for strategy =>> passport-local. in index.js we require passport and passport-local, And in models we use public-local-mongoose    
//     model create
//     passport-local-mongoose -> and all setup complete
//     passport -> all things are save 
//     passport-local -> all things are save
//     passport.intialize() -> index.js
//     passport.session() -> index.js
//     authRoute -> signup/register.ejs and login.ejs 
//     currentUser -> it is store in index.js, for acceble for every where to login logout cart buy etc...
// 13. isLoggedIn - middleware for comment and rating also show details product view. so, the user isloggeding then either next() or return(); 
// 14. session expiry -> basically we give expiry the session after 7days, milisecond, 7*24*60*60*1000 milisec -> configSession{cookie: ....}
// 15. isSeller or isBuyer -> there are we create role seller or buyer, 1.create schema in user,2.change in authroute add role, 3.middleware   
//     create author for connect to user and product -> 1.schema write in model of product, 2. change in product route with add author to save user_id
//     isseller -> yes or no if no there are he is not changing the products like delete edit add new products etc
// 16. isAuthor -> .equals is help to comparing to two objects -> this middleware help to find the perfect product of the author and only he can edit and delete the product
// 17. wishlist -> for wishlist we create model in user, 
//     -> then public folder we create common file js , where we define work of btn of wishlist, addeventListner, function define likeButton
//     -> user define attribute in index.ejs also add heart emoji
//     -> create api in route for collecting data     
//     => when we click the like btn we send ajax req, and require the data from server ->for change the realtime problems -> axios req from axios website, the cdn include in header    
//     whenever ajax req is coming then a special things present inside request that is .xhr that are return true or false , existing ajax req for true or not existing to false
//     -> then create api wishlist route here we work with User, here we use (pull) to operator removes from an existing array all instances of a value or values 
//     that match a specified condition. and (addToSet) to operator adds a value to an array unless the value is already present, in which case $addToSet does nothing to that array.        
//        
// 18. Add to cart -> 

// 19. payment -> payment with the help of stripe , stripe install then we work with this create route and all others things
// 20. Deploy -> mongoDB Atlas create acc then create a server
// 21. .env -> use for private all data
// 22. git -> user controll of git
// 23. render -> from render we uplod the project from git hub 