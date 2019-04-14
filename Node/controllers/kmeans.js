
let initDataArr = [];

const kmeans = {

  getInitData: () => initDataArr,

  initData: async (congressmenClass) => {
    const arr = await congressmenClass.getAll();
    const finalArr = [];
    for (let i = 0; i < arr.length; i += 1) {
      const financeDist = congressmenClass.parseFinanceData(arr[i]);
      const dw = arr[i].dw_nominate;
      finalArr[i] = [dw, financeDist.health, financeDist.fir, financeDist.dgr, financeDist.afc, financeDist.le, financeDist.et];
    }
    // console.log(finalArr);
    return finalArr;
  },

  startKmeans: async (congressmenClass) => {
    initDataArr = await kmeans.initData(congressmenClass);
  },

  runKmeans: (userInput = '1,1,1,1,1,1,1') => new Promise((resolve, reject) => {
    const temp = ['dwNominate', 'he', 'fin', 'def', 'ag', 'lab', 'en'];
    let str = '';
    for (let i = 0; i < temp.length; i += 1) {
      str += `${userInput[temp[i]]},`;
    }
    str = str.substring(0, str.length - 1);
    // console.log(str);
    const spawn = require('child_process').spawn;
    // console.log(initDataArr);
    const process = spawn('python3', ['./controllers/kmeansScript.py', str, initDataArr]);
    // console.log('here2');
    let closestPeeps;
    process.stdout.on('data', (data) => {
      closestPeeps = data.toString();
      closestPeeps = closestPeeps.replace(/'/g, '"');
      jsoned = JSON.parse(closestPeeps);
      console.log(jsoned);
      resolve(jsoned);
    });
  }),
};

module.exports = kmeans;