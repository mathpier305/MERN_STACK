import React from 'react';
import { Link } from 'react-router-dom';

export default class IssueEdit extends React.Component { // eslint-disable-line

  render() {
    return (
      <div>
        <p>This is a placeholder for editing issue.</p>
        <Link to="/issues"> Back to issues List </Link>
      </div>
    );
  }
}
