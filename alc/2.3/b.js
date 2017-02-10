var foo = require('./a').foo;

function bar() {
    console.log('bar');
    if (Math.random() > 0.5) {
        foo();
    }
}

exports.bar = bar
