/**
 * 监听
 *
 * 生成未压缩的代码和sourceMap到dist目录
 */
import webpack from 'webpack'

import ExtractTextPlugin from 'extract-text-webpack-plugin'
import autoprefixer from 'autoprefixer'
import cssgrace from 'cssgrace'
import ZipWebpackPlugin from 'zip-webpack-plugin'

import webpackConfigProd from '../webpack.config.prod'

import { theme } from '../config'

// remove webpack.optimize.UglifyJsPlugin
// webpackConfigProd.plugins.splice(webpackConfigProd.plugins.findIndex((p) => p instanceof webpack.optimize.UglifyJsPlugin), 1)
// webpackConfigProd.plugins.splice(webpackConfigProd.plugins.findIndex((p) => p instanceof ZipWebpackPlugin), 1)

// add sourceMap
// const webpackConfig = Object.assign(webpackConfigProd, {
//     watch: true,
//     devtool: 'source-map',
//     module: {
//         noParse: [/node_modules\/react\/dist\/react\.min\.js/], // for IE8
//         loaders: [{
//             test: /\.jsx?$/,
//             exclude: /node_modules/,
//             loaders: ['babel']
//         }, {
//             test: /\.css$/,
//             loader: ExtractTextPlugin.extract(['css?sourceMap', 'postcss'])
//         }, {
//             test: /\.less$/,
//             loader: ExtractTextPlugin.extract(['css?sourceMap', 'postcss', 'less?' + JSON.stringify({
//                 sourceMap: true,
//                 modifyVars: theme
//             })])
//         }, {
//             test: /\.scss$/,
//             loader: ExtractTextPlugin.extract(['css?sourceMap', 'postcss', 'sass?sourceMap'])
//         }, {
//             test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
//             loader: 'file',
//             query: {
//                 name: '[name]_[sha512:hash:base64:7].[ext]',
//                 publicPath: ''
//             }
//         }]
//     },
//     postcss: [
//         autoprefixer({
//             browsers: ['> 5%', 'last 2 versions', 'IE >= 8']
//         }),
//         cssgrace
//     ]
// })

webpack(webpackConfigProd, function(err, stats) {
    if (err) {
        return console.error(err)
    }
    const jsonStats = stats.toJson()
    if(jsonStats.errors.length > 0) {
        return console.log(jsonStats.errors.toString())
    }
    if(jsonStats.warnings.length > 0) {
        return console.log(jsonStats.warnings.toString())
    }
})
