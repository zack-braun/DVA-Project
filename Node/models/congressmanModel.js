const mongoose = require('mongoose');

const congressmanSchema = mongoose.Schema({
  index: Number,
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
  ideaology: String,
});

module.exports = mongoose.model('Congressman', congressmanSchema);
