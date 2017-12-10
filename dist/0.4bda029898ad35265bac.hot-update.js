exports.id = 0;
exports.modules = {

/***/ 19:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

const webpack = __webpack_require__(4);

module.exports = {
  entry: {
    //app: ['./static/src/App.jsx'],
    app: ['./client/Client.jsx'],
    vendor: ['react', 'react-dom', 'isomorphic-fetch', 'react-router', 'react-bootstrap', 'react-router-bootstrap']
  },
  output: {
    path: `${__dirname}/static`,
    filename: 'app.bundle.js'
  },
  plugins: [new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })],
  devtool: 'source-map',
  devServer: {
    port: 8000,
    contentBase: 'static',
    proxy: {
      '*': {
        target: 'http://localhost:3000'
      },
      historyApiFallback: true
    }
  },
  module: {
    loaders: [{
      test: /\.jsx$/,
      loader: 'babel-loader',
      query: {
        presets: ['react', 'es2015']
      }
    }]
  }
};
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ })

};
//# sourceMappingURL=0.4bda029898ad35265bac.hot-update.js.map