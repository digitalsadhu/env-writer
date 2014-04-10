'use strict';

var writable    = require('stream').Writable
  , ws          = writable({ objectMode: true })

ws._write = function (chunk, enc, next) {
    process.env[chunk.key] = chunk.value
    next()
};

module.exports = ws