const express = require('express');
const fruits = require('./routes/fruits');
const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

//DB connection
mongoose.connect(process.env.URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
.then(() => {
    console.log('MongoDB connected!')
}).catch((err) => {
    console.log(err)
});


//middleware
app.use(bodyParser.json());

//routes
app.use('/', fruits);

//PORT settings
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`${PORT} is running...`)
});