const mongoose = require('mongoose');

const congressmanSchema = mongoose.Schema({
  opensecrets: String,
  first_name: String,
  last_name: String,
  state: String,
  party: String,
  district: String,
  dw_nominate: Number,
  short_title: String,
  next_election: String,
  missed_votes_pct: Number,
  votes_with_party_pct: Number,
  seniority: Number,
  Finance: String,
});

module.exports = mongoose.model('Congressman', congressmanSchema);
