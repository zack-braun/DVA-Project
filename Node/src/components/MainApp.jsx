import React from 'react';
import SurveyModal from './SurveyModal.jsx';
import HowModal from './HowModal.jsx';
import ConnectionTable from './ConnectionTable.jsx';

class MainApp extends React.Component {
  constructor() {
    super();
    this.state = {
      matches: [],
      showTable: false,
    };
  }

  showMatches(matches) {
    this.setState({
      matches,
      showTable: true,
    })
  }

  render() {
    const modalID = 'surveyModal';
    const howItWorksModalID = 'howModal';
    return (
      <div style={{display: "grid"}}>
        <SurveyModal modalID={modalID} showMatches={this.showMatches.bind(this)}/>
        <HowModal modalID={howItWorksModalID}/>
        <h4 style={{textAlign: "center"}}>
          <a
            href={`#${modalID}`}
            data-target={`#${modalID}`}
            data-toggle="modal"
          >Find Your Matches</a> ♦ <a
            href={`#${howItWorksModalID}`}
            data-target={`#${howItWorksModalID}`}
            data-toggle="modal"
            >How It Works
          </a>
        </h4>
        {this.state.showTable ? (<ConnectionTable matches={this.state.matches}/>) : (null)}
        <div style={{display: "flex", justifyContent: "center"}}>
          <img style={{height: "75px"}} src="../images/89c6e1a370d0569b087591195d588ce1-opensecretsIcon.png" />
        </div>
      </div>
    );
  }
}

export default MainApp;
