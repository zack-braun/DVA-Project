import React from 'react';
import ReactDOM from 'react-dom';
import MainApp from './components/MainApp.jsx';
import MyNavbar from './components/MyNavbar.jsx';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import RouteHelper from './components/RouteHelper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'semantic-ui-css/semantic.min.css';
//import 'c3/c3.min.css';
import './css/global.css';
import HowItWorks from './images/howitworks.png';
import OpenSecretsIcon from './images/opensecretsIcon.png';

window.RouteHelper = new RouteHelper();

// Loads certain pages with navbar
class NavBarLayer extends React.Component {
  render() {
    return (
      <div>
        <MyNavbar />
        {this.props.children}
      </div>
    );
  }
}

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <NavBarLayer>
          <Route exact path="/" component={MainApp} />
        </NavBarLayer>
      </Switch>
    </div>
  </Router>
  , document.getElementById('root'),
);
