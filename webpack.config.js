var webpack = require("webpack");
var path = require("path");
var config = {
    entry: {
        app: ['webpack/hot/dev-server'],
        homepage: "./app/homepage/index.js",
        postpage: "./app/postpage/index.js",
        //vendors: ["react"]
    },
    output: {
        path: "./bundle",
        filename: '[name].js'
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
        }]

    },
    /*
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js')
    ]

    */

};

module.exports = config;