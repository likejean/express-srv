require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

//Establish DB connection
mongoose.connect(
    process.env.ATLAS_DATABASE).then(connect => 
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

app.get('/api/people',(req, res)=>{
    res.status(200).json({success: true, data: people})
})

app.post('/api/people',(req, res)=>{
    const {name} = req.body;
    if(!name) {
        return res.
        status(400).
        json({success: false, msg: 'please, provide your name!!!!'});
    }
    
    res.status(201).json({success: true, person: name});
})




app.post('/login',(req, res)=>{
    const {name} = req.body;
    if(name){
        return res.status(200).send(`Welcome, ${name}`)
    }
    res.status(403).send("please, provide crendentials");
})



module.exports = app;
