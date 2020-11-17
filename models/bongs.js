const mongoose = require('mongoose');

const bongsSchema = new mongoose.Schema(
  {
    id:           Number,
    title:         String,
    description:  String,
  }
);

module.exports = mongoose.model('Bongs', bongsSchema);