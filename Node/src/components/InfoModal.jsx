import React from 'react';
import C3Bar from './C3Bar.jsx';
import Gauge from './Gauge.jsx';


const abbrevMap = {
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
    let { Finance, ideaology } = opensecrets;
    Finance = Finance.replace(/'/g, "@");
    Finance = Finance.replace(/"/g, "'");
    Finance = Finance.replace(/@/g, '"');
    Finance = JSON.parse(Finance);
    ideaology = ideaology.replace(/'/g, "@");
    ideaology = ideaology.replace(/"/g, "'");
    ideaology = ideaology.replace(/@/g, '"');
    ideaology = JSON.parse(ideaology);
    const congressman = ["Donations to " + legislators.name.last + "'s Campaign"];
    const you = ["Your Allocations"];
    const avg = ["Average Campaign Allocations"];
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
      avg.push(window.averages[abbrevMap[categories[i]]] * 100)
    }

    const gaugeID = "infoModalGauge";
    const ideologyCategories = ['AgFood', "DefenseGlobal", "EnergyTransport", "Finance", "Health", "LaborEmployment"];
    const catIDs = ['agid', "defid", "enid", "finid", "heid", "labid"];
    const gauges = [];
    for (let i=0; i<ideologyCategories.length; i+=1) {
      gauges.push((
        <div>
          <h4 style={{textAlign: "center", margin: "30px"}}>{legislators.name.last + "'s Lean on " + categories[i] + " Bills"}</h4>
          <Gauge
            data={ideaology[ideologyCategories[i]]}
            dataYou={reqBody[catIDs[i]]}
            name={legislators.name.last}
            id={gaugeID + ideologyCategories[i] + modalID}
          />
        </div>
      ))
    }

    return (
      <div className="modal fade" id={modalID} tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" style={{width: "90%", maxWidth: "900px"}}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title"><b>Your #{rank} Match:</b> {opensecrets.short_title} {legislators.name.official_full}</h4>
            </div>
            <div className="modal-body" style={{padding: "43px", height:"fit-content"}}>
              <h4 style={{textAlign: "center"}}>{"Where Is " + legislators.name.official_full + " Receiving Campaign Donations?"}</h4>
              <C3Bar
                data={{
                  columns: [congressman, you, avg],
                  type: 'bar',
                }}
                id={modalID + 'bar'}
                categories={categories}
                bar={{
                  width: {
                    ratio: 0.8
                  }
                }}
              />
              {gauges}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoModal;
