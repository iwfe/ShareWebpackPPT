1.统一编辑器配置。参考：http://EditorConfig.org

2.style-loader最新版本使用link标签加载页面会闪烁，并且图片路径需要使用绝对路径
    可以用下vue-style-loader，但是图片在css检查其中不能预览
    我在开发环境中禁用了sourceMap解决这些问题，反正sourceMap用处不太大
    https://github.com/webpack/style-loader

3.emmet支持jsx
    https://gist.github.com/jerryshew/3659091b82af3aae49df

4.IE8的坑
    es3ify解决，http://www.tuicool.com/articles/qyaqquU
    es3ify-loader不支持sourceMap改用es3ify-webpack-plugin
    es3ify-webpack-plugin太耗性能，并且经常会退出nodejs进程，所以改dev模式下不用es3ify-loader
    UglifyJsPlugin默认会将es3ify对关键词属性key加的引号去掉，使用keep_quoted_props: true,
    UglifyJsPlugin混淆react源码在IE8上会报错，所以alias中直接指定react和react-dom用min.js，但webpack会报警告说react不是源码，在noParse中排除对react的解析就解决了
    因为dev环境用了react-hot-loader，使用react.min.js会报错，所以开发环境仍然使用react源码