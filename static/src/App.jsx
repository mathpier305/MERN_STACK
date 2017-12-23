import 'babel-polyfill';
import React from 'react';

//import ReactDOM from 'react-dom';
//import { Router, Route, Redirect, browserHistory } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import IssueAddNavItem from './IssueAddNavItem.jsx';
import withToast from './withToast.jsx';
import Header from './Header.jsx';

//const HeaderWithToast = withToast(Header);
export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: {signedIn: false, name : ''},
    };
    this.onSignin = this.onSignin.bind(this);
    this.onSignout = this.onSignout.bind(this);
  }

  onSignin(name){
    this.setState({user: {signedIn: true, name: name} });
  }

  onSignout(name){
    this.setState({user: {signedIn: false, name : '' } });
  }

  render(){
    return(
      <div>
        <Header user={this.state.user} onSignin={this.onSignin}
          onSignout={this.onSignout} />
        <div className="container-fluid">
          {this.props.children}
          <hr />
          <h5><small>
            Full source code available at  this
            <a href="https://github.com/vasansr/prop-mern-stack">Github Repository</a>
          </small></h5>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object.isRequired,
};
