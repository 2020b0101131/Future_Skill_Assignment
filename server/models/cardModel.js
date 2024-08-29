const mongoose = require('mongoose');
const { Schema } = mongoose;


const cardSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
});


const Card = mongoose.model('Card', cardSchema);

module.exports = Card;
