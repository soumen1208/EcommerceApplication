const { string } = require('joi');
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// create schema
const  schemaUser = new mongoose.Schema({
    email:{
        type:String,
        trim: true,
        required: true
    },
    role:{
        type:String,
        default: 'buyer',
    },
    gender:{
        type:String,
        required: true
    },
    wishlist:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product' 
        }
    ],
    cart:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
    

})

schemaUser.plugin(passportLocalMongoose);

// create model
let User = mongoose.model('User', schemaUser);

module.exports = User;