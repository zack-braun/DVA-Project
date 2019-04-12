const congressmanModel = require('../models/congressmanModel.js');

const Congressman = {

  findByOpensecrets: (opensecrets) => congressmanModel.findOne({opensecrets}),

};

module.exports = Congressman;
