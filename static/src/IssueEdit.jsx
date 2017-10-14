import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class IssueEdit extends React.Component { // eslint-disable-line
constructor(props){
  super(props);
}

  render() {
    return (
      <div>
        <p>This is a placeholder for editing issue.
         = {this.props.match.params.id}
        </p>
        <Link to="/issues"> Back to issues List </Link>
      </div>
    );
  }
}
