import React from 'react';
import 'isomorphic-fetch';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router';
import {Button, Glyphicon, Table, Panel, Pagination } from 'react-bootstrap';

//import IssueAdd from './IssueAdd.jsx';
import IssueFilter from './IssueFilter.jsx';
//import Toast from './Toast.jsx';
import withToast from './withToast.jsx';

const PAGE_SIZE = 10;

const IssueRow = (props) => {

  function onDeleteClick(){
    props.deleteIssue(props.issue._id);
  }

  return (
  <tr>
    <td><Link to={`/issues/${props.issue._id}`}>{props.issue._id.substr(-4)}</Link></td>
    <td>{props.issue.status}</td>
    <td>{props.issue.owner}</td>
    <td>{props.issue.created.toDateString()}</td>
    <td>{props.issue.effort}</td>
    <td>{props.issue.completionDate ? props.issue.completionDate.toDateString() : ''}</td>
    <td>{props.issue.title}</td>
    {props.deleteIssue ? (
    <td><Button bsSize="xsmall" onClick={onDeleteClick}>
      <Glyphicon glyph="trash" /> </Button>
    </td> ): null }
  </tr>
);
};


IssueRow.propTypes = {
  issue: PropTypes.object.isRequired,
  deleteIssue: PropTypes.func,
};

function IssueTable (props){
  const issueRows = props.issues.map(issue => <IssueRow key={issue._id} issue={issue} deleteIssue={props.deleteIssue}/>);

  return (
    <Table bordered condensed hover responsive>

     <thead>
      <tr>
       <th>Id</th>
       <th>Title</th>
       <th>Owner</th>
       <th>Created</th>
       <th>Effort</th>
       <th>Completion Date</th>
       <th>Title</th>
       {props.deleteIssue ? <th></th> : null }
      </tr>
    </thead>
    <tbody>{issueRows}</tbody>
  </Table>
   );

}

IssueTable.propTypes = {
  issues : PropTypes.array.isRequired,
  deleteIssue : PropTypes.func,
};



class IssueList extends React.Component {

  static dataFetcher({urlBase, location}){
    const query = Object.assign({}, location.query);
    const pageStr = query._page;
    if(pageStr){
      delete query._page;
      query._offset= (parseInt(pageStr, 10)-1) * PAGE_SIZE;
    }
    query._limit = PAGE_SIZE;
    const search = Object.keys(query).map(k=>`${k}=${query[k]}`).join('&');
    return fetch(`${urlBase || ''}/api/issues?${search}`).then(response=>{
            if(!response.ok) return response.json(). then(error=>
            Promise.reject(error));
            return response.json().then(data=>
              ({IssueList: data})
            );
          });
  }

  constructor(props, context) {
    super(props, context);
   //const issues = context.initialState.data.records;
  //const issues = context.initialState && context.initialState.IssueList ? context.initialState.IssueList.records : [];
 const data = context.initialState.IssueList ? context.initialState.IssueList : {metadata : {totalCount: 0}, records: []};
 const issues = data.records;

    issues.forEach(issue=>{
      issue.created = new Date(issue.created);
      if(issue.completionDate){
        issue.completionDate = new Date(issue.completionDate);
      }
    });
    this.state = { issues,
    totalCount :  data.metadata.totalCount,
    };


    this.selectPage = this.selectPage.bind(this);
    //this.createIssue = this.createIssue.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
  }

  deleteIssue(id){
    const headers = props.user;
    fetch(`/api/issues/${id}`,{method: 'DELETE'}).then(response =>{
      if(!response.ok) this.props.showError('Failed to delete issue');
      else this.loadData();
    })
  }

  setFilter(query){
    if(this.props.location.query !== query){
      this.props.router.push({ pathname: this.props.location.pathname, query  });
    }

  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.location.query;
    const newQuery = this.props.location.query;

    if (oldQuery === newQuery) {
      return;
    }

    if(oldQuery.status == newQuery.status
     && oldQuery.effort_gte === newQuery.effort_gte
     && oldQuery.effort_lte === newQuery.effort_lte
     && oldQuery._page === newQuery._page){
      return;
     }

    this.loadData();
  }

  selectPage(eventkey){
    const query= Object.assign(this.props.location.query, {_page: eventkey});
    this.props.router.push({pathname: this.props.location.pathname, query});
  }

  loadData() {
    // fetch(`/api/issues${this.props.location.search}`).then(response => {
    //   if (response.ok) {
    //     response.json().then(data => {
    //       data.records.forEach(issue => {
    //         issue.created = new Date(issue.created);
    //         if (issue.completionDate) {
    //           issue.completionDate = new Date(issue.completionDate);
    //         }
    //       });
    //       this.setState({ issues: data.records });
    //     });
    //   } else {
    //     response.json().then(error => {
    //       this.showError(`Failed to fetch issues ${error.message}`);
    //     });
    //   }
    // }).catch(err => {
    //   this.showError(`Error in fetching data from server: ${err}`);
    // });

    IssueList.dataFetcher({location: this.props.location}).then(data=>{
      const issues = data.IssueList.records;
      issues.forEach(issue=>{
        issue.created = new Date(issue.created);
        if(issue.completionDate){
          issue.completionDate = new Date(issue.completionDate);
        }
      });
      this.setState({issues, totalCount: data.IssueList.metadata.total_count});
    }).catch(err => {
       this.props.showError(`Error in fetching data from server: ${err}`);
     });

  }

  // createIssue(newIssue) {
  //   fetch('/api/issues', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(newIssue),
  //   }).then(response => {
  //     if (response.ok) {
  //       response.json().then(updatedIssue => {
  //         updatedIssue.created = new Date(updatedIssue.created);
  //         if (updatedIssue.completionDate) {
  //           updatedIssue.completionDate = new Date(updatedIssue.completionDate);
  //         }
  //         const newIssues = this.state.issues.concat(updatedIssue);
  //         this.setState({ issues: newIssues });
  //       });
  //     } else {
  //       response.json().then(error => {
  //         this.props.showError(`Failed to add issue: ${error.message}`);
  //       });
  //     }
  //   }).catch(err => {
  //     this.props.showError(`Error in sending data to server: ${err.message}`);
  //   });
  // }

  render() {
    return (
      <div>
        <Panel collapsible header="Filter">
          <IssueFilter setFilter={this.setFilter}
            initFilter={this.props.location.query}  />
      </Panel>
        <Pagination

          items={Math.ceil(this.state.totalCount / PAGE_SIZE)}
          activePage = {parseInt(this.props.location.query._page || '1', 10)}
          onSelect={this.selectPage} maxButtons={7} next prev boundaryLinks />
        <IssueTable issues={this.state.issues}
          deleteIssue={this.props.user.signedIn ? this.deleteIssue : null} />



      </div>
    );
  }
}

IssueList.contextTypes = {
  initialState: PropTypes.object,
};

IssueList.propTypes = {
  location: PropTypes.object.isRequired,
  router: PropTypes.object,
  showError: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const IssueListWithToast = withToast(IssueList);
IssueListWithToast.dataFetcher = IssueList.dataFetcher;

export default IssueListWithToast;
