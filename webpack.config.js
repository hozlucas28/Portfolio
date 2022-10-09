const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');

module.exports = {
	mode: 'production',
	entry: './src/index.ts',

	devServer: {
		watchFiles: ['src/**/*']
	},

	output: {
		clean: true,
		filename: 'bundle.[fullhash].js',
		path: path.resolve(__dirname, 'public')
	},

	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
				options: { sources: true }
			},
			{
				test: /\.css$/i,
				include: path.resolve(__dirname, 'src'),
				use: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.(png|svg|jpg|jpeg|ico|gif)$/i,
				type: 'asset/resource',
				generator: { filename: 'img/[name].[hash][ext]' }
			},
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-typescript']
					}
				}
			}
		]
	},

	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},

	plugins: [
		new HtmlWebpackPlugin({
			minify: true,
			template: './src/index.html',
			scriptLoading: 'blocking',
			filename: 'index.html'
		}),
		new HtmlWebpackPlugin({
			minify: true,
			template: './src/test/index.html',
			scriptLoading: 'blocking',
			filename: './test/index.html'
		})
	],

	optimization: {
		minimize: true,
		minimizer: [new TerserPlugin(), new HtmlMinimizerPlugin()]
	}
};
