var envWriter = require('./index.js')

envWriter.write({
    key: 'ENV',
    value: 'development'
});

envWriter.write({
    key: 'USER',
    value: 'bob'
});

envWriter.write({
    key: 'PASS',
    value: 'test'
});

console.log(process.env.ENV)
console.log(process.env.USER)
console.log(process.env.PASS)