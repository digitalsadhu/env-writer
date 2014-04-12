'use strict';

var through = require('through')
  , util    = require('util')

var getFormat = function getFormat(data) {
  if (util.isArray(data)) {
    if (util.isArray(data[0]))
      return 'multi-array'
    else
      return 'array'
  }
  if (typeof data === 'object') {
    if (data.key && data.value)
      return 'keyed-object';
    else
      return 'object'
  }
  return false
}

var setEnv = function setEnv(data, format) {

  if (format === 'keyed-object') {
    process.env[data.key] = data.value
    return true
  }

  if (format === 'object') {
    var keys = Object.keys(data)
    keys.forEach(function (key) {
      process.env[key] = data[key]
    })
  }

  if (format === 'multi-array') {
    data.forEach(function (envArr) {
      process.env[envArr[0]] = envArr[1]
    })
    return true
  }

  if (format === 'array') {
    process.env[data[0]] = data[1]
    return true
  }

  return false
}

var write = function write(data) {

  if (data instanceof Buffer)
    data = data.toString('utf8')

  if (typeof data === 'string')
    data = JSON.parse(data)

  setEnv(data, getFormat(data))
  this.emit('data', data)
}

var end = function end () {
  this.emit('end')
}

module.exports = function () {
  return through(write, end)
}
