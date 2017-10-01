const webpack = require('webpack');
module.exports={
  entry:{
    app:  __dirname+"/static/src/App.jsx",
    vendor:['react', 'react-dom', 'whatwg-fetch'],
  },
  output:{
    path: __dirname+"/static",
    filename: 'app.bundle.js'
  },
  plugins:[
    new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js' })
  ],
  module:{
    loaders: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        }
      },
    ]
  }
};
