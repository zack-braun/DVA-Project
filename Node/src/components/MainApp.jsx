import React from 'react';
import SurveyModal from './SurveyModal.jsx';

class MainApp extends React.Component {
  render() {
    const modalID = 'surveyModal';
    return (
      <div>
        <SurveyModal modalID={modalID}/>
        <h4 style={{textAlign: "center"}}>
          <a
            href={`#${modalID}`}
            data-target={`#${modalID}`}
            data-toggle="modal"
          >Find Your Connections</a> ♦ <a href="">How It Works</a>
        </h4>
      </div>
    );
  }
}

export default MainApp;
