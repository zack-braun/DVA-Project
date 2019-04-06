import React from 'react';

class Slider extends React.Component {
  render() {
    const sliderTicks = [];
    for (let i=50; i>=-50; i-=10) {
      if (i<0) {
        sliderTicks.push(
          (<p>{'-$' + Math.abs(i)}</p>)
        );
      } else {
        sliderTicks.push(
          (<p>{'$' + i}</p>)
        );
      }
    }
    return (
      <div className="row" style={{textAlign: "center", marginBottom: "40px"}}>
        <div className="col-sm-2">
          <label>{this.props.leftLabel}</label>
        </div>
        <div className="col-sm-8">
          <div className="range">
            <input name={this.props.name} type="range" className="custom-range" min="-50" max="50" step="10" defaultValue="0" />
            <div className="sliderticks">
              {sliderTicks}
            </div>
          </div>
        </div>
        <div className="col-sm-2">
          <label>{this.props.rightLabel}</label>
        </div>
      </div>
    );
  }
}

export default Slider;
