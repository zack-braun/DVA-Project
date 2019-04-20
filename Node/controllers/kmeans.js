const spawn = require('child_process').spawn;

let initDataArr = [];

const kmeans = {

  getInitData: () => initDataArr,

  initData: async (congressmenClass) => {
    const arr = await congressmenClass.getAll();
    const finalArr = [];
    for (let i = 0; i < arr.length; i += 1) {
      const financeDist = congressmenClass.parseFinanceData(arr[i]);
      const ideaology = congressmenClass.parseIdeaologyData(arr[i]);
      const dw = arr[i].dw_nominate;
      finalArr[i] = [dw,
        financeDist.health,
        financeDist.fir,
        financeDist.dgr,
        financeDist.afc,
        financeDist.le,
        financeDist.et,
        parseFloat(ideaology.AgFood).toFixed(2),
        parseFloat(ideaology.DefenseGlobal).toFixed(2),
        parseFloat(ideaology.EnergyTransport).toFixed(2),
        parseFloat(ideaology.Finance).toFixed(2),
        parseFloat(ideaology.Health).toFixed(2),
        parseFloat(ideaology.LaborEmployment).toFixed(2)];
    }
    // console.log(finalArr);
    return finalArr;
  },

  normalizeFeature: (val) => {
    const nominator = val - (-1);
    const denominator = 1 - (-1);
    return (nominator / denominator).toFixed(2);
  },

  startKmeans: async (congressmenClass) => {
    initDataArr = await kmeans.initData(congressmenClass);
  },

  runKmeans: (userInput = '1,1,1,1,1,1,1') => new Promise((resolve, reject) => {
    const temp = ['dwNominate', 'he', 'fin', 'def', 'ag', 'lab', 'en', 'agid', 'defid', 'enid', 'finid', 'heid', 'labid'];
    let str = '';
    for (let i = 0; i < temp.length; i += 1) {
      if (i === 0 || i >= 7) {
        console.log('norm');
        str += `${kmeans.normalizeFeature(userInput[temp[i]])},`;
      } else {
        str += `${userInput[temp[i]]},`;
      }
    }
    str = str.substring(0, str.length - 1);
    console.log(str);
    // console.log(initDataArr);
    const process = spawn('python3', ['./controllers/kmeansScript.py', str, initDataArr]);
    // console.log('here2');
    let closestPeeps;
    process.stdout.on('data', (data) => {
      closestPeeps = data.toString();
      // console.log(closestPeeps);
      closestPeeps = closestPeeps.replace(/'/g, '"');
      const jsoned = JSON.parse(closestPeeps);
      console.log(jsoned);
      resolve(jsoned);
    });
  }),
};

module.exports = kmeans;
