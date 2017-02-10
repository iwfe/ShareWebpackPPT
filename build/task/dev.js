/**
 * 开发
 *
 * 一般开发调试都在chrome浏览器下，有热刷新功能
 * 但是，开启hot-replacement会导致打包的代码在IE浏览器上运行会出现问题，但代码其实是没有问题的
 * 为了方便开发调试时测试IE兼容性，在devnohot时不提供热刷新功能
 */
import express from 'express'
import ip from 'ip'
import chalk from 'chalk'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import httpProxyMiddleware from 'http-proxy-middleware'
import serverMiddleware from '../server.middleware'

import config from '../../config'
import webpackConfigDev from '../webpack.config.dev'
import webpackConfigProd from '../webpack.config.prod'

const nohot = process.argv.includes('nohot') // 是否在测试IE兼容性
let webpackConfig = webpackConfigDev

if (nohot) { // 测试IE兼容性用产品环境的配置，并移除压缩功能
    webpackConfig = webpackConfigProd
    webpackConfig.plugins.splice(webpackConfig.plugins.findIndex((p) => p instanceof webpack.optimize.UglifyJsPlugin), 1)
} else {
    const hotclient = ['webpack-hot-middleware/client?noInfo=true&reload=true']
    const entry = webpackConfig.entry
    Object.keys(entry).forEach((name) => {
        const value = entry[name]
        if (Array.isArray(value)) {
            value.unshift(...hotclient)
        } else {
            entry[name] = [...hotclient, value]
        }
    })
    // console.log(entry)
}

const webpackCompiler = webpack(webpackConfig)
const devMiddleware = webpackDevMiddleware(webpackCompiler, {
    serverSideRender: true,
    publicPath: webpackCompiler.options.output.publicPath,
    noInfo: true,
    quiet: false,
    stats: {
        colors: true,
        hash: false,
        version: false,
        timings: false,
        assets: false,
        chunks: false,
        children: false
    }
})
const hotMiddleware = webpackHotMiddleware(webpackCompiler, {
    log: false
})

const devServer = express()

devServer.use(devMiddleware)
devServer.use(hotMiddleware)
devServer.use(serverMiddleware)
// 使用Server-Middleware（简单起见，我暂时先这样处理了，以后有时间再换更好的方案）
devServer.use('/global', express.static('alc/global'))

// 对于IE兼容性测试时的API跨域问题，使用该代理解决
// 代理API，可以在config/mine.js中修改成你想要的代理目标
devServer.use(httpProxyMiddleware('**/*.action', {
    logLevel: 'silent',
    target: config.proxyTarget,
    changeOrigin: true
}))
// 代理CMS配置的静态资源，防止403 Forbidden
devServer.use(httpProxyMiddleware('/directwaterbucket', {
    logLevel: 'silent',
    target: 'https://files.iwjw.com',
    changeOrigin: true,
    headers: {
        Referer: 'https://files.iwjw.com'
    }
}))

devServer.listen(config.devServerPort, function () {
    process.stdout.clearLine()
    process.stdout.cursorTo(0)
    console.log(`dev${nohot&&'nohot'||''}-server at ${chalk.magenta.underline(`http://${ip.address()}:${this.address().port}/`)}`)
})
