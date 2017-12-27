'use strict';

const express = require('express');

// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// App
const app = express();
app.use('/static', express.static('static'));


app.get('/', (req, res) =>{
  res.sendFile(__dirname + '/frontend/index.html');
});



app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);