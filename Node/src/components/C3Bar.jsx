import React from 'react';

class C3Bar extends React.Component {
  componentDidMount() {
    this.renderChart(this.props.data, this.props.id, this.props.categories, this.props.bar, this.props.title);
  }

  //componentWillReceiveProps(newProps) {
  //  if (this.props.data != newProps.data) {
  //    this.bar.load({
  //      columns: [['data', newProps.data]],
  //    });
  //  }
  //}

  renderChart(theData, theId, theCategories, theBar, theTitle) {
    this.bar = c3.generate({
      bindto: `#${theId}`,
      interaction: {
        enabled: false,
      },
      data: theData,
      title: theTitle,
      bar: theBar,
      axis: {
        rotated: true,
        x: {
          type: 'category',
          categories: theCategories,
        },
        y: {
          label: 'Percentage of Funds',
          tick: {
            format: function (d) { return d+'%'; }
          },
        },
      },
      legend: {
        show: true,
        position: 'right',
      },
      size: {
        height: 520,
        width: 900,
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
