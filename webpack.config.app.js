var webpack = require('webpack');
var path = require('path');
// var webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");

var options = {
	cache: false,
	entry: [
		'./src/app/app.jsx'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'app.bundle.js',
		publicPath: path.join(__dirname, 'dist/')
	},
	devtool: 'source-map', // 'source-map',
	debug: true,
	resolve: {
		extensions: ['', '.webpack.js', '.web.js','.js']
	},
	module: {
		loaders: [
			{	test: /\.(js|jsx)?$/,
				exclude: /(node_modules)/,
				loaders: ['babel'],
				include: path.join(__dirname, '/src/app')
			},
			{ // loader for all scss, sass, css files excluding foundation
				test: /\.(s?css|sass)$/,
				include: path.join(__dirname, 'styles'),
				loader: 'style!css!autoprefixer?browsers=last 3 versions!sass'
			},
			{	test: /\.css$/,
				include: path.join(__dirname, 'semantic/dist'),
				loader: "style-loader!css-loader"
			},
			{ test: /\.(png|woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'url-loader?limit=100000' }
		]
	},
	plugins: [
		new webpack.ProvidePlugin({ React: 'react' })
	]
};


options.target = 'electron-renderer'

module.exports = options;