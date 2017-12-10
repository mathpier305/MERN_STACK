exports.id = 0;
exports.modules = {

/***/ 18:
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
      Promise.all(dataFetcher).then(dataList => {
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

/***/ })

};
//# sourceMappingURL=0.af4a575ae2bd0792a4a2.hot-update.js.map