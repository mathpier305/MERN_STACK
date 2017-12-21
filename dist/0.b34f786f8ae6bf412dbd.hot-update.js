exports.id = 0;
exports.modules = {

/***/ 4:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDB = exports.app = undefined;

var _express = __webpack_require__(8);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(17);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongodb = __webpack_require__(7);

var _issue = __webpack_require__(18);

var _issue2 = _interopRequireDefault(_issue);

var _renderedPageRouter = __webpack_require__(19);

var _renderedPageRouter2 = _interopRequireDefault(_renderedPageRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express2.default)(); // import SourceMapSupport from 'source-map-support';
// SourceMapSupport.install();
// import 'babel-polyfill';

//import path from 'path';

app.use(_express2.default.static('static'));
app.use(_bodyParser2.default.json());

// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json({type: 'application/*+json'}));
//app.use(require('connect').bodyParser());
//app.use(app.router);


let db;

if (process.env.NODE_ENV !== 'production') {
  const webpack = __webpack_require__(11);
  const webpackDevMiddleware = __webpack_require__(32);
  const webpackHotMiddleware = __webpack_require__(33);

  const config = __webpack_require__(34);
  config.entry.app.push('webpack-hot-middleware/client', 'webpack/hot/only-dev-server');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());

  const bundler = webpack(config);
  app.use(webpackDevMiddleware(bundler, { noInfo: true }));
  app.use(webpackHotMiddleware(bundler, { log: console.log }));
}

app.delete('/api/issues/:id', (req, res) => {
  let issueId;
  try {
    issueId = new _mongodb.ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid  issue ID format: ${error}` });
    return;
  }
  db.collection('issues').deleteOne({ _id: issueId }).then(deleteResult => {
    if (deleteResult.result.n === 1) res.json({ status: 'OK' });else res.json({ status: 'Warning: object no found' });
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal server error : ${error}` });
  });
});

app.put('/api/issues/:id', (req, res) => {

  let issueId;
  try {
    issueId = new _mongodb.ObjectId(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid issue ID format : ${error}` });
    return;
  }
  const issue = req.body;

  delete issue._id;
  const err = _issue2.default.validateIssue(issue);
  if (err) {
    res.status(422).json({ message: `Invalid request: ${err}` });
    return;
  }

  console.log("the title to update is : " + issue.created);
  db.collection('issues').updateOne({ _id: issueId }, _issue2.default.convertIssue(issue)).then(() => db.collection('issues').find({ _id: issueId }).limit(1).next()).then(savedIssue => {
    res.json(savedIssue);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server error : ${error}` });
  });
});

app.get('/api/issues', (req, res) => {
  const filter = {};
  if (req.query.status) filter.status = req.query.status;
  if (req.query.effort_lte || req.query.effort_gte) filter.effort = {};
  if (req.query.effort_lte) filter.effort.$lte = parseInt(req.query.effort_lte, 10);
  if (req.query.effort_gte) filter.effort.$gte = parseInt(req.query.effort_gte, 10);
  if (req.query._summary === undefined) {
    const offset = req.query._offset ? parseInt(req.query._offset, 10) : 0;
    let limit = req.query.limit ? parseInt(req.query._limit, 10) : 20;
    if (limit > 50) limit = 50;
    const cursor = db.collection('issues').find(filter).sort({ _id: 1 }).skip(offset).limit(limit);
    let totalCount;
    cursor.count(false).then(result => {
      totalCount = result;
      return cursor.toArray();
    }).then(issues => {
      const metadata = { total_count: totalCount };
      res.json({ metadata: metadata, records: issues });
      console.log("request");
    }).catch(error => {
      console.log(error);
      res.status(500).json({ message: 'Internal Server Error' });
    });
  } else {
    db.collection('issues').aggregate([{ $match: filter }, { $group: { _id: { owner: '$owner', status: '$status' },
        count: { $sum: 1 }
      } }]).toArray().then(results => {
      const stats = {};
      results.forEach(result => {
        if (!stats[result._id.owner]) stats[result._id.owner] = {};
        stats[result._id.owner][result._id.status] = result.count;
      });
      res.json(stats);
    }).catch(error => {
      console.log(error);
      res.status(500).json({ message: `Internal Server error : ${error}` });
    });
  }
});

app.get('/api/issues/:id', (req, res) => {
  let issueId;
  try {

    issueId = (0, _mongodb.ObjectId)(req.params.id);
  } catch (error) {
    res.status(422).json({ message: `Invalid issue Id format: ${req.params.id} ${error}` });
    return;
  }

  db.collection('issues').find({ _id: issueId }).limit(1).next().then(issue => {
    if (!issue) res.status(404).json({ message: `No such issue: ${issueId}` });else res.json(issue);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal server error: ${error}` });
  });
});

app.post('/api/issues', (req, res) => {

  const newIssue = req.body;
  // newIssue.id = issues.length +1;
  newIssue.created = new Date();
  if (!newIssue.status) {
    newIssue.status = 'New';
  }
  console.log('******** hello ********');
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

  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve('static/index.html'));
  // });

  // issues.push(newIssue);

  // res.json(newIssue);
});
app.use('*', _renderedPageRouter2.default);
// app.listen(3000, ()=>{
//   console.log('App started on port 3000');
// });

function setDB(newDB) {
  db = newDB;
}

exports.app = app;
exports.setDB = setDB;

// MongoClient.connect('mongodb://localhost/issuetracker').then((connection) => {
//   db = connection;
//
//   app.listen(3000, () => {
//     console.log('App started on port 3000');
//   });
// }).catch((error) => {
//   console.log('ERROR', error);
// });

/***/ })

};
//# sourceMappingURL=0.b34f786f8ae6bf412dbd.hot-update.js.map