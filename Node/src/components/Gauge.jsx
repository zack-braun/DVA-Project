import React from 'react';

class Gauge extends React.Component {
  render() {
    var chart = c3.generate({
			data: {
					columns: [
							['DW Nominate', this.props.dw_nominate]
					],
					type: 'gauge',
			},
			color: {
					pattern: ['#FF0000', '#F97600', '#F6C600'], // the three color levels for the percentage values.
					threshold: {
	            unit: 'value', // percentage is default
	            max: 1, // 100 is default
	            min: -1, // 100 is default
							values: [-1.0, -0.2, 0.2]
					}
			},
			size: {
					height: 180
			}
	});
    return (
      {chart}
    );
  }
}

export default Gauge;
