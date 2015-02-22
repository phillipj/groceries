module.exports = {
  entry: ['./browser/main.js'],
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