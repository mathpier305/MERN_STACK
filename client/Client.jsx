import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, browserHistory, Redirect } from 'react-router';

import routes from '../static/src/Routes.jsx';
import ContextWrapper from '../static/src/ContextWrapper.jsx';

const WrappedApp = (props) =>(
  <ContextWrapper {...props}>
    <Router history={browserHistory}>
      <Redirect from="/" to="/issues" />
       {routes}
    </Router>
  </ContextWrapper>
);

const contentNode  = document.getElementById('contents');
/* eslint no-underscore-dangle: 0 */
ReactDOM.render(<WrappedApp {...window.__INITIAL_STATE__}/>, contentNode);

if(module.hot){
  module.hot.accept();
}
