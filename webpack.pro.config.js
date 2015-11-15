var webpack = require("webpack");
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");
var config = {
    entry: {
        app: './app/index.js',
        vendors: ["react", "node-fetch", "marked", "react-router"]
    },
    output: {
        path: "./bundle",
        filename: 'bundle.[hash].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
            include: path.join(__dirname, 'app'),
            loaders: ["babel"] // 加载模块 "babel" 是 "babel-loader" 的缩写
        },{
            test: /\.css$/,
            loader: "css!style"
        },{
            test: /\.less$/,
            loader: 'style!css!less'
        },{
            test: /\.(png|jpg)$/,
            loader: 'url?limit=25000'
        },{
            test: /\.json$/,
            loader: 'json'
        }]

    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
        new HtmlWebpackPlugin({
            title: 'Poker Blog',
            template: './app/www/index.html',
            inject: 'body'
        }),
        new webpack.optimize.UglifyJsPlugin()
    ]


};

module.exports = config;