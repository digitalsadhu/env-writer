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

var set = function set(key, value, overwrite) {
  if (process.env[key] && overwrite === false)
    return
  process.env[key] = value
}

var setEnv = function setEnv(data, format, overwrite) {

  if (format === 'keyed-object') {
    set(data.key, data.value, overwrite)
    return true
  }

  if (format === 'object') {
    var keys = Object.keys(data)
    keys.forEach(function (key) {
      set(key, data[key], overwrite)
    })
  }

  if (format === 'multi-array') {
    data.forEach(function (envArr) {
      set(envArr[0], envArr[1], overwrite)
    })
    return true
  }

  if (format === 'array') {
    set(data[0], data[1], overwrite)
    return true
  }

  return false
}

module.exports = function (overwrite) {

  if (typeof overwrite === 'undefined')
    overwrite = false

  var write = function write(data) {

    if (data instanceof Buffer)
      data = data.toString('utf8')

    if (typeof data === 'string')
      data = JSON.parse(data)

    setEnv(data, getFormat(data), overwrite)
    this.emit('data', data)
  }

  var end = function end () {
    this.emit('end')
  }

  return through(write, end)
}
