exports.id = 0;
exports.modules = [
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _server = __webpack_require__(14);

var _reactRouter = __webpack_require__(22);

var _express = __webpack_require__(2);

var _express2 = _interopRequireDefault(_express);

var _template = __webpack_require__(16);

var _template2 = _interopRequireDefault(_template);

var _Routes = __webpack_require__(26);

var _Routes2 = _interopRequireDefault(_Routes);

var _ContextWrapper = __webpack_require__(33);

var _ContextWrapper2 = _interopRequireDefault(_ContextWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const renderedPageRouter = new _express2.default();

//import HelloWorld from '../static/src/HelloWorld.jsx';


renderedPageRouter.get('*', (req, res) => {
  (0, _reactRouter.match)({ routes: _Routes2.default, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      fetch(`http://localhost:3000/api${req.url}`).then(response => response.json()).then(data => {
        const initialState = { data: data };
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
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("react-bootstrap");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("react-router-bootstrap");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactRouter = __webpack_require__(22);

var _App = __webpack_require__(27);

var _App2 = _interopRequireDefault(_App);

var _IssueList = __webpack_require__(28);

var _IssueList2 = _interopRequireDefault(_IssueList);

var _IssueEdit = __webpack_require__(29);

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
  _react2.default.createElement(_reactRouter.IndexRedirect, { to: '/issues' }),
  _react2.default.createElement(_reactRouter.Route, { path: 'issues', component: (0, _reactRouter.withRouter)(issueList) }),
  _react2.default.createElement(_reactRouter.Route, { path: 'issues/:id', component: _IssueEdit2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '*', component: NoMatch })
);

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

__webpack_require__(9);

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(23);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = __webpack_require__(24);

var _reactRouterBootstrap = __webpack_require__(25);

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
/* 28 */
/***/ (function(module, exports) {

throw new Error("Module build failed: SyntaxError: Unexpected token, expected , (200:32)\n\n\u001b[0m \u001b[90m 198 | \u001b[39m\u001b[36mexport\u001b[39m \u001b[36mdefault\u001b[39m withRouter(\u001b[33mIssueList\u001b[39m)\u001b[33m;\u001b[39m\n \u001b[90m 199 | \u001b[39m\u001b[33mIssueList\u001b[39m\u001b[33m.\u001b[39mcontextTypes \u001b[33m=\u001b[39m {\n\u001b[31m\u001b[1m>\u001b[22m\u001b[39m\u001b[90m 200 | \u001b[39m  initialState\u001b[33m:\u001b[39m \u001b[33mPropTypes\u001b[39m\u001b[33m.\u001b[39mobject\u001b[33m;\u001b[39m\n \u001b[90m     | \u001b[39m                                \u001b[31m\u001b[1m^\u001b[22m\u001b[39m\n \u001b[90m 201 | \u001b[39m}\n \u001b[90m 202 | \u001b[39m\n \u001b[90m 203 | \u001b[39m\u001b[33mIssueList\u001b[39m\u001b[33m.\u001b[39mpropTypes \u001b[33m=\u001b[39m {\u001b[0m\n");

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(23);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRouter = __webpack_require__(22);

var _reactRouterBootstrap = __webpack_require__(25);

var _reactBootstrap = __webpack_require__(24);

var _NumInput = __webpack_require__(30);

var _NumInput2 = _interopRequireDefault(_NumInput);

var _DateInput = __webpack_require__(31);

var _DateInput2 = _interopRequireDefault(_DateInput);

var _Toast = __webpack_require__(32);

var _Toast2 = _interopRequireDefault(_Toast);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class IssueEdit extends _react2.default.Component {
  // eslint-disable-line
  constructor(props, context) {
    super(props, context);
    const issue = context.initialState.data;
    issue.created = new Date(issue.created);
    issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : null;

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
    fetch(`/api/issues/${this.props.params.id}`).then(response => {
      if (response.ok) {
        response.json().then(issue => {
          issue.created = new Date(issue.created);
          issue.completionDate = issue.completionDate != null ? new Date(issue.completionDate) : '';
          this.setState({ issue: issue });
        });
      } else {
        response.json().then(error => {
          this.showError(`Failed to fetch issue: ${error.message}`);
        });
      }
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
            _react2.default.createElement(_reactBootstrap.FormControl, { componentClass: _DateInput2.default, name: 'completionDate', value: issue.completionDate,
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

exports.default = IssueEdit;
IssueEdit.contextTypes = {
  initialState: _react2.default.PropTypes.object
};

IssueEdit.PropTypes = {
  params: _propTypes2.default.object.isRequired
};

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(23);

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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(23);

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DateInput extends _react2.default.Component {
  constructor(props) {
    super(props);
    console.log(props.value);
    console.log(typeof props.value);

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
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(23);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactBootstrap = __webpack_require__(24);

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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

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
  children: _react2.default.PropTyes.object.isRequired,
  initialState: _react2.default.PropTyes.object
};

/***/ })
];
//# sourceMappingURL=0.7fbe048d5e4c7eab2ab6.hot-update.js.map