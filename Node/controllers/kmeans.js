
const kmeans = {

  initData: async (congressmenClass) => {
    const arr = await congressmenClass.getAll();
    let finalArr;
    for (let i = 0; i < arr.length; i += 1) {
      const financeDist = congressmenClass.parseFinanceData(arr[i]);
      const dw = arr[i].dw_nominate;
      finalArr = [dw, finnaceDist.fir, financeDist.dgr, financeDist.afc, financeDist.le, financeDist.et];
    }
    return finalArr;
  },


};

module.exports = kmeans;
