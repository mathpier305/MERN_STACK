const express = require('express');

const app = express();
const bodyParser = require('body-parser');
app.use(express.static('static'));
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const Issue = require('./issue.js');
let db;
MongoClient.connect('mongodb://localhost/issuetracker').then(connection=>{
 db = connection;

 app.listen(3000, ()=>{
   console.log('App started on port 3000');
 });
}).catch(error=>{
  console.log('ERROR', error);
});
// const validIssueStatus = {
//   New: true,
//   Open: true,
//   Assigned: true,
//   Fixed: true,
//   Verified: true,
//   Closed: true,
// };
//
// const issueFieldType= {
//   status: 'required',
//   owner: 'required',
//   effort: 'optional',
//   created: 'required',
//   completionDate: 'optional',
//   title: 'required',
// };
//
// function validateIssue(issue){
//   for(const field in issueFieldType){
//     const type = issueFieldType[field];
//     if(!type){
//       delete issue[field];
//     }else if(type == 'required' && !issue[field]){
//       return `${field} is required.`;
//     }
//   }
//   if(!validIssueStatus[issue.status]){
//     return `${issue.status} is not a valid status`;
//   }
//   return null;
// }

app.get('/api/issues', (req, res)=>{
  // const metadata = {total_count: issues.length };
  // console.log("printing a log statement before sending the response");
  // res.json({_metadata: metadata, records:issues} );

  db.collection('issues').find().toArray().then(issues =>{
    const metadata = {total_count: issues.length};
    res.json ({ metadata: metadata, records: issues});
  }).catch(error=>{
    console.log(error);
    res.status(500).json({message: 'Internal Server Error'});
  });


});

app.post('/api/issues', (req, res)=>{
  console.log("******** hello ********")
  const newIssue = req.body;
  //newIssue.id = issues.length +1;
  newIssue.created = new Date();
  if(!newIssue.status){
    newIssue.status = 'New';
  }

  const err = Issue.validateIssue(newIssue);
    if(err){
      console.log("******** error ********")
      res.status(422).json({message: `Invalid request: ${err}`});
      return;
    }

    db.collection('issues').insertOne(newIssue).then(result=>{
      console.log("******** hello1 ********")
      db.collection('issues').find({_id: result.insertedId}).limit(1).next().
      then(newIssue=>{
        console.log("******** hello2 ********")
        res.json(newIssue);
      }).catch(error=>{
        console.log(error);
        res.status(500).json({message: `Internal Server error : ${error}`});
      });
    });
  //issues.push(newIssue);

  //res.json(newIssue);
});

// app.listen(3000, ()=>{
//   console.log('App started on port 3000');
// });
