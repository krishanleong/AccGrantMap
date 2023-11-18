
const express = require('express');

const app = express();
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))

mongoose.connect('mongodb://127.0.0.1:27017/accgrantmap', {});



app.get ('/map', (req, res) => { 
    console.log ('hit map route')
    res.render('map');
});

app.listen(3000, () => {
    console.log('Serving on port 3000')
})

