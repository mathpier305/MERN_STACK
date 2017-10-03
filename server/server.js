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

if(process.env.NODE_ENV !== 'production'){
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const config = require('../webpack.config');
  config.entry.app.push('webpack-hot-middleware/client',
'webpack/hot/only-dev-server');
config.plugins.push(new webpack.HotModuleReplacementPlugin());

const bundler = webpack(config);
app.use(webpackDevMiddleware(bundler, {noInfo: true}));
app.use(webpackHotMiddleware(bundler, {log: console.log}));
}


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
