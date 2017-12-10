exports.id = 0;
exports.modules = {

/***/ 30:
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
  children: PropTyes.object.isRequired,
  initialState: PropTyes.object
};

/***/ })

};
//# sourceMappingURL=0.3c7d7ad58dbba29d022e.hot-update.js.map