exports.id = 0;
exports.modules = [
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDB = exports.app = undefined;

var _express = __webpack_require__(7);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(16);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongodb = __webpack_require__(6);

var _issue = __webpack_require__(17);

var _issue2 = _interopRequireDefault(_issue);

var _renderedPageRouter = __webpack_require__(18);

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
  const webpack = __webpack_require__(10);
  const webpackDevMiddleware = __webpack_require__(31);
  const webpackHotMiddleware = __webpack_require__(32);

  const config = __webpack_require__(33);
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
  if (req.query._summary == undefined) {
    let limit = req.query.limit ? parseInt(req.query._limit, 10) : 20;
    if (limit > 50) limit = 50;
    db.collection('issues').find(filter).toArray().then(issues => {
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
        if (!stats[result._id.owner]) stats[results._id.owner] = {};
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

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("react-router-bootstrap");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Toast extends _react2.default.Component {
  ComponentDidUpdate() {
    if (this.props.showing) {
      clearTimeout(this.dismissTimer);
      this.dismissTimer = setTimeout(this.props.onDismiss, 5000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.dismissTimer);
  }

  render() {
    return _react2.default.createElement(
      _reactBootstrap.Collapse,
      { 'in': this.props.showing },
      _react2.default.createElement(
        'div',
        { style: { position: 'fixed', top: 30, left: 0, right: 0, textAlign: 'center' } },
        _react2.default.createElement(
          _reactBootstrap.Alert,
          { style: { display: 'inline-block', width: 500 }, bsStyle: this.props.bsStyle,
            onDismiss: this.props.onDismiss },
          this.props.message
        )
      )
    );
  }
}

exports.default = Toast;
Toast.propTypes = {
  showing: _propTypes2.default.bool.isRequired,
  onDismiss: _propTypes2.default.func.isRequired,
  bsStyle: _propTypes2.default.string,
  message: _propTypes2.default.any.isRequired
};

Toast.defaultProps = {
  bsStyle: 'success'
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
const validIssueStatus = {
  New: true,
  Open: true,
  Assigned: true,
  Fixed: true,
  Verified: true,
  Closed: true
};

const issueFieldType = {
  status: 'required',
  owner: 'required',
  effort: 'optional',
  created: 'required',
  completionDate: 'optional',
  title: 'required'
};

function cleanupIssue(issue) {
  const cleanedUpIssue = {};
  Object.keys(issue).forEach(field => {
    if (issueFieldType[field]) cleanedUpIssue[field] = issue[field];
  });
  return cleanedUpIssue;
}

function convertIssue(issue) {
  if (issue.created) issue.created = new Date(issue.created);
  if (issue.completionDate) issue.completionDate = new Date(issue.completionDate);
  return cleanupIssue(issue);
}

function validateIssue(issue) {
  const errors = [];
  console.log(issue.status);
  Object.keys(issueFieldType).forEach(field => {
    console.log(issue[field]);
    if (issueFieldType[field] === 'required' && !issue[field]) {
      errors.push(`Missing mandatory field: ${field}`);
    }
  });

  if (!validIssueStatus[issue.status]) {
    errors.push(`${issue.status} is not a valid status`);
  }
  return errors.length ? errors.join('; ') : null;
}

exports.default = {
  validateIssue: validateIssue,
  cleanupIssue: cleanupIssue,
  convertIssue: convertIssue
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(19);

var _reactRouter = __webpack_require__(3);

var _express = __webpack_require__(7);

var _express2 = _interopRequireDefault(_express);

var _template = __webpack_require__(20);

var _template2 = _interopRequireDefault(_template);

var _Routes = __webpack_require__(21);

var _Routes2 = _interopRequireDefault(_Routes);

var _ContextWrapper = __webpack_require__(30);

var _ContextWrapper2 = _interopRequireDefault(_ContextWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const renderedPageRouter = new _express2.default();

//import HelloWorld from '../static/src/HelloWorld.jsx';


renderedPageRouter.get('*', (req, res) => {
  (0, _reactRouter.match)({ routes: _Routes2.default, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.log(" there is an error here : ", error);
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      console.log(" there is the redirectLocation here : ", redirectLocation);
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const componentsWithData = renderProps.components.filter(c => c.dataFetcher);
      const dataFetchers = componentsWithData.map(c => c.dataFetcher({
        params: renderProps.params,
        location: renderProps.location,
        urlBase: 'http://localhost:3000'
      }));
      Promise.all(dataFetchers).then(dataList => {
        let initialState = {};
        dataList.forEach(namedData => {
          initialState = Object.assign(initialState, namedData);
        });

        const html = (0, _server.renderToString)(_react2.default.createElement(
          _ContextWrapper2.default,
          { initialState: initialState },
          _react2.default.createElement(_reactRouter.RouterContext, renderProps)
        ));
        res.status(200).send((0, _template2.default)(html, initialState));
      }).catch(err => {
        console.log(`Error rendering to string : ${err}`);
      });
    } else {
      res.status(404).send('Not Found');
    }
  });
  // const initialState = {addressee: 'Universe'};
  // const html = renderToString(<HelloWorld {...initialState} />);
  // res.send(template(html, initialState));
});
exports.default = renderedPageRouter;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("react-dom/server.js");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = template;
function template(body, initialState) {
  return `<!DOCTYPE HTML>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" >
        <link rel="stylesheet" href="/bootstrap/css/bootstrap.min.css" />
        <style>
        .aColor{
          color:red;
        }
        .panel-title a {display:block; width: 100%; cursor: pointer;}
        </style>
        <body>
          <div id="contents">{{{body}}}</div>
          <!--- this is where our component will appear -->
          <script>
            window.__INITIAL_STATE__ =${JSON.stringify(initialState)};
          </script>
          <script src="/vendor.bundle.js"></script>
          <script src="/app.bundle.js"></script>
        </body>
      </html>`;
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(3);

var _App = __webpack_require__(22);

var _App2 = _interopRequireDefault(_App);

var _IssueList = __webpack_require__(23);

var _IssueList2 = _interopRequireDefault(_IssueList);

var _IssueEdit = __webpack_require__(27);

var _IssueEdit2 = _interopRequireDefault(_IssueEdit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NoMatch = () => _react2.default.createElement(
  'p',
  null,
  'Page Not Found '
);

exports.default = _react2.default.createElement(
  _reactRouter.Route,
  { path: '/', component: _App2.default },
  _react2.default.createElement(_reactRouter.Route, { path: 'issues', component: (0, _reactRouter.withRouter)(_IssueList2.default) }),
  _react2.default.createElement(_reactRouter.Route, { path: 'issues/:id', component: _IssueEdit2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '*', component: NoMatch })
);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(5);

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = __webpack_require__(2);

var _reactRouterBootstrap = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import IssueList from './IssueList.jsx';
//import IssueEdit from './IssueEdit.jsx';

//const contentNode = document.getElementById('contents');
//const NoMatch = () => <p> Page Not Found </p>;

//import ReactDOM from 'react-dom';
//import { Router, Route, Redirect, browserHistory } from 'react-router';
const Header = () => _react2.default.createElement(
  _reactBootstrap.Navbar,
  { fluid: true },
  _react2.default.createElement(
    _reactBootstrap.Navbar.Header,
    null,
    _react2.default.createElement(
      _reactBootstrap.Navbar.Brand,
      null,
      ' Issue Tracker '
    )
  ),
  _react2.default.createElement(
    _reactBootstrap.Nav,
    null,
    _react2.default.createElement(
      _reactRouterBootstrap.LinkContainer,
      { to: '/issues' },
      _react2.default.createElement(
        _reactBootstrap.NavItem,
        null,
        'Issues'
      )
    ),
    _react2.default.createElement(
      _reactRouterBootstrap.LinkContainer,
      { to: 'reports' },
      _react2.default.createElement(
        _reactBootstrap.NavItem,
        null,
        'reports '
      )
    )
  ),
  _react2.default.createElement(
    _reactBootstrap.Nav,
    { pullRight: true },
    _react2.default.createElement(
      _reactBootstrap.NavItem,
      null,
      _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'plus' }),
      ' Create Issue '
    ),
    _react2.default.createElement(
      _reactBootstrap.NavDropdown,
      { id: 'user-dropdown', title: _react2.default.createElement(_reactBootstrap.Glyphicon, { glyph: 'option-horizontal' }), noCaret: true },
      _react2.default.createElement(
        _reactBootstrap.MenuItem,
        null,
        'Logout '
      )
    )
  )
);

const App = props => _react2.default.createElement(
  'div',
  null,
  _react2.default.createElement(Header, null),
  _react2.default.createElement(
    'div',
    { className: 'container-fluid' },
    props.children,
    _react2.default.createElement('hr', null),
    _react2.default.createElement(
      'h5',
      null,
      ' ',
      _react2.default.createElement(
        'small',
        null,
        'Full source code available at  this',
        _react2.default.createElement(
          'a',
          { href: 'https://github.com/vasansr/prop-mern-stack' },
          'Github Repository'
        )
      )
    )
  )
);

App.propTypes = {
  children: _propTypes2.default.object.isRequired
};

// const RoutedApp = () => (
//   <Router history={browserHistory} >
//     <Redirect from="/" to="/issues" />
//     <Route path="/" component={App} >
//       <Route path="issues" component={IssueList} />
//       <Route path="issues/:id" component={IssueEdit} />
//       <Route path="*" component={NoMatch} />
//     </Route>
//   </Router>
// );

// ReactDOM.render(<RoutedApp />, contentNode);
//
// if(module.hot){
//   module.hot.accept();
// }

exports.default = App;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(24);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = __webpack_require__(3);

var _reactBootstrap = __webpack_require__(2);

var _IssueAdd = __webpack_require__(25);

var _IssueAdd2 = _interopRequireDefault(_IssueAdd);

var _IssueFilter = __webpack_require__(26);

var _IssueFilter2 = _interopRequireDefault(_IssueFilter);

var _Toast = __webpack_require__(9);

var _Toast2 = _interopRequireDefault(_Toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

    return fetch(`${(urlBase, '')}/api/issues${location.search}`).then(response => {
      if (!response.ok) return response.json().then(error => Promise.reject(error));
      return response.json().then(data => ({ IssueList: data }));
    });
  }

  constructor(props, context) {
    super(props, context);
    //  const issues = context.initialState.data.records;
    const issues = context.initialState && context.initialState.IssueList ? context.initialState.IssueList.records : [];

    issues.forEach(issue => {
      issue.created = new Date(issue.created);
      if (issue.completionDate) {
        issue.completionDate = new Date(issue.completionDate);
      }
    });
    this.state = { issues: issues, toastVisible: false,
      toastMessage: '', toastType: 'success' };

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

    if (oldQuery.status == newQuery.status && oldQuery.effort_gte === newQuery.effort_gte && oldQuery.effort_lte === newQuery.effort_lte) {
      return;
    }

    this.loadData();
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
      this.setState({ issues: issues });
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
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _reactBootstrap.Panel,
        { collapsible: true, header: 'Filter' },
        _react2.default.createElement(_IssueFilter2.default, { setFilter: this.setFilter,
          initFilter: this.props.location.query })
      ),
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
/* 24 */
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IssueAdd extends _react2.default.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.issueAdd;
    this.props.createIssue({
      owner: form.owner.value,
      title: form.title.value,
      status: 'New',
      created: new Date()
    });
    //clear form for the next input
    form.owner.value = "";
    form.title.value = "";
  }

  render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _reactBootstrap.Form,
        { inline: true, name: 'issueAdd', onSubmit: this.handleSubmit },
        _react2.default.createElement(_reactBootstrap.FormControl, { name: 'owner', placeholder: 'Owner' }),
        ' ',
        _react2.default.createElement(_reactBootstrap.FormControl, { name: 'title', placeholder: 'Title' }),
        ' ',
        _react2.default.createElement(
          _reactBootstrap.Button,
          { type: 'submit', bsStyle: 'primary' },
          'Add'
        )
      )
    );
  }
}
exports.default = IssueAdd;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = __webpack_require__(3);

var _reactBootstrap = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IssueFilter extends _react2.default.Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      status: props.initFilter.status || '',
      effort_gte: props.initFilter.effort_gte || '',
      effort_lte: props.initFilter.effort_lte || '',
      changed: false
    };
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeEffortGte = this.onChangeEffortGte.bind(this);
    this.onChangeEffortLte = this.onChangeEffortLte.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
    this.clearFilter = this.clearFilter.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      status: newProps.initFilter.status || '',
      effort_gte: this.props.initFilter.effort_gte || '',
      effort_lte: this.props.initFilter.effort_lte || '',
      changed: false
    });
  }
  resetFilter() {
    this.setState({
      status: this.props.initFilter.status || '',
      effort_lte: this.props.initFilter.effort_lte || '',
      effort_gte: this.props.initFilter.effort_gte || '',
      changed: false
    });
  }

  setFilterOpen(e) {
    e.preventDefault();
    this.props.setFilter({ status: "open" });
  }

  setFilterAssigned(e) {
    e.preventDefault();
    this.props.setFilter({ status: 'assigned' });
  }

  clearFilter(e) {
    e.preventDefault();
    this.props.setFilter({});
  }

  onChangeStatus(e) {
    this.setState({ status: e.target.value, changed: true });
  }

  onChangeEffortGte(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({ effort_gte: e.target.value, changed: true });
    }
  }

  onChangeEffortLte(e) {
    const effortString = e.target.value;
    if (effortString.match(/^\d*$/)) {
      this.setState({ effort_lte: e.target.value, changed: true });
    }
  }
  applyFilter() {
    const newFilter = {};
    if (this.state.status) newFilter.status = this.state.status;
    if (this.state.effort_gte) newFilter.effort_gte = this.state.effort_gte;
    if (this.state.effort_lte) newFilter.effort_lte = this.state.effort_lte;
    this.props.setFilter(newFilter);
  }

  clearFilter() {
    this.props.setFilter({});
  }

  render() {
    //  const Separator = () => <span> | </span>
    return _react2.default.createElement(
      _reactBootstrap.Row,
      null,
      _react2.default.createElement(
        _reactBootstrap.Col,
        { xs: 6, sm: 4, md: 3, lg: 2 },
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.ControlLabel,
            null,
            'Status '
          ),
          _react2.default.createElement(
            _reactBootstrap.FormControl,
            { componentClass: 'select', value: this.state.status, onChange: this.onChangeStatus },
            _react2.default.createElement(
              'option',
              { value: '' },
              ' (any) '
            ),
            _react2.default.createElement(
              'option',
              { value: 'New' },
              'New '
            ),
            _react2.default.createElement(
              'option',
              { value: 'Open' },
              ' Open '
            ),
            _react2.default.createElement(
              'option',
              { value: 'Assigned' },
              'Assigned'
            ),
            _react2.default.createElement(
              'option',
              { value: 'Fixed' },
              'Fixed '
            ),
            _react2.default.createElement(
              'option',
              { value: 'Verified' },
              'Verified '
            ),
            _react2.default.createElement(
              'option',
              { value: 'Closed' },
              'Closed '
            )
          )
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Col,
        { xs: 6, sm: 4, md: 3, lg: 2 },
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.ControlLabel,
            null,
            ' Effort '
          ),
          _react2.default.createElement(
            _reactBootstrap.InputGroup,
            null,
            _react2.default.createElement(_reactBootstrap.FormControl, { value: this.state.effort_gte, onChange: this.onChangeEffortGte }),
            _react2.default.createElement(
              _reactBootstrap.InputGroup.Addon,
              null,
              '-'
            ),
            _react2.default.createElement(_reactBootstrap.FormControl, { value: this.state.effort_lte, onChange: this.onChangeEffortLte })
          )
        )
      ),
      _react2.default.createElement(
        _reactBootstrap.Col,
        { xs: 6, sm: 4, md: 4, lg: 3 },
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.ControlLabel,
            null,
            '&npsp; '
          ),
          _react2.default.createElement(
            _reactBootstrap.ButtonToolbar,
            null,
            _react2.default.createElement(
              _reactBootstrap.Button,
              { bsStyle: 'primary', onClick: this.applyFilter },
              ' Apply '
            ),
            _react2.default.createElement(
              _reactBootstrap.Button,
              { onClick: this.resetFilter, disabled: !this.state.changed },
              ' Reset '
            ),
            _react2.default.createElement(
              _reactBootstrap.Button,
              { onClick: this.clearFilter },
              ' Clear '
            )
          )
        )
      )
    );
  }
}

exports.default = IssueFilter;
IssueFilter.propTypes = {
  setFilter: _propTypes2.default.func.isRequired,
  initFilter: _propTypes2.default.object
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = __webpack_require__(3);

var _reactRouterBootstrap = __webpack_require__(8);

var _reactBootstrap = __webpack_require__(2);

var _NumInput = __webpack_require__(28);

var _NumInput2 = _interopRequireDefault(_NumInput);

var _DateInput = __webpack_require__(29);

var _DateInput2 = _interopRequireDefault(_DateInput);

var _Toast = __webpack_require__(9);

var _Toast2 = _interopRequireDefault(_Toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IssueEdit extends _react2.default.Component {
  // eslint-disable-line
  static dataFetcher(_ref) {
    let params = _ref.params,
        urlBase = _ref.urlBase;

    return fetch(`${urlBase || ''}/api/issues/${params.id}`).then(response => {
      if (!response.ok) return response.json().then(error => Promise.reject(error));
      return response.json().then(data => ({ IssueEdit: data }));
    });
  }

  constructor(props, context) {
    super(props, context);
    // const issue = context.initialState.data;
    // issue.created = new Date(issue.created);
    // issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : null;

    let issue;
    if (context.initialState && context.initialState.IssueEdit) {
      issue = context.initialState.IssueEdit;
      issue.created = new Date(issue.created);
      issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : null;
    } else {
      issue = {
        _id: '',
        title: '',
        owner: '',
        effort: null,
        completionDate: null,
        created: null
      };
    }

    this.state = {
      issue: issue,
      invalidFields: {},
      showingValidation: false,
      toastVisible: false, toastMessage: '', toastType: 'success'
    };
    this.dismissValidation = this.dismissValidation.bind(this);
    this.showValidation = this.showValidation.bind(this);
    this.showSuccess = this.showSuccess.bind(this);
    this.showError = this.showError.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {

    if (prevProps.params.id !== this.props.params.id) {
      this.loadData();
    }
  }

  onValidityChange(event, valid) {
    const invalidFields = Object.assign({}, this.state.invalidFields);
    if (!valid) {
      invalidFields[event.target.name] = true;
    } else {
      delete invalidFields[event.target.name];
    }
    this.setState({ invalidFields: invalidFields });
  }

  showValidation(event) {
    this.setState({ showingValidation: true });
  }

  dismissValidation(event) {
    this.setState({ showingValidation: false });
  }
  onSubmit(event) {
    event.preventDefault();
    this.showValidation();
    if (Object.keys(this.state.invalidFields).length !== 0) {
      return;
    }
    fetch(`/api/issues/${this.props.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.issue)
    }).then(response => {
      if (response.ok) {
        response.json().then(updateIssue => {
          updateIssue.created = new Date(updateIssue.created);
          if (updateIssue.completionDate) {
            updateIssue.completionDate = new Date(updateIssue.completionDate);
          }
          this.setState({ issue: updateIssue });
          this.showSuccess('Updated issue successfully.');
        });
      } else {
        response.json().then(error => {
          this.showError(`Failed to update issue: ${error.message}`);
        });
      }
    }).catch(err => {
      this.showError(`Error in sending data to server: ${err.message}`);
    });
  }

  onChange(event, convertedValue) {
    const issue = Object.assign({}, this.state.issue);
    const value = convertedValue != null ? convertedValue : event.target.value;
    issue[event.target.name] = value;

    if (event.target.name === 'effort' && value === '') {
      issue[event.target.name] = null;
    }

    if (event.target.name === 'completionDate' && typeof value !== 'string') {
      issue[event.target.name] = value.toDateString();
    }
    this.setState({ issue: issue });
  }

  loadData() {
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

    IssueEdit.dataFetcher({ params: this.props.params }).then(data => {
      const issue = data.IssueEdit;
      issue.created = new Date(issue.created);
      issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : null;
      this.setState({ issue: issue });
    }).catch(err => {
      this.showError(`Error in fetching data from server : ${err.message}`);
    });
  }

  showSuccess(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'success' });
  }

  showError(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }
  render() {
    const issue = this.state.issue;
    let validationMessage = null;
    if (Object.keys(this.state.invalidFields).length !== 0 && this.state.showingValidation) {
      validationMessage = _react2.default.createElement(
        _reactBootstrap.Alert,
        { bsStyle: 'danger', onDismiss: this.dismissValidation },
        'Please correct invalid Fields before submitting.'
      );
    }
    return _react2.default.createElement(
      _reactBootstrap.Panel,
      { header: 'Edit Issue' },
      _react2.default.createElement(
        _reactBootstrap.Form,
        { horizontal: true, onSubmit: this.onSubmit },
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
            'ID'
          ),
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 9 },
            _react2.default.createElement(
              _reactBootstrap.FormControl.Static,
              null,
              issue._id
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
            'Created'
          ),
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 9 },
            _react2.default.createElement(
              _reactBootstrap.FormControl.Static,
              null,
              issue.created ? issue.created.toDateString() : ''
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
            'Status'
          ),
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 9 },
            _react2.default.createElement(
              _reactBootstrap.FormControl,
              { componentClass: 'select', name: 'status', value: issue.status, onChange: this.onChange },
              _react2.default.createElement(
                'option',
                { value: 'New' },
                ' New '
              ),
              _react2.default.createElement(
                'option',
                { value: 'Open' },
                'Open '
              ),
              _react2.default.createElement(
                'option',
                { value: 'Assigned' },
                ' Assigned '
              ),
              _react2.default.createElement(
                'option',
                { value: 'Fixed' },
                ' Fixed '
              ),
              _react2.default.createElement(
                'option',
                { value: 'Verified' },
                'Verified '
              ),
              _react2.default.createElement(
                'option',
                { value: 'Closed' },
                ' Closed '
              )
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
            'Owner '
          ),
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 9 },
            _react2.default.createElement(_reactBootstrap.FormControl, { name: 'owner', type: 'text', value: this.state.issue.owner, onChange: this.onChange })
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
            'Effort'
          ),
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 9 },
            _react2.default.createElement(_reactBootstrap.FormControl, { componentClass: _NumInput2.default, name: 'effort', type: 'text', value: this.state.issue.effort, onChange: this.onChange })
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          { validationState: this.state.invalidFields.completionDate ? 'error' : null },
          _react2.default.createElement(
            _reactBootstrap.Col,
            { componentClass: _reactBootstrap.ControlLabel, sm: 3 },
            ' Completion Date '
          ),
          _react2.default.createElement(
            _reactBootstrap.Col,
            { sm: 9 },
            _react2.default.createElement(_reactBootstrap.FormControl, { componentClass: _DateInput2.default, name: 'completionDate', value: this.state.issue.completionDate,
              onChange: this.onChange, onValidityChange: this.onValidityChange }),
            _react2.default.createElement(_reactBootstrap.FormControl.Feedback, null)
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { smOffset: 3, sm: 6 },
            _react2.default.createElement(
              _reactBootstrap.ButtonToolbar,
              null,
              _react2.default.createElement(
                _reactBootstrap.Button,
                { bsStyle: 'primary', type: 'submit' },
                'Submit'
              ),
              _react2.default.createElement(
                _reactRouterBootstrap.LinkContainer,
                { to: '/issues' },
                _react2.default.createElement(
                  _reactBootstrap.Button,
                  { bsStyle: 'link' },
                  'Back '
                )
              )
            )
          )
        ),
        _react2.default.createElement(
          _reactBootstrap.FormGroup,
          null,
          _react2.default.createElement(
            _reactBootstrap.Col,
            { smOffset: 3, sm: 9 },
            validationMessage
          )
        )
      ),
      _react2.default.createElement(_Toast2.default, { showing: this.state.toastVisible, message: this.state.toastMessage,
        onDismiss: this.dismissToast, bsStyle: this.state.toastType })
    );
  }
}

IssueEdit.contextTypes = {
  initialState: _react2.default.PropTypes.object
};

IssueEdit.PropTypes = {
  params: _propTypes2.default.object.isRequired
};

exports.default = IssueEdit;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class NumInput extends _react2.default.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.format(props.value) };
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ value: this.format(newProps.value) });
  }

  onBlur(e) {
    this.props.onChange(e, this.unformat(this.state.value));
  }

  onChange(e) {
    if (e.target.value.match(/^\d*$/)) {
      this.setState({ value: e.target.value });
    }
  }

  format(num) {
    return num != null ? num.toString() : '';
  }

  unformat(str) {
    const val = parseInt(str, 10);
    return isNaN(val) ? null : val;
  }

  render() {
    return _react2.default.createElement('input', _extends({ type: 'text' }, this.props, { value: this.state.value, onBlur: this.onBlur, onChange: this.onChange }));
  }
}exports.default = NumInput;
;

NumInput.propTypes = {
  value: _propTypes2.default.number,
  onChange: _propTypes2.default.func.isRequired
};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DateInput extends _react2.default.Component {
  constructor(props) {
    super(props);
    //  console.log(props.value);
    //    console.log(typeof props.value);

    this.state = { value: this.editFormat(props.value),
      focused: false, valid: true };
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.value !== this.props.value) {
      this.setState({ value: this.editFormat(newProps.value) });
    }
  }

  onFocus() {
    this.setState({ focused: true });
  }

  onBlur(e) {
    const value = this.unformat(this.state.value);
    const valid = this.state.value === '' || value != null;

    if (valid !== this.state.valid && this.props.onValidityChange) {
      this.props.onValidityChange(e, valid);
    }
    this.setState({ focused: false, valid: valid });
    if (valid) this.props.onChange(e, value);
  }

  onChange(e) {
    if (e.target.value.match(/^[\d-]*$/)) {
      this.setState({ value: e.target.value });
    }
  }

  displayFormat(date) {
    return date != null && date !== '' ? new Date(date).toDateString() : '';
  }

  editFormat(date) {
    // var myDate = Date.now(); // Date.now() returns a string, so you can't call toDateString() again on a string
    return date != null && date !== '' ? new Date(date).toDateString() : '';
  }

  unformat(str) {
    const val = new Date(str);
    return isNaN(val.getTime()) ? null : val;
  }

  render() {

    const value = this.state.focused || !this.state.valid ? this.state.value : this.displayFormat(this.props.value);
    const childProps = Object.assign({}, this.props);
    delete childProps.onValidityChange;
    return _react2.default.createElement('input', _extends({ type: 'text' }, childProps, {
      value: value, placeholder: this.state.focused ? 'yyyy-mm-dd' : null,
      onFocus: this.onFocus, onBlur: this.onBlur, onChange: this.onChange }));
  }
}

exports.default = DateInput;
DateInput.propTypes = {
  value: _propTypes2.default.string,
  onChange: _propTypes2.default.func.isRequired,
  onValidityChange: _propTypes2.default.func,
  name: _propTypes2.default.string.isRequired
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ContextWrapper extends _react2.default.Component {
  getChildContext() {
    return { initialState: this.props.initialState };
  }

  render() {
    return this.props.children;
  }
}

exports.default = ContextWrapper;
ContextWrapper.childContextTypes = {
  initialState: _react2.default.PropTypes.object
};

ContextWrapper.propTypes = {
  children: _propTypes2.default.object.isRequired,
  initialState: _propTypes2.default.object
};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("webpack-dev-middleware");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = require("webpack-hot-middleware");

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

const webpack = __webpack_require__(10);

module.exports = {
  entry: {
    //app: ['./static/src/App.jsx'],
    app: ['./client/Client.jsx'],
    vendor: ['react', 'react-dom', 'isomorphic-fetch', 'react-router', 'react-bootstrap', 'react-router-bootstrap']
  },
  output: {
    path: `${__dirname}/static`,
    filename: 'app.bundle.js'
  },
  plugins: [new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })],
  devtool: 'source-map',
  devServer: {
    port: 8000,
    contentBase: 'static',
    proxy: {
      '*': {
        target: 'http://localhost:3000'
      },
      historyApiFallback: true
    }
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ })
];
//# sourceMappingURL=0.81471abff4e4be45e72d.hot-update.js.map