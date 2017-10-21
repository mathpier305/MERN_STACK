import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import NumInput from './NumInput.jsx';
import DateInput from './DateInput.jsx';

export default class IssueEdit extends React.Component { // eslint-disable-line
constructor(props){
  super(props);
  this.state = {
      issue: {
        _id: '',
        title: '',
        status:'',
        owner:'',
        effort: null,
        completionDate: null,
        created: '',
      },
      invalidFields: {},
  };
  this.onChange = this.onChange.bind(this);
  this.onValidityChange = this.onValidityChange.bind(this);
}
componentDidMount(){
    this.loadData();
}

componentDidUpdate(prevProps){
  console.log("componentDidUpdate");
  if(prevProps.params.id !== this.props.params.id){
    console.log("componentDidUpdate inside");
    this.loadData();
  }
}

onValidityChange(event, valid){
  const invalidFields = Object.assign({}, this.state.invalidFields);
  if(!valid){
    invalidFields[event.target.name] = true;
  }else{
    delete invalidFields[event.target.name];
  }
  this.setState({invalidFields});
}

onChange(event, convertedValue){
  const issue =  Object.assign({}, this.state.isssue);
  const value = (convertedValue !== undefined) ? convertedValue : event.target.value;

  issue[event.target.name] = value;
  this.setState({issue});
}

loadData(){
  fetch(`/api/issues/${this.props.params.id}`).then(response =>{
    if(response.ok){
      response.json().then(issue =>{
        issue.created = issue.created != null ? new Date(issue.created).toDateString() : '';
        issue.completionDate = issue.completionDate != null ?
         new Date(issue.completionDate) : '';
        this.setState({ issue });
      });
    }else{
      response.json().then(error =>{
        alert(`Failed to fetch issue: ${error.message}`);
      });

    }
  }).catch(err => {
    alert(`Error in fetching data from server : ${err.message}`);
  });
}
  render() {
    const issue = this.state.issue;
    const validationMessage = Object.keys(this.state.invalidFields).length === 0 ?
    null : (<div className="error"> Please correct invalid Fields before submitting. </div>);

    return (
      <div>
        <form>
          Id: {issue._id}
          <br />
          Created: {issue.created}
          <br />
          Status:
          <select name="status" value={issue.status} onChange={this.onChange}>
            <option value="New"> New </option>
            <option value="Open">Open </option>
            <option value="Assigned"> Assigned </option>
            <option value="Fixed"> Fixed </option>
            <option value="Verified">Verified </option>
            <option value="Closed"> Closed </option>
          </select>
          <br />
          Owner
          <input name="owner"  type="text" value={this.state.issue.owner} onChange={this.onChange} />
         <br />
          Effort
          <NumInput size={5} name="effort" type="text" value={this.state.issue.effort} onChange={this.onChange} />
          <br />
        Completion Date:
          <DateInput name="completionDate" value={issue.completionDate}
            onChange={this.onChange} onValidityChange={this.onValidityChange} />
          <br />
          Title:
          <input name="title" type="text" size={50} value={issue.title} onChange={this.onChange} />
          <br />
          {validationMessage}
          <button type="submit"> Submit </button>
          <Link to="/issues"> Back to issue List </Link>

        </form>
        <p>This is a placeholder for editing issue.
         = {this.props.params.id}
        </p>
        <Link to="/issues"> Back to issues List </Link>
      </div>
    );
  }
}

IssueEdit.PropTypes = {
  params: PropTypes.object.isRequired,
};
