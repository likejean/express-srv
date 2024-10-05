const express = require('express');
const app = express();
let {people} = require('./data');

//middleware: exposes a directory or a file to 
//a particular URL so its contents can be publicly accessed (thru inspection in browser)
app.use(express.static('./public'));

//middleware: moduleparses request URL-encoded payloads
app.use(express.urlencoded({extended: false}));


app.get('/api/people',(req, res)=>{
    res.status(200).json({success: true, data: people})
})

app.post('/login',(req, res)=>{
    console.log(req.body)
    res.end('POST');
})

app.listen(5000, ()=>{
    console.log('Server is listening on port 5000....')
})

