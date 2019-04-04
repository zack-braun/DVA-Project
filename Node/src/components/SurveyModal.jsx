import React from 'react';
import Slider from './Slider.jsx';

class SurveyModal extends React.Component {
  render() {
    const { modalID } = this.props;
    return (
      <div className="modal fade" id={modalID} tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" style={{width: "90%"}}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title">Find Your Connections</h4>
            </div>
            <div className="modal-body" style={{textAlign: "center"}}>
              <h4>Agriculture, Food, and Consumer Goods</h4>
              <Slider
                leftLabel={"Spend less on American farmers, import more, export less food"}
                rightLabel={"Invest in American Farmers to promote growing food in America"}
              />
              <Slider
                leftLabel={"Spend less on food for students in public schools"}
                rightLabel={"Invest in public schools to provide nutritious meals to students"}
              />
              <Slider
                leftLabel={"Spend less on food, drug, and consumer good regulation"}
                rightLabel={"Invest in more transparency for consumers and tighter regulations on food, drugs, and consumer goods"}
              />
              <h4>Defense and Global Relations</h4>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={() => {
                }}
              >Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SurveyModal;
