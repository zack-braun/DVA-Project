const congressmanModel = require('../models/congressmanModel.js');

const Congressman = {

  getAll: () => congressmanModel.find({}),

  findByOpensecrets: opensecrets => congressmanModel.findOne({ opensecrets }),

  findByIndex: index => congressmanModel.findOne({ index }),


  parseFinanceData: (congressman) => {
    Finance = congressman.Finance.replace(/'/g, '@');
    Finance = Finance.replace(/"/g, "'");
    Finance = Finance.replace(/@/g, '"');
    finance = JSON.parse(Finance);
    // console.log(finance);
    health = finance.Health;
    if (health < 0) {
      health = 0;
    }
    fir = finance['Finance, Insurance & Real Estate'];
    if (fir < 0) {
      fir = 0;
    }
    dgr = finance['Defense & Global Relations'];
    if (dgr < 0) {
      dgr = 0;
    }
    afc = finance['Agriculture, Food, & Consumer Goods'];
    if (afc < 0) {
      afc = 0;
    }
    le = finance['Labor/Employment'];
    if (le < 0) {
      le = 0;
    }
    et = finance['Energy & Transportation'];
    if (et < 0) {
      et = 0;
    }
    total = health + fir + dgr + afc + le + et;
    if (total !== 0) {
      health /= total;
      fir /= total;
      dgr /= total;
      afc /= total;
      le /= total;
      et /= total;
    }
    return {
      health,
      fir,
      dgr,
      afc,
      le,
      et,
    };
  },

};

module.exports = Congressman;
