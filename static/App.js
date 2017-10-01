'use strict';

var _IssueList = require('./IssueList.jsx');

var _IssueList2 = _interopRequireDefault(_IssueList);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var contentNode = document.getElementById('contents');

_reactDom2.default.render(_react2.default.createElement(_IssueList2.default, null), contentNode); // Render the component inside the content Node