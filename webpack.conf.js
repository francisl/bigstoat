var webpack = require('webpack');
var path = require('path');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	cache: true,
	entry: [
		'./src/electron.js'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'electron.bundle.js'
	},
	devtool: 'source-map',// 'source-map',
	debug: true,
	resolve: {
		extensions: ['', '.webpack.js', '.web.js', '.js']
	},
	node: {
		process: false,
		__dirname: false
	},
	module: {
		loaders: [
			{	test: /\.js?$/,
				exclude: /(node_modules)/,
				loaders: [],
				include: [path.join(__dirname, '/src')]
			}
		]
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin()
	],

	externals: [
		(function () {
			var IGNORES = ['electron', 'path', 'process', 'fs', 'os'];
			return function (context, request, callback) {
				if (IGNORES.indexOf(request) >= 0) {
					return callback(null, "require('" + request + "')");
				}
				return callback();
			};
		})()
	]
};
