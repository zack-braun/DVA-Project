import React from 'react';
import ConnectionRow from './ConnectionRow.jsx';

class ConnectionTable extends React.Component {
  render() {
    const { matches, customStyle } = this.props;
    const rows = matches.map(data => (
      <ConnectionRow rowData={data} key={`${data.id}ConnectionRow`} />
    ));

    return (
      <div className="col-sm-12" style={customStyle}>
        <div className="well">
          <h3> The congressmen you most closely align with... </h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Congressmen</th>
                <th>More Details</th>
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
