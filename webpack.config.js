const webpack = require('webpack');

module.exports = {
  entry: {
    //app: ['./static/src/App.jsx'],
    app:['./client/Client.jsx'],
    vendor: ['react', 'react-dom', 'isomorphic-fetch', 'react-router',
              'react-bootstrap', 'react-router-bootstrap'],
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
      '*': {
        target: 'http://localhost:3000',
      },
      historyApiFallback: true,
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
