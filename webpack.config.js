const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

let plugins = [
	new webpack.ProvidePlugin({
		'$': 'jquery',
		'jQuery': 'jquery'
	}),
	new ExtractTextPlugin({
		filename: 'css/styles.css',
		disable: false,
		allChunks: true
	}),
	new HtmlWebpackPlugin({
		template: './src/index.html'
	}),
];

if (isProduction) {
	plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
	target: 'web',
	devtool: isProduction ? 'source-map' : 'eval-source-map',
	entry: [
		'./src/app.jsx'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		publicPath: '',
		filename: 'bundle.js'
	},

	plugins,

	devServer: {
		inline: true,
		contentBase: './dist',
		port: 3000,
		open: true
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						babelrc: false,
						presets: [
							'latest',
							'stage-0',
							'react'
						]
					}
				}]
			},
			{
				test:/\.(scss|css)$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					publicPath: '../',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: isProduction ? true : false
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [require('autoprefixer')]
							}
						},
						'resolve-url-loader',
						'sass-loader?sourceMap',
						'import-glob-loader'
					]
				})
			},
			{
				test: /\.(gif|png|jpe?g|svg)$/i,
				exclude: [/fonts/, /node_modules/],
				use: [
					'url-loader?limit=10000&name=img/[name].[ext]',
					{
						loader: 'image-webpack-loader',
						query: {
							progressive: true,
							optipng: {
								optimizationLevel: 7
							},
							gifsicle: {
								interlaced: false
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							}
						}
					}
				]
			},
			{
				test: /\.(woff|woff2|eot|ttf|svg)$/,
				exclude: [/img/, /node_modules/],
				use: ['file-loader?name=fonts/[name].[ext]']
			}
		] 
	}
}