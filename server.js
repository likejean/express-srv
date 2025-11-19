const http = require('http');
const port = process.env.PORT || 5002;
const app = require('./app');

//creates a HTTP server
const server = http.createServer(app);

//server is listening...
//starts the server
server.listen(port, ()=>{
    console.log(`Server is listening on port ${port}....`);
})

