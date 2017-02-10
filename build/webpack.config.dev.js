import webpack from 'webpack'
import ProgressBarPlugin from 'progress-bar-webpack-plugin'
import WebpackNotifierPlugin from 'webpack-build-notifier'
// import HappyPack from 'happypack'

import chalk from 'chalk'
import autoprefixer from 'autoprefixer' // console.log(autoprefixer({ browsers: ['> 5%', 'last 2 versions', 'IE >= 8'] }).info());
// import postcssSprites from 'postcss-sprites'
// import oldie from 'oldie'
import cssgrace from 'cssgrace'

import { entry_common, entry_main, entry_static, alias, provide, theme } from './config'

const entry = Object.assign({}, entry_common, entry_main, entry_static)

// const happyThreadPool = HappyPack.ThreadPool({ size: 2 });

export default {
    context: `${process.cwd()}/alc`,
    entry: entry,
    // devtool: false,
    devtool: 'cheap-module-eval-source-map',
    // devtool: 'source-map',
    output: {
        path: `${process.cwd()}/dist`,
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[id].[chunkhash].js' //非入口文件的命名规则
    },
    resolve: {
        extensions: ['', '.js', 'jsx'],
        alias: alias.aliasDev
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ['react-hot', 'babel?cacheDirectory=true']
            // loaders: ['happypack/loader?id=js']
        }, {
            test: /\.css$/,
            // loaders: ['style', 'css?sourceMap', 'postcss'],
            loaders: ['style', 'css', 'postcss']
        }, {
            test: /\.less$/,
            /*loaders: ['style', 'css?sourceMap', 'postcss', 'less?' + JSON.stringify({
                sourceMap: true,
                modifyVars: theme
            })]*/
            loaders: ['style', 'css', 'postcss', 'less?' + JSON.stringify({
                modifyVars: theme
            })]
        }, {
            test: /\.scss$/,
            // loaders: ['style', 'css?sourceMap', 'postcss', 'sass?sourceMap']
            loaders: ['style', 'css', 'postcss', 'sass']
            // loaders: ['happypack/loader?id=scss']
        }, {
            test: /\.(png|jpg|gif|woff|woff2|ttf|eot|svg|swf)$/,
            loader: 'file',
            query: {
                name: '[name]_[sha512:hash:base64:7].[ext]',
                publicPath: ''
            }
        }]/*,
        postLoaders: [{ // 开发环境暂时禁用
            test: /\.jsx?$/,
            loaders: ['es3ify']
        }]*/
    },
    postcss: [
        autoprefixer({
            browsers: ['> 5%', 'last 2 versions', 'IE >= 8']
        }),
        // https://github.com/cssdream/cssgrace
        cssgrace
    ],
    plugins: [
        /*new HappyPack({
            id: 'js',
            threadPool: happyThreadPool,
            loaders: ['react-hot', 'babel']
        }),
        new HappyPack({
            id: 'scss',
            threadPool: happyThreadPool,
            loaders: ['style', 'css', 'postcss', 'sass']
        }),*/

        new ProgressBarPlugin({
            format: `${chalk.bold('[:bar]')} ${chalk.cyan.bold(':percent (:elapseds)')} :msg`,
            clear: true,
            summary: false,
            summaryContent: false,
            customSummary (buildTime) {
                process.stdout.write(`=====${chalk.green.bold(`[ built in ${buildTime} ]`)}=====`)
            }
        }),
        // https://github.com/RoccoC/webpack-build-notifier
        new WebpackNotifierPlugin({
            title: 'PC爱理财开发服务器',
            logo: 'alc/global/img/alc_logo.jpg',
            successSound: 'Submarine',
            failureSound: 'Glass',
            suppressSuccess: true
        }),

        new webpack.ProvidePlugin(provide),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"'
            },
            __DEV__: true,
            __PROD__: false
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            minChunks: Infinity
        })
    ]
}
