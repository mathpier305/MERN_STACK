exports.id = 0;
exports.modules = [
/* 0 */,
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
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
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
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

var _IssueReport = __webpack_require__(36);

var _IssueReport2 = _interopRequireDefault(_IssueReport);

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
  _react2.default.createElement(_reactRouter.Route, { path: 'reports', component: (0, _reactRouter.withRouter)(_IssueReport2.default) }),
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
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(0);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(2);

var _propTypes = __webpack_require__(1);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _IssueFilter = __webpack_require__(26);

var _IssueFilter2 = _interopRequireDefault(_IssueFilter);

var _Toast = __webpack_require__(9);

var _Toast2 = _interopRequireDefault(_Toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const statuses = ['New', 'Open', 'Assigned', 'Fixed', 'Verified', 'Closed'];

const StatRow = props => _react2.default.createElement(
  'tr',
  null,
  _react2.default.createElement(
    'td',
    null,
    props.owner
  ),
  statuses.map((status, index) => _react2.default.createElement(
    'td',
    { key: index },
    props.counts[status]
  ))
);

StatRow.propTypes = {
  owner: _propTypes2.default.string.isRequired,
  counts: _propTypes2.default.object.isRequired
};

class IssueReport extends _react2.default.Component {
  static dataFetcher(_ref) {
    let urlBase = _ref.urlBase,
        location = _ref.location;

    const search = location.search ? `${location.search}&_summary` : '?_summary';
    return fetch(`${urlBase || ''}/api/issues/${search}`).then(response => {
      if (!response.ok) return response.json().then(error => Promise.reject(error));
      return response.json().then(data => ({ IssueReport: data }));
    });
  }

  constructor(props, context) {
    super(props, context);
    const stats = context.initialState.IssueReport ? context.initialState.IssueReport : {};
    this.state = {
      stats: stats,
      toastVisible: false, toastMessage: '', toastType: 'Success'
    };
    this.setFilter = this.setFilter.bind(this);
    this.showError = this.showError.bind(this);
    this.dismissToast = this.dismissToast.bind(this);
  }

  componentDidMound() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    const oldQuery = prevProps.location.query;
    const newQuery = this.props.location.query;

    if (oldQuery.status === newQuery.status && oldQuery.effort_gte === newQuery.effort_gte && oldQuery.effort_lte == newQuery.effort_lte) {
      retur;
    }
    this.loadData();
  }

  setFilter(query) {
    this.props.router.push({ pathname: this.props.location.pathname, query: query });
  }

  showError(message) {
    this.setState({ toastVisible: true, toastMessage: message, toastType: 'danger' });
  }

  dismissToast() {
    this.setState({ toastVisible: false });
  }

  loadData() {
    IssueReport.dataFetcher({ location: this.props.location }).then(data => {
      this.setState({ stats: data.IssueReport });
    }).catch(err => {
      this.showError(`Error in fetching data from server : ${error}`);
    });
  }

  render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        _reactBootstrap.Panel,
        { collapsible: true, header: 'Filter' },
        _react2.default.createElement('issueFilter', { setFilter: this.setFilter, initFilter: this.props.location.query })
      ),
      _react2.default.createElement(
        _reactBootstrap.Table,
        { bordered: true, condensed: true, hover: true, responsive: true },
        _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement('th', null),
            statuses.map((status, index) => _react2.default.createElement(
              'td',
              { key: index },
              ' ',
              status
            ))
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          Object.keys(this.state.stats).map((owner, index) => _react2.default.createElement(StatRow, { key: index, owner: owner, counts: this.state.stats[owner] }))
        )
      ),
      _react2.default.createElement(_Toast2.default, { showing: this.state.toastVisible, message: this.state.toastMessage,
        onDismiss: this.dismissToast, bsStyle: this.state.toastType })
    );
  }
}

exports.default = IssueReport;
IssueReport.propTypes = {
  location: _propTypes2.default.object.isRequired,
  router: _propTypes2.default.object
};

IssueReport.contextTypes = {
  initialState: _propTypes2.default.object
};

/***/ })
];
//# sourceMappingURL=0.e6cc21f0b179d0e55837.hot-update.js.map