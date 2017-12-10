exports.id = 0;
exports.modules = {

/***/ 13:
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

var _Routes = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../src/Routes.jsx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _Routes2 = _interopRequireDefault(_Routes);

var _ContextWrapper = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"../src/ContextWrapper.jsx\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));

var _ContextWrapper2 = _interopRequireDefault(_ContextWrapper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const renderedPageRouter = new _express2.default();

//import HelloWorld from '../static/src/HelloWorld.jsx';


renderedPageRouter.get('*', (req, res) => {
  const initialState = { addressee: 'Universe' };
  const html = (0, _server.renderToString)(_react2.default.createElement(HelloWorld, initialState));
  res.send((0, _template2.default)(html, initialState));
});
exports.default = renderedPageRouter;

/***/ }),

/***/ 15:
false

};
//# sourceMappingURL=0.847becb409e360f7f4f4.hot-update.js.map