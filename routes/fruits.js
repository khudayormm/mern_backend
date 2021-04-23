const express = require('express');
const Fruit = require('../models/Fruit');
const validateData = require('./validateData');

const router = express.Router();


//get data
router.get('/api/fruits', async(req, res) => {
    const fruits = await Fruit.find();

    if(!fruits)
        return res.status(404).send("Not found!");
    res.json(fruits);
});

//post data
router.post('/api/fruit', async(req, res) => {    
    const options = {
        name: req.body.name,
        price: req.body.price
    }

    const { error, value } = validateData(options, req.body);
    
    if(error)
        return res.status(400).send(error.details[0].message);
    req.body = value;
    
    const fruit = new Fruit({
        name: req.body.name,
        price: req.body.price
    });

    try {
        const newfruit = await fruit.save();
        res.json(newfruit);
    } catch (error) {
        res.send(400).send("Error posting...")
    }
});

//edit data
router.put('/api/fruit/:id', async(req, res) => {
    const fruits = await Fruit.findById({_id: req.params.id});
    if(!fruits)
        res.status(400).send("Error editing...");
        const options = {
            name: req.body.name,
            price: req.body.price
        }
        const { error, value } = validateData(options, req.body);     
        if(error)
            return res.status(400).send(error.details[0].message);
        fruits.name = req.body.name;
        fruits.price = req.body.price; 

    try {
        const fruit = await fruits.save();
        res.json(fruit);
    } catch (error) {
        res.status(400).send("Error editing")
    }
});

//delete data
router.delete('/api/fruit/:id', async(req, res) => {
    const fruit = await Fruit.findByIdAndRemove({ _id: req.params.id });
    if(!fruit)
        return res.status(400).send("Id mavjud emas!");
    try {
        res.json(fruit);
    } catch (error) {
        res.send(400).send("Qandaydir xatolik!")
    }
})


module.exports = router;