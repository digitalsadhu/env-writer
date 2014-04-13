[![Build Status](https://travis-ci.org/digitalsadhu/env-writer.svg?branch=master)](https://travis-ci.org/digitalsadhu/env-writer)

env-writer
==========

Streaming process.env writer

Simple flexible env writer.

Accepts arrays and objects as parameters to write
to process.env


Require the module:

```js
var env = require('env-writer')()
```

Write a single value (all three of the following are valid):

```js
env.write({
    key: 'ANIMAL',
    value: 'cat'
});

//or
env.write({'BEER': 'Tui'})

//or
env.write(['DESSERT', 'Pavlova'])
```

Multiple values with a single write:

```js
env.write({
  'BEER1': 'Tui',
  'BEER2': 'DB',
  'BEER3': 'Gissie Green'
});

//or
env.write([
  ['DESSERT1', 'Cheesecake'],
  ['DESSERT2', 'Chocolate cake'],
  ['DESSERT3', 'Fudge with ice cream'],
]);
```

env-writer will also accept json strings. So any of the above could be achieved with something like:

```js
env.write('["DOG:"Mr Bones"]')
```

env-writter also handles buffers so you can pipe valid json from stdin or any other source.

```js
process.stdin.pipe(env)
```
