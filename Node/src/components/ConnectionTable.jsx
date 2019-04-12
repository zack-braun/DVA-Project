import React from 'react';
import ConnectionRow from './ConnectionRow.jsx';

class ConnectionTable extends React.Component {
  render() {
    const { matches } = this.props;
    const rows = [];
    for (let i=0; i<matches.length; i+=1) {
      rows.push(
        <ConnectionRow rowData={matches[i]} rank={i+1} key={`${matches[i].opensecrets.opensecrets}ConnectionRow`} />
      );
    }

    return (
      <div className="col-sm-12" style={{display: "flex", justifyContent: "center"}}>
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
