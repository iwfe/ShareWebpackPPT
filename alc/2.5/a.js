var bar = require('./b').bar;

function foo() {
    console.log('foo');
    bar();
    console.log('执行完毕');
}
exports.foo = foo
foo();
