import 'babel-polyfill';
import React from 'react';
import PropTypes from 'prop-types';
//import ReactDOM from 'react-dom';
//import { Router, Route, Redirect, browserHistory } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


//import IssueList from './IssueList.jsx';
//import IssueEdit from './IssueEdit.jsx';

//const contentNode = document.getElementById('contents');
//const NoMatch = () => <p> Page Not Found </p>;

const Header = () =>(
  <Navbar fluid>
    <Navbar.Header>
      <Navbar.Brand> Issue Tracker </Navbar.Brand>
    </Navbar.Header>
    <Nav>
    <LinkContainer to="/issues">
        <NavItem>Issues</NavItem>
      </LinkContainer>
      <LinkContainer to="reports">
        <NavItem>reports </NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavItem><Glyphicon glyph="plus" /> Create Issue </NavItem>
      <NavDropdown id="user-dropdown" title={<Glyphicon glyph="option-horizontal" />} noCaret>
        <MenuItem>Logout </MenuItem>
      </NavDropdown>
    </Nav>
  </Navbar>
);

const App = (props) =>(
  <div>
    <Header/>
      <div className="container-fluid">
        {props.children}
      <hr />
      <h5> <small>
        Full source code available at  this
        <a href="https://github.com/vasansr/prop-mern-stack">Github Repository</a>
      </small>
    </h5>
      </div>
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};


// const RoutedApp = () => (
//   <Router history={browserHistory} >
//     <Redirect from="/" to="/issues" />
//     <Route path="/" component={App} >
//       <Route path="issues" component={IssueList} />
//       <Route path="issues/:id" component={IssueEdit} />
//       <Route path="*" component={NoMatch} />
//     </Route>
//   </Router>
// );

// ReactDOM.render(<RoutedApp />, contentNode);
//
// if(module.hot){
//   module.hot.accept();
// }

export default App;
