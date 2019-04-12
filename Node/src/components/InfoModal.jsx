import React from 'react';
import C3Bar from './C3Bar.jsx';

const abbrevMap = {
  "Agriculture, Food, & Consumer Goods": "ag",
  "Defense & Global Relations": "def",
  "Energy & Transportation": "en",
  "Finance, Insurance & Real Estate": "fin",
  "Health": "he",
  "Labor/Employment": "lab",
}

const averages = {
  "Agriculture, Food, & Consumer Goods": "ag",
  "Defense & Global Relations": "def",
  "Energy & Transportation": "en",
  "Finance, Insurance & Real Estate": "fin",
  "Health": "he",
  "Labor/Employment": "lab",
}

class InfoModal extends React.Component {
  render() {
    const { opensecrets, legislators, rank, modalID, reqBody } = this.props;
    let { Finance } = opensecrets;
    Finance = Finance.replace(/'/g, "@");
    Finance = Finance.replace(/"/g, "'");
    Finance = Finance.replace(/@/g, '"');
    Finance = JSON.parse(Finance);
    const congressman = ["Donations to " + legislators.name.last + "'s Campaign"];
    const you = ["Your allocations"];
    const avg = ["Congressional Average (2018)"];
    const categories = [];
    let sumCategories = 0;
    for (var key in Finance) {
      if (Finance.hasOwnProperty(key)) {
        categories.push(key);
        sumCategories += Finance[key];
      }
    }
    categories.sort();
    for (let i=0; i<categories.length; i+=1) {
      congressman.push(Finance[categories[i]] / sumCategories * 100);
      you.push(reqBody[abbrevMap[categories[i]]] * 100);
    }
    console.log(you)


    return (
      <div className="modal fade" id={modalID} tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" style={{width: "90%", maxWidth: "1000px"}}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title">Your #{rank} Match: {opensecrets.short_title} {legislators.name.official_full}</h4>
            </div>
            <div className="modal-body" style={{padding: "32px", height:"900px"}}>
              <C3Bar
                data={{
                  columns: [congressman, you],
                  type: 'bar',
                }}
                title={"Where Is " + legislators.name.official_full + " Receiving Campaign Donations?"}
                id={modalID + 'bar'}
                categories={categories}
                bar={{
                  width: {
                    ratio: 0.8
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoModal;
