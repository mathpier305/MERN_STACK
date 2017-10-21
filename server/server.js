import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import Issue from './issue.js';
import 'babel-polyfill';
import path from 'path';
import SourceMapSupport from 'source-map-support';

SourceMapSupport.install();

const port = parseInt(process.env.PORT, 10) ||8080;

var ObjectId = require('mongodb').ObjectId;
const app = express();
app.use(express.static('static'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: 'application/*+json'}));
//app.use(require('connect').bodyParser());
//app.use(app.router);





if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const config = require('../webpack.config');
  config.entry.app.push('webpack-hot-middleware/client',
    'webpack/hot/only-dev-server');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const bundler = webpack(config);
  app.use(webpackDevMiddleware(bundler, { noInfo: true }));
  app.use(webpackHotMiddleware(bundler, { log: console.log }));
}

app.put('/api/issues/:id', (req, res)=> {
    var task = req.body;
    console.log("the body is : "+task.query);

    let issueId;
    try{
      issueId = new ObjectId(req.params.id);
    }catch(error){
      res.status(422).json({message: `Invalid issue ID format : ${error}`});
      return;
    }
    const issue = req.body;

    delete issue._id;
    const err = Issue.validateIssue(issue);
    if(err){
      res.status(422).json({message: `Invalid request: ${err}`});
      return;
    }

    db.collection('issues').update({_id: issueId},
    Issue.convertIssue(issue)).then(()=>
      db.collection('issues').find({_id: issueId}).limit(1)
    .next()
  )
    .then(savedIssue=>{
      res.json(savedIssue);
    })
    .catch(error=>{
      console.log(error);
      res.status(500).json({message: `Internal Server error : ${error}`});
    });
});


let db;
MongoClient.connect('mongodb://localhost/issuetracker').then((connection) => {
  db = connection;

  app.listen(8080, () => {
    console.log('App started on port 3000');
  });
}).catch((error) => {
  console.log('ERROR', error);
});

app.get('/api/issues', (req, res) => {
  const filter ={};
  if(req.query.status) filter.status = req.query.status;
  if(req.query.effort_lte || req.query.effort_gte) filter.effort ={};
  if(req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
  if(req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);

  db.collection('issues').find(filter).toArray().then((issues) => {
    const metadata = { total_count: issues.length };
    res.json({ metadata, records: issues });
    console.log("request");
  })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
});

app.get('/api/issues/:id', (req, res) =>{
  let issueId;
  try{

    issueId = ObjectId(req.params.id);
  }catch(error){
    res.status(422).json({message:`Invalid issue Id format: ${req.params.id} ${error}`});
    return;
  }

  db.collection('issues').find({_id: issueId}).limit(1)
  .next()
  .then(issue=>{
    if(!issue) res.status(404).json({message: `No such issue: ${issueId}`});
    else res.json(issue);
  })
  .catch(error=> {
    console.log(error);
    res.status(500).json({message: `Internal server error: ${error}`});
  });
});

app.post('/api/issues', (req, res) => {
  console.log('******** hello ********');
  const newIssue = req.body;
  // newIssue.id = issues.length +1;
  newIssue.created = new Date();
  if (!newIssue.status) {
    newIssue.status = 'New';
  }

  const err = Issue.validateIssue(newIssue);
  if (err) {
    console.log('******** error ********');
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }

  db.collection('issues').insertOne(Issue.cleanupIssue(newIssue)).then((result) => {
    console.log('******** hello1 ********');
    db.collection('issues').find({ _id: result.insertedId }).limit(1).next()
      .then((newIssue) => {
        console.log('******** hello2 ********');
        res.json(newIssue);
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ message: `Internal Server error : ${error}` });
      });
  });

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('static/index.html'));
  });
  // issues.push(newIssue);

  // res.json(newIssue);
});

// app.listen(3000, ()=>{
//   console.log('App started on port 3000');
// });
