import React from 'react';


class InfoModal extends React.Component {
  render() {
    const { modalID } = this.props;

    return (
      <div className="modal fade" id={modalID} tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" style={{width: "90%", maxWidth: "900px"}}>
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
                <span className="sr-only">Close</span>
              </button>
              <h4 className="modal-title">How it works</h4>
            </div>
            <div className="modal-body" style={{padding: "32px"}}>
              <img src="../images/5e95ebddb12454c7114389f4e4f213cb-howitworks.png" style={{width: "100%"}}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default InfoModal;
