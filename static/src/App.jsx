import 'babel-polyfill';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';


import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p> Page Not Found </p>;

const App = (props) =>(
  <div>
    <div className="header">
      <h1> Issue Tracker </h1>
    </div>
    <div className="contents">
      {props.children}
    </div>
    <div className="footer">
      Full Source code available at this
      <a href="https://github.com/vasansr/prop-mern-stack">
      Github Repository
      </a>
    </div>
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};


const RoutedApp = () => (
  <Router history={browserHistory} >
    <Redirect from="/" to="/issues" />
    <Route path="/" component={App} >
      <Route path="issues" component={IssueList} />
      <Route path="issues/:id" component={IssueEdit} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
);

ReactDOM.render(<RoutedApp />, contentNode);

if(module.hot){
  module.hot.accept();
}
