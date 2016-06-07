// -- awesome webpack... :)
var webpack = require('webpack');

// -- import some fs util libs
var path = require('path');

module.exports = {
	// entry point
	entry: {
		GlobEntryPlugin: 'GlobEntryPlugin'
	},

	// define project context (sources)
	context: path.join(__dirname, 'src'),

	// output definition
	output: {
		filename: '[name].js',
    library: 'GlobEntryPlugin',
    libraryTarget: 'commonjs2',
		path: path.join(__dirname, 'dist')
	},

  // this module/lib is to be executed
  // in a node.js environment
  target: 'node',

  // tell webpack not to include
  // this modules into be bundle
  // (they are external dependencies)
  externals: {
    'glob': true,
    'webpack/lib/MultiEntryPlugin': true,
    'webpack/lib/SingleEntryPlugin': true
  },

	// setup plugins
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			mangle: false,
			comments: false,
			sourceMap: false
		})
	],

	// loaders definitions
	module: {
		loaders: [
			// transpiles ES6 into vanilla ES5 code
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loaders: [ 'ng-annotate', 'babel?stage=1' ]
			}
	  ]
	},

	// resolver definitions
	resolve: {
		root: path.join(__dirname, 'src'),
		modulesDirectories: ['node_modules']
	}
}
