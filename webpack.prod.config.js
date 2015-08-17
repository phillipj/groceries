module.exports = {
  entry: ['./browser/main.js'],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: './public/js',
    filename: 'bundle-[hash].js'
  },
  module: {
	  loaders: [
	    {test: /\.jsx?$/, loaders: ['babel-loader?experimental'], exclude: /node_modules/ }
	  ]
  }
};