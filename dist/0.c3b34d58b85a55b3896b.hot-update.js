exports.id = 0;
exports.modules = {

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(25);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = __webpack_require__(3);

var _reactBootstrap = __webpack_require__(2);

var _IssueAdd = __webpack_require__(26);

var _IssueAdd2 = _interopRequireDefault(_IssueAdd);

var _IssueFilter = __webpack_require__(10);

var _IssueFilter2 = _interopRequireDefault(_IssueFilter);

var _Toast = __webpack_require__(5);

var _Toast2 = _interopRequireDefault(_Toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PAGE_SIZE = 10;

const IssueRow = props => {
  function onDeleteClick() {
    props.deleteIssue(props.issue._id);
  }
  return _react2.default.createElement(
    'tr',
    null,
    _react2.default.createElement(
      'td',
      null,
      _react2.default.createElement(
        _reactRouter.Link,
        { to: `/issues/${props.issue._id}` },
        props.issue._id.substr(-4)
      )
    ),
    _react2.default.createElement(
      'td',
      null,
      props.issue.status
    ),
    _react2.default.createElement(
      'td',
      null,
      props.issue.owner
    ),
    _react2.default.createElement(
      'td',
      null,
      props.issue.created.toDateString()
    ),
    _react2.default.createElement(
      'td',
      null,
      props.issue.effort
    ),
    _react2.default.createElement(
      'td',
      null,
      props.issue.completionDate ? props.issue.completionDate.toDateString() : ''
    ),
    _react2.default.createElement(
      'td',
      null,
      props.issue.title
    ),
    _react2.default.createElement(
      'td',
      null,
      _react2.default.createElement(
        _reactBootstrap.Button,
        { bsSize: 'xsmall', onClick: onDeleteClick },
        _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'trash' }),
        ' '
      )
    )
  );
};

IssueRow.propTypes = {
  issue: _propTypes2.default.object.isRequired,
  deleteIssue: _propTypes2.default.func.isRequired
};

function IssueTable(props) {
  const issueRows = props.issues.map(issue => _react2.default.createElement(IssueRow, { key: issue._id, issue: issue, deleteIssue: props.deleteIssue }));

  return _react2.default.createElement(
    _reactBootstrap.Table,
    { bordered: true, condensed: true, hover: true, responsive: true },
    _react2.default.createElement(
      'thead',
      null,
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'th',
          null,
          'Id'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Title'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Owner'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Created'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Effort'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Completion Date'
        ),
        _react2.default.createElement(
          'th',
          null,
          'Title'
        ),
        _react2.default.createElement('th', null)
      )
    ),
    _react2.default.createElement(
      'tbody',
      null,
      issueRows
    )
  );
}

IssueTable.propTypes = {
  issues: _propTypes2.default.array.isRequired,
  deleteIssue: _propTypes2.default.func.isRequired
};

class IssueList extends _react2.default.Component {

  static dataFetcher(_ref) {
    let urlBase = _ref.urlBase,
        location = _ref.location;

    const query = Object.assign({}, location.query);
    const pageStr = query._page;
    if (pageStr) {
      delete query._page;
      query._offset = (parseInt(pageStr, 10) - 1) * PAGE_SIZE;
    }
    query._limit = PAGE_SIZE;
    const search = Object.keys(query).map(k => `${k}=${query[k]}`).join('&');
    return fetch(`${urlBase || ''}/api/issues?${search}`).then(response => {
      if (!response.ok) return response.json().then(error => Promise.reject(error));
      return response.json().then(data => ({ IssueList: data }));
    });
  }

  constructor(props, context) {
    super(props, context);
    //const issues = context.initialState.data.records;
    //const issues = context.initialState && context.initialState.IssueList ? context.initialState.IssueList.records : [];
    const data = context.initialState.IssueList ? context.initialState.IssueList : { metadata: { totalCount: 0 }, records: [] };
    const issues = data.records;

    issues.forEach(issue => {
      issue.created = new Date(issue.created);
      if (issue.completionDate) {
        issue.completionDate = new Date(issue.completionDate);
      }
    });
    this.state = { issues: issues, toastVisible: false,
      toastMessage: '', toastType: 'success',
      totalCount: data.metadata.totalCount
    };

    this.selectPage = this.selectPage.bind(this);
    this.createIssue = this.createIssue.bind(this);
    this.setFilter = this.setFilter.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  showError(message) {
    this.setState({ toastVisible: true, toastMessage: message,
      toastType: 'danger' });
  }

  dismissToast() {
    get;
    this.setState({ toastVisible: false });
  }

  deleteIssue(id) {
    fetch(`/api/issues/${id}`, { method: 'DELETE' }).then(response => {
      if (!response.ok) alert('Failed to delete issue');else this.loadData();
    });
  }

  setFilter(query) {
    if (this.props.location.query !== query) {
      this.props.router.push({ pathname: this.props.location.pathname, query: query });
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

    if (oldQuery.status == newQuery.status && oldQuery.effort_gte === newQuery.effort_gte && oldQuery.effort_lte === newQuery.effort_lte && oldQuery._page === newQuery._page) {
      return;
    }

    this.loadData();
  }

  selectPage() {
    const query = Object.assign(this.props.location.query, { _page: eventkey });
    this.props.router.push({ pathname: this.props.location.pathname, query: query });
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

    IssueList.dataFetcher({ location: this.props.location }).then(data => {
      const issues = data.IssueList.records;
      issues.forEach(issue => {
        issue.created = new Date(issue.created);
        if (issue.completionDate) {
          issue.completionDate = new Date(issue.completionDate);
        }
      });
      this.setState({ issues: issues, totalCount: data.IssueList.metadata.totalCount });
      console.log('satet:', issues);
    }).catch(err => {
      this.showError(`Error in fetching data from server: ${err}`);
    });
  }

  createIssue(newIssue) {
    fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue)
    }).then(response => {
      if (response.ok) {
        response.json().then(updatedIssue => {
          updatedIssue.created = new Date(updatedIssue.created);
          if (updatedIssue.completionDate) {
            updatedIssue.completionDate = new Date(updatedIssue.completionDate);
          }
          const newIssues = this.state.issues.concat(updatedIssue);
          this.setState({ issues: newIssues });
        });
      } else {
        response.json().then(error => {
          this.showError(`Failed to add issue: ${error.message}`);
        });
      }
    }).catch(err => {
      this.showError(`Error in sending data to server: ${err.message}`);
    });
  }

  render() {
    console.log("issueList : ", this.state);
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _reactBootstrap.Panel,
        { collapsible: true, header: 'Filter' },
        _react2.default.createElement(_IssueFilter2.default, { setFilter: this.setFilter,
          initFilter: this.props.location.query })
      ),
      _react2.default.createElement(_reactBootstrap.Pagination, {

        items: Math.ceil(this.state.totalCount / PAGE_SIZE),
        activePage: parseInt(this.props.location.query._page || '1', 10),
        onSelect: this.selectPage, maxButton: 7, next: true, prev: true, boundaryLinks: true }),
      _react2.default.createElement(IssueTable, { issues: this.state.issues, deleteIssue: this.deleteIssue }),
      _react2.default.createElement(_IssueAdd2.default, { createIssue: this.createIssue }),
      _react2.default.createElement(_Toast2.default, { showing: this.state.toastVisible, message: this.state.toastMessage,
        onDismiss: this.dismissToast, bsStyle: this.state.toastType })
    );
  }
}

IssueList.contextTypes = {
  initialState: _propTypes2.default.object
};

IssueList.propTypes = {
  location: _propTypes2.default.object.isRequired,
  router: _propTypes2.default.object
};

exports.default = IssueList;

/***/ }),

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
      const metadata = { total_count: issues.length };
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
//# sourceMappingURL=0.c3b34d58b85a55b3896b.hot-update.js.map