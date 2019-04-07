import React from 'react';
import SurveyModal from './SurveyModal.jsx';
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
    return (
      <div>
        <SurveyModal modalID={modalID} showMatches={this.showMatches.bind(this)}/>
        <h4 style={{textAlign: "center"}}>
          <a
            href={`#${modalID}`}
            data-target={`#${modalID}`}
            data-toggle="modal"
          >Find Your Connections</a> ♦ <a href="">How It Works</a>
        </h4>
        {this.state.showTable ? (<ConnectionTable matches={this.state.matches}/>) : (null)}
      </div>
    );
  }
}

export default MainApp;
