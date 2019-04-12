import React from 'react';

class C3Bar extends React.Component {
  componentDidMount() {
    this.renderChart(this.props.data, this.props.id, this.props.thresholds, this.props.bar);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.data != newProps.data) {
      this.bar.load({
        columns: [['data', newProps.data]],
      });
    }
  }

  renderChart(theData, theId, theThresholds, theBar) {
    this.bar = c3.generate({
      bindto: `#${theId}`,
      interaction: {
        enabled: false,
      },
      data: {
        columns: [['data', theData]],
        type: 'bar',
      },
      bar: theBar,
      axis: {
        rotated: true,
      }
      legend: {
        show: true,
      },
      size: {
        height: 120,
      }
    });
  }

  render() {
    return (
      <div className="sizing" id={this.props.id} />
    );
  }
}

export default C3Bar;
