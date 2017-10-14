'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongodb = require('mongodb');

var _issue = require('./issue.js');

var _issue2 = _interopRequireDefault(_issue);

require('babel-polyfill');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sourceMapSupport = require('source-map-support');

var _sourceMapSupport2 = _interopRequireDefault(_sourceMapSupport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_sourceMapSupport2.default.install();

const app = (0, _express2.default)();
app.use(_express2.default.static('static'));
app.use(_bodyParser2.default.json());

let db;
_mongodb.MongoClient.connect('mongodb://localhost/issuetracker').then(connection => {
  db = connection;

  app.listen(3000, () => {
    console.log('App started on port 3000');
  });
}).catch(error => {
  console.log('ERROR', error);
});

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const config = require('../webpack.config');
  config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const bundler = webpack(config);
  app.use(webpackDevMiddleware(bundler, { noInfo: true }));
  app.use(webpackHotMiddleware(bundler, { log: console.log }));
}

app.get('/api/issues', (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.effort_lte || req.query.effort_gte) filter.effort = {};
  if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
  if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);

  db.collection('issues').find().toArray().then(issues => {
    const metadata = { total_count: issues.length };
    res.json({ metadata: metadata, records: issues });
    console.log("request");
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: 'Internal Server Error' });
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

  const err = _issue2.default.validateIssue(newIssue);
  if (err) {
    console.log('******** error ********');
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }

  db.collection('issues').insertOne(_issue2.default.cleanupIssue(newIssue)).then(result => {
    console.log('******** hello1 ********');
    db.collection('issues').find({ _id: result.insertedId }).limit(1).next().then(newIssue => {
      console.log('******** hello2 ********');
      res.json(newIssue);
    }).catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server error : ${error}` });
    });
  });

  app.get('*', (req, res) => {
    res.sendFile(_path2.default.resolve('static/index.html'));
  });
  // issues.push(newIssue);

  // res.json(newIssue);
});

// app.listen(3000, ()=>{
//   console.log('App started on port 3000');
// });
//# sourceMappingURL=server.js.map