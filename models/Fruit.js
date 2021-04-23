const mongoose = require('mongoose');

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    price: {
        type: Number,
        required: true
    },
    time : { 
        type : Date, 
        default: Date.now 
    }
})


const Fruit = mongoose.model('fruits', fruitSchema);

module.exports = Fruit;