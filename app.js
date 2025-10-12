const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();  //get access to environmental variables & secret keys


//connect to MongoDB database using mongoose
//the connection string is stored in the .env file
mongoose.connect(
    process.env.NODE_ENV_ATLAS_DATABASE).then(connect => 
        console.log(`Successfully connected to MongoDB Database: ${process.env.NODE_ENV_ATLAS_CLUSTER_NAME}/${process.env.NODE_ENV_ATLAS_DATABASE_NAME}`))
    .catch(err => console.log('ERROR: could not connect to MongoDB database...', err));


//app.use(fileUpload());
//middleware: exposes a directory or a file to 
//a particular URL so its contents can be publicly accessed (thru inspection in browser)
app.use(express.static('./public'));

//middleware: module parses request URL-encoded payloads
app.use(express.urlencoded({extended: false}));

//middleware: module parses incoming requests with JSON payloads and is based on body-parser
app.use(express.json());

//CORS middleware: to enable CORS (Cross-Origin Resource Sharing)
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


//api routes: users, sensors, calibrations, procedures, datasets, articles
//import route modules to handle requests
const userRoutes = require('./api/routes/users');
const sensorRoutes = require('./api/routes/sensors');
const calibrationRoutes = require('./api/routes/calibrations');
const procedureRoutes = require('./api/routes/procedures');
const datasetRoutes = require('./api/routes/datasets');
const articleRoutes = require('./api/routes/articles');



//Mounts routes for user requests at specified paths
//e.g. requests to /api/users will be handled by userRoutes
app.use('/api/users', userRoutes);
app.use('/api/sensors', sensorRoutes);
app.use('/api/calibrations', calibrationRoutes);
app.use('/api/procedures', procedureRoutes);
app.use('/api/datasets', datasetRoutes);
app.use('/api/articles', articleRoutes);

//export the app module
module.exports = app;
