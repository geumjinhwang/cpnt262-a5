const mongoose = require('mongoose');
require('dotenv').config();

// seed data
const dbSeed = require(`./seeds/bongs.js`);

// model defined
const Bongs = require(`./models/bongs.js`);

// mongoose
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

Bongs.insertMany(dbSeed, function(error, bongs) {
  console.log('Data import completed.')
  mongoose.connection.close();
});