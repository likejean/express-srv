const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();  //get access to environmental variables & secret keys


//Establish DB connection
mongoose.connect(
    process.env.NODE_ENV_ATLAS_DATABASE).then(connect => 
        console.log(`Successfully connected to Atlas MongoDB: ${process.env.NODE_ENV_ATLAS_CLUSTER_NAME}/${process.env.NODE_ENV_ATLAS_DATABASE_NAME}`))
    .catch(err => console.log('ERROR: could not connect to MongoDB database...', err));

//middleware: exposes a directory or a file to 
//a particular URL so its contents can be publicly accessed (thru inspection in browser)
app.use(express.static('./public'));

//middleware: module parses request URL-encoded payloads
app.use(express.urlencoded({extended: false}));

//middleware: module parses incoming requests with JSON payloads and is based on body-parser
app.use(express.json());


//Intec Sensors Routes
const sensorRoutes = require('./api/routes/sensors');
app.use('/sensors', sensorRoutes);

module.exports = app;
