import webpack from 'webpack'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-build-notifier'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ZipWebpackPlugin from 'zip-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import chalk from 'chalk'
import autoprefixer from 'autoprefixer'
import cssgrace from 'cssgrace'
import postcssClean from 'postcss-clean'

import { entry_common, entry_main, entry_static, alias, provide, theme } from './config'

const entry = Object.assign({}, entry_common, entry_main, entry_static)

export default {
    context: `${process.cwd()}/alc`,
    watch: true,
    entry,
    devtool: false,
    // devtool: 'source-map',
    output: {
        path: `${process.cwd()}/dist`,
        publicPath: '',
        filename: '[name].js',
        // chunkFilename: '[id].[chunkhash].js' //非入口文件的命名规则
        chunkFilename: '[name].js' //非入口文件的命名规则
    },
    resolve: {
        extensions: ['', '.js', 'jsx'],
        alias: alias.aliasProd
    },
    module: {
        noParse: [/node_modules\/react\/dist\/react\.min\.js/], // for IE8
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['babel']
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract(['css', 'postcss'])
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract(['css', 'postcss', 'less?' + JSON.stringify({
                modifyVars: theme
            })])
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(['css', 'postcss', 'sass'])
        }, {
            test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
            loader: 'file',
            query: {
                name: '[name]_[sha512:hash:base64:7].[ext]',
                publicPath: ''
            }
        }],
        /*postLoaders: [{
            test: /\.jsx?$/,
            loaders: ['es3ify']
        }]*/
    },
    postcss: [
        autoprefixer({
            browsers: ['> 5%', 'last 2 versions', 'IE >= 8']
        }),
        cssgrace,
        postcssClean({
            compatibility: 'ie8'
        })
    ],
    plugins: [
        new ProgressBarPlugin({
            format: `${chalk.bold('[:bar]')} ${chalk.cyan.bold(':percent (:elapseds)')} :msg`,
            clear: true,
            summary: false,
            summaryContent: false,
            customSummary (buildTime) {
                process.stdout.write(`=====${chalk.green.bold(`[ built in ${buildTime} ]`)}=====`)
            }
        }),
        new WebpackNotifierPlugin({
            title: '打包完成',
            logo: 'alc/global/img/alc_logo.jpg',
            successSound: 'Submarine',
            failureSound: 'Glass',
            suppressSuccess: true
        }),

        new CleanWebpackPlugin(['dist', 'zip'], {
            root: `${process.cwd()}`
        }),
        // https://github.com/kevlened/copy-webpack-plugin
        /*new CopyWebpackPlugin([{
            context: 'global/module',
            from: 'es5-shim-sham.js', //relative (to CopyWebpackPlugin context option)
            to: '' //relative (to Webpack output path)
        }]),*/
        // https://github.com/erikdesjardins/zip-webpack-plugin
        /*new ZipWebpackPlugin({
            path: '../zip', //relative (to Webpack output path)
            filename: 'iwjw-pc-alc.zip'
        }),*/

        new webpack.ProvidePlugin(provide),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            },
            __DEV__: false,
            __PROD__: true
        }),
        // https://github.com/mishoo/UglifyJS2/blob/master/README.md
        /*new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: false,
                drop_console: true
            },
            output: {
                // for IE8, keep keyword default -> "default"
                keep_quoted_props: true,
                quote_style: 3,
                comments: false
            },
            sourceMap: false
        }),*/
        new webpack.optimize.OccurrenceOrderPlugin(),
        // https://github.com/webpack/webpack/issues/959#issuecomment-199835414
        new webpack.optimize.DedupePlugin(),

        /*new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: Infinity
        }),*/
        new ExtractTextPlugin('[name].css', {
            allChunks: true
        }),

        new HtmlWebpackPlugin()
    ]
}
