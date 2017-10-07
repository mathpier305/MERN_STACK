import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';


import IssueList from './IssueList.jsx';
import IssueEdit from './IssueEdit.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p> Page Not Found </p>;
const RoutedApp = () => (
  <Router>
    <div>
    <Route path="/" component={IssueList} />
    <Route path="/IssueEdit" component={IssueEdit} />
    <Route path="*" component={NoMatch} />
    </div>
  </Router>
);

ReactDOM.render(<RoutedApp />, contentNode);

if(module.hot){
module.hot.accept();
}
