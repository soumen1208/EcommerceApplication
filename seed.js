const mongoose = require('mongoose');
const Product = require('./model/Product');


const products = [
    {
        name:"iphone 15 pro max",
        img: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-1.jpg',
        price: 200000,
        desc: 'Ram: 16GB, Rom: 1TB, Processor: Bionic_17pro, Battery: 5000 maH, Display: Ratina-144hz refresh rate '
    },
    {
        name:"Samsung Galaxy S-23 ultra",
        img: 'https://static.toiimg.com/thumb/resizemode-4,msid-97558079,imgsize-200,width-380,imgv-1/97558079.jpg',
        price: 180000,
        desc: 'Ram: 32GB, Rom: 1TB, Processor: Snap Dragon 8gen 2, Battery: 5000 maH, Display: Super Amoled-144hz refresh rate '
    },
    {
        name:"OnePlus 12",
        img: 'https://cdn1.smartprix.com/rx-id08VBU8T-w1200-h1200/d08VBU8T.jpg',
        price: 80000,
        desc: 'Ram: 32GB, Rom: 1TB, Processor: Snap Dragon 8gen 3, Battery: 5400 maH, Display: Oled-144hz refresh rate '
    }
]


async function seedDB(){
    await Product.insertMany(products);
    console.log("DB seeded");
}

module.exports = seedDB;
