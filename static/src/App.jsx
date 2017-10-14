import 'babel-polyfill';
import React from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch, Redirect, browserHistory, withRouter} from 'react-router-dom';


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
    <App>

    <Switch>
      <Route path="/issues/:id" component={IssueEdit}/>
      <Route path="/issues" component={IssueList} />
      <Redirect exact from="/" to="/issues"/>
      <Route path="*" component={NoMatch} />


    </Switch>
    </App>
  </Router>

);

ReactDOM.render(<RoutedApp />, contentNode);

if(module.hot){
module.hot.accept();
}
