const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'src');


const electronMain = {
    entry: APP_DIR + '/main.js',
    target: "electron-main",
    mode: "development",
    output: {
        filename: 'main.js',
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
                    loader: "file-loader",
                    options: {
                        name: '[hash].[ext]',
                    },
                }
            },
        ]
    },
};
const electronRenderer = {
    entry: APP_DIR + '/renderer.js',
    target: "electron-renderer",
    mode: "development",
    output: {
        filename: 'renderer.js',
        path: BUILD_DIR
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
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: APP_DIR + '/index.html',
            inject: true,
        })
    ]
};

module.exports = [electronMain, electronRenderer];
