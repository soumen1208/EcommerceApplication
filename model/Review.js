const mongoose = require('mongoose');

// create schema
const  schemaReview = new mongoose.Schema({
    rating:{
        type:Number,
        min: 0,
        max: 5
    },
    comment:{
        type:String,
        trim:true
    }

}, {timestamps: true })

// create model
let Review = mongoose.model('Review', schemaReview);

module.exports = Review;