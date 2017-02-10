/**
 * 别名
 */
const aliasDev = {
    handlebars: '../node_modules/handlebars/dist/handlebars.min.js', // 直接在provide中引用handlebars有问题

    utils: 'global/utils',
    logger:'global/logger',
    iwlc: 'global/iwlc',
    login: 'global/login',


    pager: 'global/components/pager',           // React分页器
    dialog: 'global/components/dialog',       // React对话框
    slick: 'global/components/slick',           // React轮播
    visibly: 'global/components/visibly',        // 跨浏览器网页可见性

    'aaaaa': 'test/a.js'
}

// for:IE8。开发环境下不能使用react.min.js和react-dom.min.js，因为react-hot-loader依赖会报错
const aliasProd = Object.assign({}, aliasDev, {
    react: '../node_modules/react/dist/react.min.js',
    'react-dom': '../node_modules/react-dom/dist/react-dom.min.js'
})


addContext(aliasDev)
addContext(aliasProd)

// console.log(aliasDev)

export default {
    aliasDev,
    aliasProd
}

/**
 * 为别名的路径添加context前缀
 */
function addContext(alias) {
    const context = `${process.cwd()}/alc/`
    Object.keys(alias).forEach((name) => alias[name] = context + alias[name])
}
