var a = 'aaa';

setTimeout(() => a = 'bbb', 1000);

// exports.a = a;
export { a };
