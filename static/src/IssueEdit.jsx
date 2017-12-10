import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { LinkContainer} from 'react-router-bootstrap';
import {FormGroup, FormControl, ControlLabel, ButtonToolbar,
      Button, Panel, Form, Col, Alert } from 'react-bootstrap';

import NumInput from './NumInput.jsx';
import DateInput from './DateInput.jsx';
import Toast from './Toast.jsx';

export default class IssueEdit extends React.Component { // eslint-disable-line
static dataFetcher({params, urlBase}){
  return fetch(`${urlBase ||''}/api/issues/${params.id}`).then(response=>{
    if(!response.ok) return response.json().then(error=>Promise.reject(error));
    return response.json().then(data=> ({IssueEdit : data}));
  });
}

constructor(props, context){
  super(props, context);
  // const issue = context.initialState.data;
  // issue.created = new Date(issue.created);
  // issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : null;

  let issue;
  if(context.initialState.IssueEdit){
    issue = context.initialState.IssueEdit;
    issue.created = new Date(issue.created);
    issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : null;

  }else{
    issue ={
      _id : '',
      title: '',
      owner: '',
      effort: '',
      completionDate: null,
      created: null,
    };
  }

  this.state = {
      issue,
      invalidFields: {},
      showingValidation: false,
      toastVisible: false, toastMessage: '', toastType: 'success',
  };
  this.dismissValidation = this.dismissValidation.bind(this);
  this.showValidation =this.showValidation.bind(this);
  this.showSuccess =this.showSuccess.bind(this);
  this.showError = this.showError.bind(this);
  this.onChange = this.onChange.bind(this);
  this.onValidityChange = this.onValidityChange.bind(this);
  this.onSubmit = this.onSubmit.bind(this);

}

componentDidMount(){
    this.loadData();
}

componentDidUpdate(prevProps){

  if(prevProps.params.id !== this.props.params.id){
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

showValidation(event){
  this.setState({showingValidation: true});
}

dismissValidation(event){
  this.setState({showingValidation: false});
}
onSubmit(event){
  event.preventDefault();
  this.showValidation();
  if(Object.keys(this.state.invalidFields).length !== 0){
    return;
  }
  fetch(`/api/issues/${this.props.params.id}`, {
    method:'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(this.state.issue),
  }).then(response =>{
    if(response.ok){
    response.json().then(updateIssue =>{
      updateIssue.created  = new Date(updateIssue.created);
      if(updateIssue.completionDate){
        updateIssue.completionDate = new Date(updateIssue.completionDate);
      }
      this.setState({issue: updateIssue});
      this.showSuccess('Updated issue successfully.');
    });
  }else{
    response.json().then(error=>{
      this.showError(`Failed to update issue: ${error.message}`);
    });
  }
}).catch(err =>{
  this.showError(`Error in sending data to server: ${err.message}`);
});
}

onChange(event, convertedValue){
  const issue =  Object.assign({}, this.state.issue);
  const value = (convertedValue != null) ? convertedValue : event.target.value;
  issue[event.target.name] = value;

  if (event.target.name === 'effort' && value === '') {
    issue[event.target.name] = null;
  }

  if (event.target.name === 'completionDate' && typeof value !== 'string') {
    issue[event.target.name] = value.toDateString();
  }
  this.setState({issue});
}

loadData(){
  // fetch(`/api/issues/${this.props.params.id}`).then(response =>{
  //   if(response.ok){
  //     response.json().then(issue =>{
  //       issue.created = new Date(issue.created);
  //       issue.completionDate = issue.completionDate != null ?
  //        new Date(issue.completionDate) : '';
  //       this.setState({ issue });
  //     });
  //   }else{
  //     response.json().then(error =>{
  //       this.showError(`Failed to fetch issue: ${error.message}`);
  //     });
  //
  //   }
  // }).catch(err => {
  //   this.showError(`Error in fetching data from server : ${err.message}`);
  // });

  IssueEdit.dataFetcher({params: this.props.params}).then(data=>{
    const issue = data.IssueList;
    issue.created = new Date(issue.created);
    issue.completionDate =issue.completionDate != null ? new Date(issue.completionDate) : null;
    this.setState({issue});
  }).catch(err =>{
    this.showError(`Error in fetching data from server : ${err.message}`);
  });
}

showSuccess(message){
  this.setState({toastVisible: true, toastMessage: message, toastType: 'success'});
}

showError(message){
  this.setState({toastVisible: true, toastMessage: message, toastType: 'danger'});
}

dismissToast(){
  this.setState({toastVisible: false});
}
  render() {
    const issue = this.state.issue;
    let validationMessage =null;
    if(Object.keys(this.state.invalidFields).length !== 0 && this.state.showingValidation){
      validationMessage =(
        <Alert bsStyle="danger" onDismiss={this.dismissValidation}>
          Please correct invalid Fields before submitting.
        </Alert>
      );
    }
    return (
      <Panel header="Edit Issue">
        <Form horizontal onSubmit={this.onSubmit}>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>ID</Col>
            <Col sm={9}><FormControl.Static>{issue._id}</FormControl.Static></Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Created</Col>
            <Col sm={9}><FormControl.Static>
              {issue.created ? issue.created.toDateString() : ''}
            </FormControl.Static></Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Status</Col>
            <Col sm={9}>
              <FormControl componentClass="select" name="status" value={issue.status} onChange={this.onChange}>
                <option value="New"> New </option>
                <option value="Open">Open </option>
                <option value="Assigned"> Assigned </option>
                <option value="Fixed"> Fixed </option>
                <option value="Verified">Verified </option>
                <option value="Closed"> Closed </option>
              </FormControl>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Owner </Col>
            <Col sm={9}>
              <FormControl name="owner"  type="text" value={this.state.issue.owner} onChange={this.onChange} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={3}>Effort</Col>
            <Col sm={9}>
              <FormControl componentClass={NumInput} name="effort" type="text" value={this.state.issue.effort} onChange={this.onChange} />
            </Col>
          </FormGroup>
          <FormGroup validationState={this.state.invalidFields.completionDate ? 'error' : null}>
            <Col componentClass={ControlLabel} sm={3}> Completion Date </Col>
            <Col sm={9}>
              <FormControl componentClass={DateInput} name="completionDate"  value={issue.completionDate}
                onChange={this.onChange} onValidityChange={this.onValidityChange} />
                <FormControl.Feedback />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col smOffset={3} sm={6}>
              <ButtonToolbar>
                <Button bsStyle="primary" type="submit">Submit</Button>
                <LinkContainer to="/issues">
                  <Button bsStyle="link">Back </Button>
                </LinkContainer>
              </ButtonToolbar>
            </Col>
          </FormGroup>
          {/*Id: {issue._id}
          <br />
          Created: {issue.created ? issue.created.toDateString : ''}
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
          <Link to="/issues"> Back to issue List </Link> */}
          <FormGroup>
            <Col smOffset={3} sm={9}>{validationMessage}</Col>
          </FormGroup>

        </Form>
        <Toast showing={this.state.toastVisible} message={this.state.toastMessage}
          onDismiss={this.dismissToast} bsStyle={this.state.toastType} />
      </Panel>
    );
  }
}

IssueEdit.contextTypes = {
  initialState: React.PropTypes.object,
};

IssueEdit.PropTypes = {
  params: PropTypes.object.isRequired,
};
