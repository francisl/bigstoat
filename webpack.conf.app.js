var webpack = require('webpack');
var path = require('path');
// var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
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
				include: [path.join(__dirname, '/src/app'),
                          path.join(__dirname, 'node_modules/semantic-ui-css')]
			},
			{ // loader for all scss, sass, css files excluding foundation
				test: /\.(s?css|sass)$/,
				include: path.join(__dirname, 'styles'),
				loader: 'style!css!autoprefixer?browsers=last 3 versions!sass'
			},
			{	test: /\.css$/,
				include: path.join(__dirname, 'node_modules/semantic-ui-css'),
				loader: "style-loader!css-loader"
			},
			{ test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "url-loader?limit=10000&mimetype=application/font-woff",
				include: [path.join(__dirname, 'node_modules/semantic-ui-css')]},
			{ test: /\.(png)?$/,
				loader: "file-loader",
				include: [path.join(__dirname, 'node_modules/semantic-ui-css')]},
			{ test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: "file-loader",
				include: [path.join(__dirname, 'node_modules/semantic-ui-css')]}
		]
	},
	plugins: [
		// new webpack.optimize.UglifyJsPlugin()
        new webpack.IgnorePlugin(new RegExp("^(electron)$")),
		new webpack.ProvidePlugin({ React: 'react' })
	],
    // target: "atom"
};
