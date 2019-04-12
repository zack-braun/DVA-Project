import React from 'react';

class C3GaugeActual extends React.Component {
  componentDidMount() {
    this.renderChart(this.props.data, this.props.id, this.props.thresholds, this.props.gauge);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.data != newProps.data) {
      this.gauge.load({
        columns: [['data', newProps.data]],
      });
    }
  }

  renderChart(theData, theId, theThresholds, theGauge) {
    this.gauge = c3.generate({
      bindto: `#${theId}`,
      interaction: {
        enabled: false,
      },
      data: {
        columns: [['data', theData]],
        type: 'gauge',
      },
      gauge: theGauge,
      color: {
        pattern: ['#CC0000'],
        threshold: {
          unit: 'value',
          values: theThresholds,
        },
      },
      padding: {
        // bottom: 20,
      },
      legend: {
        show: false,
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

export default C3GaugeActual;
