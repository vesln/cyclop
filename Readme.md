[![Build Status](https://secure.travis-ci.org/vesln/cyclop.png)](http://travis-ci.org/vesln/cyclop)

# Important Notice

I'm no longer actively maintaining this project. If you are interested supporting it - [ping me on twitter](https://twitter.com/vesln).
The only thing that I will ask you is to not change the API drastically. If you are planning on doing that - better start a brand new project.

If you want me to transfer you only the name on npm, I'd be happy to only if the project **does not have any downloads on npm lately**. In case it's being
downloaded, there are people that depend on it and might step up and start maintaining, so I will not transfer it to you, regardless if you want to release
a new major version etc.

If you have any other questions, let me know.

Thanks!

Veselin

# Cyclop

Cyclop is a simple control flow library. Think highly focused async. It does
only one thing, but it does it well. Simplicity is the key to brilliance.

## Synopsis

### Simple

```js
cyclop()
  .push(function(next) {

    // do async stuff
    next('awesome');

  }).push(function(next, text) {

    console.log(text) // => 'awesome'
    next('even', 'more', 'args');

  }).run(function(st, ri, ng) {

    console.log(st) // => 'even'
    console.log(ri) // => 'more'
    console.log(ng) // => 'args'

  });
```

### Readable

```js
var queue = cyclop();

queue.step('Create project', function(next) {
  next('Project');
});

queue.step('Create user', function(next, project) {
  next(project, 'User');
});

queue.step('Add associations', function(next, project, user) {
  next(project, user, 'Associations');
});

queue
  .step('Create project')
  .step('Create user')
  .step('Add associations')
  .end(function(project, user, associations) {
    console.log(project); // => 'Project'
    console.log(user); // => 'User'
    console.log(associations); // => 'Associations'
  });

```


## Installation

Node.js:

```
$ npm install cyclop
```

Browser:

Download `cyclop.min.js`, it's all you need.

```html
<script src="cyclop.min.js"></script>
```

## Tests

Node.js:

```
$ make test
```

Browser:

- Clone the repository
- Open `test/browser/index.html` in your favourite browser

## License

(The MIT License)

Copyright (c) 2012 Veselin Todorov <hi@vesln.com>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
