// var a = require('./a');
import { a } from './a';

console.log('main中a--->', a);
setTimeout(() => console.log('2秒后main中a--->', a), 2000);
