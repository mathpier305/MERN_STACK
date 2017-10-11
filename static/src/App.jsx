import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch, Redirect, hashHistory} from 'react-router-dom';


import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p> Page Not Found </p>;
const RoutedApp = () => (
    <Router history={hashHistory} >
    <div>
    <Switch>
      <Route path="/issues/:id" component={IssueEdit} />
      <Route path="/issues" component={IssueList} />
      <Redirect exact from="/" to="/issues"/>
      <Route path="*" component={NoMatch} />
    </Switch>

    </div>
  </Router>

);

ReactDOM.render(<RoutedApp />, contentNode);

if(module.hot){
module.hot.accept();
}
