import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import MainApp from './components/MainApp.jsx';
//import 'bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'semantic-ui-css/semantic.min.css';
//import 'c3/c3.min.css';
import './css/global.css';

ReactDOM.render(
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={MainApp} />
      </Switch>
    </div>
  </Router>
  , document.getElementById('root'),
);
