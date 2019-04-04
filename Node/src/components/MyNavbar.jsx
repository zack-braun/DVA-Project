import React from 'react';
import '../css/fontawesome-all.min.css';
import LogoSVG from '../images/congress.svg';

class MyNavbar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top" style={{position: "sticky"}}>
        <a className="navbar-brand" href="#"><i className="fa fa-project-diagram"></i>{' '}<i className="fa fa-donate"></i>{' '}How Money Connects Our Representatives</a>
      </nav>
    );
  }
}

export default MyNavbar;
