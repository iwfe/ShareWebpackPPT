require.ensure(['./a'], function(require) {
    let a = require('./a');
    console.log(a);
});
