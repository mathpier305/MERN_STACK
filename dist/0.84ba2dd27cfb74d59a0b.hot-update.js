exports.id = 0;
exports.modules = {

/***/ 29:
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

/***/ })

};
//# sourceMappingURL=0.84ba2dd27cfb74d59a0b.hot-update.js.map