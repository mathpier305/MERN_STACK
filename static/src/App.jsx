const contentNode = document.getElementById('contents');



class IssueFilter extends React.Component{
  render(){
    return(
      <div> This is a placeholder for the Issue Filter. </div>
    );
  }
}

class IssueRow extends React.Component{
  render(){
      const issue = this.props.issue;
      console.log("IssueRow ");
      return (
        <tr>
            <td>{issue.id}</td>
            <td>{issue.status}</td>
            <td>{issue.owner}</td>
            <td>{issue.created}</td>
            <td>{issue.effort}</td>
            <td>{issue.completionDate? issue.completionDate : ''}</td>
            <td>{issue.title}</td>
        </tr>
      )
  }
}

class IssueTable extends React.Component{
  render(){
    const issueRows = this.props.issues.map(issue => <IssueRow key={issue.id} issue={issue} />)
    return (
      <table >
       <thead>
        <tr>
         <th>Id</th>
         <th>Title</th>
         <th>Owner</th>
         <th>Created</th>
         <th>Effort</th>
         <th>Completion Date</th>
         <th>Title</th>
        </tr>
      </thead>
      <tbody>{issueRows}</tbody>
     </table>
    )
  }
}

class IssueAdd extends React.Component{
  constructor(){
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    var form = document.forms.issueAdd;
    this.props.createIssue({
      owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      created: new Date(),
    });
    //clear form for the next input
    form.owner.value ="";
    form.title.value ="";
  }

  render(){
    return (
      <div>
        <form name="issueAdd" onSubmit={this.handleSubmit} >
        <input type="text" name="owner" placeholder="Owner" />
        <input type="text" name="title" placeholder="Title" />
        <button>Add</button>
        </form>
      </div>
    )
  }
}

class IssueList extends React.Component{
    constructor(){
      super();
      this.state = {issues: []};
      this.createIssue = this.createIssue.bind(this);
    }


    loadData(){

      fetch('/api/issues').then(response=>{
          response.json()
          }).then(data => {
          console.log("Total count of records ");
         data.records.foreach(
        issue=>{
          issue.created = new Date(issue.created);
          if(issue.completionDate){
            issue.completionDate = new Date(issue.completionDate);
          }
        })
          this.setState({issues: data.records});
        }).catch(err=>{
          console.log(err);
        });

    }

    createIssue(newIssue){
    const updatedIssue = {
      "id": this.state.id,
      "status": this.state.status,
      "owner": this.state.owner,
      "effort": this.state.effort,
      "created":this.state.created,
      "completionDate":this.state.completionDate,
      "title": this.state.title
    }
      fetch('/api/issues', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newIssue),
        }).then(response =>{
        if(response.ok){
          response.json().then(newIssue=>{
            newIssue.Created = new Date(newIssue.created);
            if(newIssue.completionDate){
              newIssue.completionDate = new Date(newIssue.completionDate);
              }
              const newIssues = this.state.issues.concat(newIssue);
              this.setState({issues: newIssues});

          });
          }else{
            response.json().then(error => {
              alert("Failed to add issue: "+ error.message);
            });
          }
          }).catch(err=>{
            alert("Error in sending data to server: "+err.message);
          });
    }


    render(){
      return (
        <div>
          <h1> Issue Tracker </h1>
          <IssueFilter />
          <hr />
          <IssueTable issues={this.state.issues} />
          <hr />
          <IssueAdd createIssue={this.createIssue}/>
         </div>
      );
    }
}


ReactDOM.render(<IssueList />, contentNode);      // Render the component inside the content Node
