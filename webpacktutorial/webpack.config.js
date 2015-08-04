module.exports = {
    entry: "./entry.js",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.coffee$/, loader: 'coffe-loader' },
            { test: /\.js$/, loader: 'babel-loader' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.json', '.coffee']
    }
};