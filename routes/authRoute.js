const express = require('express');
const User = require('../model/User');
const passport = require('passport');
const router = express.Router() // mini application


router.get('/register', (req,res)=>{
    res.render('auth/signup')
})

router.post('/register', async(req,res)=>{   // here it is save all data of user 
    // console.log(req.body);
    let{username, password, email, role, gender} = req.body;  // destructure from body to user all details
    // res.send('hii')
    let user = new User({username, email, role, gender});   // 
    let newUser = await User.register(user, password); // this register method automatically save in db
    res.redirect('/login');
    // res.send(newUser);
})

router.get('/login', (req,res)=>{
    res.render('auth/login')
})


router.post('/login',
  passport.authenticate('local',
  { 
    failureRedirect: '/login', 
    failureMessage: true 
  }),
    function(req, res) 
    {
    req.flash('success', `welcome back ${req.user.username}`)
    res.redirect('/products');
})


router.get('/logout' , (req,res)=>{
    req.logout(()=>{
        req.flash('success' , 'Logged out successfully')
        res.redirect('/login');
    });
})

module.exports = router;