const path =require('path');
module.exports = {
	entry: './src/reactive.js',
	output: {
		path: path.resolve(__dirname,'dist'),
		filename:'app.bundle.js'
	},
	module: {
		loaders: [{
			exclude: '/node_modules/',
			loader: 'babel-loader',
			query: {
				presets: ['es2015']
			}
		}]
	}
}