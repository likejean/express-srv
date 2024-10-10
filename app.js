const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();  //get access to environmental variables & secret keys


//Establish DB connection
mongoose.connect(
    process.env.NODE_ENV_ATLAS_DATABASE).then(connect => 
        console.log(`Successfully connected to MongoDB Database: ${process.env.NODE_ENV_ATLAS_CLUSTER_NAME}/${process.env.NODE_ENV_ATLAS_DATABASE_NAME}`))
    .catch(err => console.log('ERROR: could not connect to MongoDB database...', err));

//middleware: exposes a directory or a file to 
//a particular URL so its contents can be publicly accessed (thru inspection in browser)
app.use(express.static('./public'));

//middleware: module parses request URL-encoded payloads
app.use(express.urlencoded({extended: false}));

//middleware: module parses incoming requests with JSON payloads and is based on body-parser
app.use(express.json());

app.use((req, res, next) => {
    //
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    );
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS');
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Origin-Methods", "PUT, POST, PATCH, DELETE, GET, OPTIONS");
        res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Origin, Authorization, Content-Type");
        res.header("Access-Control-Allow-Credentials", "true");
       return res.status(200).json({});
    }
    next();
});


//Intec Sensors Routes
const sensorRoutes = require('./api/routes/sensors');

app.use('/api/sensors', sensorRoutes);

module.exports = app;
