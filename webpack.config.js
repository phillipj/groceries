const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8090',
    'webpack/hot/only-dev-server',
    './browser/main.js'
  ],
  output: {
    path: './public/js',
    filename: 'bundle.js'
  },
  module: {
	  loaders: [
	    {test: /\.jsx?$/, loaders: ['react-hot', 'babel-loader?experimental'], exclude: /node_modules/ }
	  ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
};