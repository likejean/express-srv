require('dotenv').config();  //get access to environmental variables & secret keys
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Establish DB connection
mongoose.connect(
    process.env.NODE_ENV_ATLAS_DATABASE).then(connect => 
        console.log(`Successfully connected to Atlas MongoDB {${process.env.ATLAS_DATABASE_NAME}}`))
    .catch(err => console.log('ERROR: could not connect to MongoDB database...', err));

let {people} = require('./data');

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

console.log("atlas:",process.env.NODE_ENV_ATLAS_DATABASE)
console.log("node_env", process.env.NODE_ENV)

module.exports = app;
