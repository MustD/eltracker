const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

var BUILD_DIR = path.resolve(__dirname, 'build');
var APP_DIR = path.resolve(__dirname, 'src');


module.exports = {
    entry: APP_DIR + '/main.js',
    target: "electron-main",
    mode: "development",
    output: {
        filename: 'bundle.js',
        path: BUILD_DIR
    },
    node: {
        __dirname: false,
        __filename: false
    },
    module: {
        rules: [
            {
                test: /\.js/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.png/,
                use: {
                    loader: "file-loader"
                }
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'ElTracker',
            filename: 'index.html',
            template: APP_DIR + '/index.html',
            inject: false,
        })
    ]
};
