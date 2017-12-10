exports.id = 0;
exports.modules = {

/***/ 21:
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
  _react2.default.createElement(_reactRouter.IndexRedirect, { to: '/issues' }),
  _react2.default.createElement(_reactRouter.Route, { path: 'issues', component: (0, _reactRouter.withRouter)(_IssueList2.default) }),
  _react2.default.createElement(_reactRouter.Route, { path: 'issues/:id', component: _IssueEdit2.default }),
  _react2.default.createElement(_reactRouter.Route, { path: '*', component: NoMatch })
);

/***/ })

};
//# sourceMappingURL=0.1b96d730530cda782625.hot-update.js.map