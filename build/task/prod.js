/**
 * 产品
 *
 * 该模式下代码会进行压缩打ZIP包上传
 */
import webpack from 'webpack'

import webpackConfig from '../webpack.config.prod'
import upload from './upload'

webpack(webpackConfig, function (err, stats) {
    if (err) {
        throw err
    }
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    console.log(stats.toString({
        colors: true,
        hash: false,
        version: true,
        timings: true,
        assets: true,
        chunks: false,
        children: false
    }))

    if (stats.hasErrors() || stats.hasWarnings()) {
        return
    }

    upload().then((result) => {
        // console.log(`ok`, result)
    }).catch((err) => {
        console.error(`fail`, err)
    })
})
