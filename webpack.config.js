var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require("path");
var config = {
    entry: ['webpack/hot/dev-server', './app/index.js'],
    output: {
        path: path.resolve(__dirname, './bundle'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/, // 用正则来匹配文件路径，这段意思是匹配 js 或者 jsx
            include: path.join(__dirname, 'app'),
            loaders: ["react-hot", "babel"] // 加载模块 "babel" 是 "babel-loader" 的缩写
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
        new HtmlWebpackPlugin({
            title: 'Poker Blog',
            template: './app/www/index.html',
            inject: 'body'
        })

    ],
    node: {
        net: 'empty',
        tls: 'empty',
        dns : 'empty'
    }

};

module.exports = config;