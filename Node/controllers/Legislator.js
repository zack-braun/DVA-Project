const legislatorModel = require('../models/legislatorModel.js');

const Legislator = {

  findByOpensecrets: (opensecrets) => legislatorModel.findOne({"id.opensecrets": opensecrets}),

};

module.exports = Legislator;
