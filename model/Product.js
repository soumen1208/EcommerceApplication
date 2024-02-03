const mongoose = require('mongoose');

const schemaProduct = new mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true
    },
    img:{
        type: String,
        trim: true

    },
    price:{
        type: Number,
        min: 0,
        required: true

    },
    desc:{
        type: String,
        trim: true

    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review' 
        }
    ],
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'     
    }
})

let Product = mongoose.model('Product', schemaProduct);
module.exports = Product;