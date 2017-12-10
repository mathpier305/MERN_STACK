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

var _HelloWorld = __webpack_require__(15);

var _HelloWorld2 = _interopRequireDefault(_HelloWorld);

var _template = __webpack_require__(16);

var _template2 = _interopRequireDefault(_template);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const renderedPageRouter = new _express2.default();

renderedPageRouter.get('*', (req, res) => {
  const initialState = { addressee: 'Universe' };
  const html = (0, _server.renderToString)(_react2.default.createElement(_HelloWorld2.default, initialState));
  res.send((0, _template2.default)(html, initialState));
});
exports.default = renderedPageRouter;

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

module.exports = require("react-router");

/***/ })

};
//# sourceMappingURL=0.2e3d0d1758ae8bf255ff.hot-update.js.map