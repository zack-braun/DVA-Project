import React from 'react';
import ConnectionRow from './ConnectionRow.jsx';

class ConnectionTable extends React.Component {
  render() {
    const { matches, customStyle } = this.props;
    console.log(matches)
    const rows = matches.map(data => (
      <ConnectionRow rowData={data} key={`${data.id}ConnectionRow`} />
    ));
    console.log(rows)

    return (
      <div className="col-sm-12" style={customStyle}>
        <div className="well">
          <h3> Your connections: </h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Representative</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ConnectionTable;
