var Webpack = require('webpack');
var path = require('path');
var appPath = path.resolve(__dirname, 'app');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');
var buildPath = path.resolve(__dirname, 'public', 'build');
var mainPath = path.resolve(appPath, 'main.js');

var config = {
    context: __dirname,
    devtool: 'eval-source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3001',
        'webpack/hot/dev-server',
        mainPath
    ],
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/build/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel',
            exclude: [nodeModulesPath]
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }]
    },
    plugins: [new Webpack.HotModuleReplacementPlugin()]
};

module.exports = config;