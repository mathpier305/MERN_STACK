import React from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';

export default class IssueFilter extends React.Component{
  constructor(){
    super();
    this.clearFilter = this.clearFilter.bind(this);
    this.setFilterOpen = this.setFilterOpen.bind(this);
    this.setFilterAssigned = this.setFilterAssigned.bind(this);
  }



  setFilterOpen(e){
    e.preventDefault();
    this.props.setFilter({status: 'open'});
  }

  setFilterAssigned(e){
    e.preventDefault();
    this.props.setFilter({status: 'assigned'});
  }

  clearFilter(e){
    e.preventDefault();
    this.props.setFilter({});
  }

  render(){
    const Separator = () => <span> | </span>
    return(
      <div>
        <a href="#"> All Issues</a>
        <Separator/>
        <a href="#" onClick={this.setFilterOpen}> Open Issues </a>
        <Separator />
        <a href="#" onClick={this.setFilterAssigned}> Assigned Issues </a>.
      </div>
    );
  }
}

IssueFilter.propTypes = {
  setFilter: PropTypes.func.isRequired,
};
