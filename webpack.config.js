const webpack = require('webpack');

module.exports = {
  entry: {
    app: ['./static/src/App.jsx'],
    vendor: ['react', 'react-dom', 'whatwg-fetch', 'react-router'],
  },
  output: {
    path: `${__dirname}/static`,
    filename: 'app.bundle.js',
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
  ],
  devtool: 'source-map',
  devServer: {
    port: 8000,
    contentBase: 'static',
    proxy: {
      '/api/*': {
        target: 'http://localhost:3000',
      },
    },
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        },
      },
    ],
  },
};
