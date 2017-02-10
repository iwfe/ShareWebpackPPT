/**
 * 主题配置
 */

import lessToJs from 'less-vars-to-js'
import fs from 'fs'

const themeLess = fs.readFileSync(`${__dirname}/theme.less`, 'utf8');
const theme = lessToJs(themeLess)

console.log(theme)

export default theme
