const mongoose = require('mongoose');

const candidateSchema = mongoose.Schema({
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

module.exports = mongoose.model('Candidate', candidateSchema);
