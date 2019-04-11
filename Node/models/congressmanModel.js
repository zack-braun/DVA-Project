const mongoose = require('mongoose');

const congressmanSchema = mongoose.Schema({
  id: String,
  name: String,
  party: String,
  position: String,
  dwNom: Number,
  ag: Number,
  def: Number,
  fin: Number,
  en: Number,
  he: Number,
  lab: Number,
});

module.exports = mongoose.model('Congressman', congressmanSchema);
