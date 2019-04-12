import React from 'react';
import Gauge from './Gauge.jsx';
import C3GaugeActual from './C3GaugeActual.jsx';
import '../css/fontawesome-all.min.css';

class ConnectionRow extends React.Component {
  render() {
    const { rowData } = this.props;
    const { opensecrets, legislators } = rowData;
    const modalID = `infoModal${opensecrets.opensecrets}`;

    console.log(rowData)
    const { leadership_roles, name, terms, id } = legislators;
    let leadership = null;
    if (leadership_roles) {
      if (leadership_roles[leadership_roles.length-1].end === undefined) {
        leadership = (<p><i>{leadership_roles[leadership_roles.length-1].title}</i></p>);
      }
    }

    const currentTerm = terms[terms.length-1];
    const { title, state, dw_nominate, seniority, missed_vote_pct, votes_with_party_pct } = opensecrets;
    if (currentTerm.party === "Democrat") {
      currentTerm.party = "Democratic";
    }
    const gaugeID = "gaugeID"+id.bioguide;

    return (
      <tr>
        <td className="row">
          <div className="col-sm-3" style={{textAlign: "center"}}>
            <img
              src={"https://theunitedstates.io/images/congress/225x275/" + id.bioguide + ".jpg"}
              style={{width: "100%", maxWidth: "150px", marginBottom: "10px", border: "2px solid #111"}}
            />
            <p style={{fontWeight: "bold"}}>{name.official_full}</p>
            {leadership}
          </div>
          <div className="col-sm-9">
            <p><b>Position:</b> {title} ({state})</p>
            <p><b>Party:</b> {currentTerm.party}</p>
            <p><b>Bio:</b> {name.official_full} has spent {seniority} years in office and votes with the {currentTerm.party} party {votes_with_party_pct}% of the time.</p>
            <p><b>DW Nominate Score:</b></p>
            <div style={{display: "flex", justifyContent: "center"}}>
              <div style={{display: "flex", justifyContent: "center", maxWidth: "300px", textAlign: "center"}}>
                <p style={{marginTop: "47px"}}>More Conservative</p>
                <C3GaugeActual
                  data={dw_nominate}
                  id={gaugeID}
                  thresholds={[-50]}
                  gauge={{
                    min: -1.0,
                    max: 1.0,
                    label: {
                      format(value) {
                        return `${value}`;
                      },
                    },
                    width: 15,
                  }}
                />
                <p style={{marginTop: "47px"}}>More Liberal</p>
              </div>
            </div>
          </div>
        </td>
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
