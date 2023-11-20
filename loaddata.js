if (process.env.NODE_ENV !== "production")
{
    require('dotenv').config();
}
const mongoose = require('mongoose');
const Business = require('./models/business');
const mbxGeocoding = require ('@mapbox/mapbox-sdk/services/geocoding');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const excelToJson = require('convert-excel-to-json');

if (!mapBoxToken) {
    throw new Error('Mapbox token is missing. Please provide a valid Mapbox token.');
}
geocoder = mbxGeocoding ({accessToken: mapBoxToken});
mongoose.connect('mongodb://127.0.0.1:27017/accgrantmap', {});

const seedDB = async() => {
    
    await Business.deleteMany({});

    const results = await excelToJson({
        sourceFile: 'accgrantmap.xlsx'
    });

    console.log (results.Sheet1.length);
    
     for (const row of results.Sheet1.slice(1)) {
        const zip = String (row.F).slice(0,5);
        const address = `${row.E}, VA ${zip}`    
        
    
        let website = String (row.C);
        
        if (website.substring (0,3) === 'www' ) { 
             website = 'http://' + website;
             console.log (website);
        }

        const geoData = await geocoder.forwardGeocode({
            query: address,
            limit: 1
        }).send();
        
        // console.log (address);
        const business = new Business({
            service: row.A,
            name: row.B,
            website: row.C,
            email: row.D,
            city: row.E,
            state: 'VA',
            zip: zip,
            // grade: String,
            subject: row.H,
        });

        business.geometry = geoData.body.features[0].geometry;
        await business.save();
        // console.log ('saves a busines', business);
    }
    console.log ('finished load');
    mongoose.connection.close(); // Close the MongoDB connection
}
seedDB();