exports.id = 0;
exports.modules = {

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(13);

var _react2 = _interopRequireDefault(_react);

__webpack_require__(33);

var _propTypes = __webpack_require__(22);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = __webpack_require__(15);

var _reactBootstrap = __webpack_require__(23);

var _IssueAdd = __webpack_require__(34);

var _IssueAdd2 = _interopRequireDefault(_IssueAdd);

var _IssueFilter = __webpack_require__(35);

var _IssueFilter2 = _interopRequireDefault(_IssueFilter);

var _Toast = __webpack_require__(31);

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
  constructor(props, context) {
    super(props, context);
    const issues = context.initialState.data.records;
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
    fetch(`/api/issues${this.props.location.search}`).then(response => {
      if (response.ok) {
        response.json().then(data => {
          data.records.forEach(issue => {
            issue.created = new Date(issue.created);
            if (issue.completionDate) {
              issue.completionDate = new Date(issue.completionDate);
            }
          });
          this.setState({ issues: data.records });
        });
      } else {
        response.json().then(error => {
          this.showError(`Failed to fetch issues ${error.message}`);
        });
      }
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
exports.default = (0, _reactRouter.withRouter)(IssueList);


IssueList.contextTypes = {
  initialState: _propTypes2.default.object
};

IssueList.propTypes = {
  location: _propTypes2.default.object.isRequired,
  router: _propTypes2.default.object
};

/***/ }),

/***/ 33:
/***/ (function(module, exports) {

module.exports = require("isomorphic-fetch");

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(13);

var _react2 = _interopRequireDefault(_react);

var _reactBootstrap = __webpack_require__(23);

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

/***/ 35:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(13);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(22);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = __webpack_require__(15);

var _reactBootstrap = __webpack_require__(23);

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

/***/ })

};
//# sourceMappingURL=0.8982eb0ed66f7cd71719.hot-update.js.map