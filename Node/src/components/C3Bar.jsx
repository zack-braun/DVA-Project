import React from 'react';

class C3Bar extends React.Component {
  componentDidMount() {
    this.renderChart(this.props.data, this.props.id, this.props.categories, this.props.bar, this.props.title);
  }

  renderChart(theData, theId, theCategories, theBar, theTitle) {
    this.bar = c3.generate({
      bindto: `#${theId}`,
      interaction: {
        enabled: true,
      },
      data: theData,
      title: theTitle,
      bar: theBar,
      tooltip: {
        format: {
          value: function (value, ratio, id, index) { return value.toFixed(0) + '%';  }
        }
      },
      grid: {
        y: {
          show: true
        }
      },
      axis: {
        rotated: true,
        x: {
          type: 'category',
          categories: theCategories,
        },
        y: {
          label: 'Percentage of Funds',
          tick: {
            format: function (d) { return d+'%'; },
            rotate: 45
          },
        },
      },
      legend: {
        show: true,
        position: 'right',
      },
      size: {
        height: 320,
        width: 800,
      },
    });
  }

  render() {
    return (
      <div className="sizing" id={this.props.id} />
    );
  }
}

export default C3Bar;
