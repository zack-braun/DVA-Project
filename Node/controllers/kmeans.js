
const kmeans = {

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
    arr = await kmeans.initData(congressmenClass);
  },

};

module.exports = kmeans;
