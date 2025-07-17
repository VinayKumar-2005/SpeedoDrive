const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: String,
  price: String,
  fuel: String,
  seats: Number,
  transmission: String,
  tag: String,
  image: String
});

module.exports = mongoose.model('Car', carSchema);
