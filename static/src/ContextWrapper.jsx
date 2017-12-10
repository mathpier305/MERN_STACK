import React from 'react';
import PropTypes from 'prop-types';

export  default class ContextWrapper extends React.Component {
  getChildContext(){
    return {initialState: this.props.initialState};
  }

  render(){
    return this.props.children;
  }
}

  ContextWrapper.childContextTypes ={
    initialState: React.PropTypes.object,
  };

  ContextWrapper.propTypes = {
    children: PropTypes.object.isRequired,
    initialState: PropTypes.object,
  };
