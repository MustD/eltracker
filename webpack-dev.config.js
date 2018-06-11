const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    target: "electron-main",
    mode: "development",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'ElTracker',
            filename: 'index.html',
            template: 'src/index.html',
        })
    ]
};
