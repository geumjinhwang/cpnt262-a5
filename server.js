// dependencies
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
require('dotenv').config();

// import models
const bongs = require('./models/bongs.js');

// create express
const app = express();

// view engine
app.set('view engine', 'ejs');

// for middleware
app.use(express.static(path.join(__dirname, 'public')));

// mongoose connection
mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on('error', function(error){
  console.log(`Connection Error: ${error.message}`)
});

db.once('open', function() {
  console.log('Connected to DB...');
});

// main page content
app.get('/', (req, res) => {
  res.send(`<h1>CPNT262-A5</h1><h2>Add /api/v0/bongs to the endpoint of this url to see the list of pink bongs.</h2>`);
});

// endpoint, array of objects
app.get('/api/v0/bongs', (req, res) => {
  Bongs.find(function(err, data) {
    console.log(data);
    res.json(data)
  });
})

// endpoint, specified id for objects
app.get('/api/v0/bongs/:id', (req, res) => {
  Bongs.findOne({id: req.params.id}, function (err, data) {
    if (err || data===null) {
      res.send('Could not find Bongs');
      console.log(err);
    }
    else {
      res.json(data);
    }
  });
});

// 404 error middleware
app.use(function(req, res) {
  res.status(404);
  res.send('404: File Not Found');
});

// port setting
const PORT = process.env.PORT || 3000;

app.listen(PORT, function(){
  console.log(`Listening on port ${PORT}`);
});