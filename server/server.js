// Express call
const express = require("express");
const app = express();

// HTTP Message at root
app.get('/', function (req, res) {
  res.send('OPI Server - TEST');
});

// Import Router
const layerRouter = require('./routers/api');

//Adding new Routs
app.use('/api', layerRouter); 

// App initialization at port 3002 
app.listen(3002, () => {
 console.log("OPI Server TEST. App intialized at Port: 3002");
});

