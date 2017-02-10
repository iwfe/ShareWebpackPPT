import entry_common from './entry_common'
import entry_main from './entry_main'
import entry_static from './entry_static'
import alias from './alias'
import provide from './provide'
import theme from './theme'
import upload from './upload'

console.warn = () => {} // 关闭postcss烦人的警告

export {
    entry_common,
    entry_main,
    entry_static,
    alias,
    provide,
    theme,

    upload
}
