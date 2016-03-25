var webpack = require('webpack');
var path = require('path');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	cache: true,
	entry: [
		'./src/app.jsx'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.bundle.js',
		publicPath: '/static/'
	},
	devtool: 'source-map',// 'source-map',
	debug: true,
	resolve: {
		extensions: ['', '.webpack.js', '.web.js','.js']
	},
	module: {
		loaders: [
			{	test: /\.(js|jsx)?$/,
				exclude: /(node_modules)/,
				loaders: ['babel'],
				include: [path.join(__dirname, '/src')]
			},
			{ // loader for all scss, sass, css files excluding foundation
				test: /\.(s?css|sass)$/,
				include: path.join(__dirname, 'styles'),
				loader: 'style!css!autoprefixer?browsers=last 3 versions!sass'
			},
			{	test: /\.css$/,
				include: path.join(__dirname, 'styles'),
				loader: "style-loader!css-loader" }
		]
	},
	plugins: [
		//new webpack.optimize.UglifyJsPlugin()
	]
};
