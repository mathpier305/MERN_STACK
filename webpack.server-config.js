const webpack = require('webpack');
const path = require('path');

module.exports ={
  target: 'node',
  entry: ['./server/index.js', './node_modules/webpack/hot/poll?1000'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.bundle.js',
    libraryTarget: 'commonjs',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals: [/^[a-z]/],
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loaders: 'babel-loader',
        query: {
          presets: ['react', 'es2015-node4'],
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015-node4']
        },
      },
    ],
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'source-map',
};
