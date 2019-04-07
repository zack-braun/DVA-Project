import React from 'react';
import '../css/fontawesome-all.min.css';

class ConnectionRow extends React.Component {
  render() {
    const { rowData } = this.props;
    const modalID = `infoModal${rowData.id}`;

    console.log(rowData)

    return (
      <tr>
        <td>{rowData.name}</td>
        <td>
          <button
            href={`#${modalID}`}
            data-target={`#${modalID}`}
            data-toggle="modal"
            className="btn btn-primary"
          >
            <i className="fa fa-search" aria-hidden="true" />
          </button>
        </td>
      </tr>
    );
  }
}

export default ConnectionRow;
