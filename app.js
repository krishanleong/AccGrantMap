
const express = require('express');

const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Business = require('./models/business');
const ejsMate = require('ejs-mate');


app.engine('ejs', ejsMate)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))


app.use(express.static(path.join(__dirname, 'public')))


mongoose.connect('mongodb://127.0.0.1:27017/accgrantmap', {});


app.get ('/showLocal', async (req, res) => { 
    const allBusiness = await Business.find({city: "Charlottesville"});
    
    console.log ("result of Mongo Search", allBusiness);
    res.render('showLocal', {allBusiness});
});

app.get ('/search', async (req, res) => { 
    const allBusiness = await Business.find({city: "Charlottesville"});
    
    console.log ("result of Mongo Search", allBusiness);
   res.render('search')
});

app.get ('/map', async (req, res) => { 
    const allBusiness = await Business.find({});
    console.log ('hit map route');
    console.log ("result of Mongo Search", allBusiness);
    res.render('map', {allBusiness});
});

app.listen(3000, () => {
    console.log('Serving on port 3000')
})

