!function (name, context, definition) {
  if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
    module.exports = definition();
  } else if (typeof define === 'function' && typeof define.amd  === 'object') {
    define(function () {
      return definition();
    });
  } else {
    context[name] = definition();
  }
}('cyclop', this, function () {

    function require(p) {
      var path = require.resolve(p)
        , mod = require.modules[path];
      if (!mod) throw new Error('failed to require "' + p + '"');
      if (!mod.exports) {
        mod.exports = {};
        mod.call(mod.exports, mod, mod.exports, require.relative(path));
      }
      return mod.exports;
    }

    require.modules = {};

    require.resolve = function (path) {
      var orig = path
        , reg = path + '.js'
        , index = path + '/index.js';
      return require.modules[reg] && reg
        || require.modules[index] && index
        || orig;
    };

    require.register = function (path, fn) {
      require.modules[path] = fn;
    };

    require.relative = function (parent) {
      return function(p){
        if ('.' != p.charAt(0)) return require(p);

        var path = parent.split('/')
          , segs = p.split('/');
        path.pop();

        for (var i = 0; i < segs.length; i++) {
          var seg = segs[i];
          if ('..' == seg) path.pop();
          else if ('.' != seg) path.push(seg);
        }

        return require(path.join('/'));
      };
    };

    require.alias = function (from, to) {
      var fn = require.modules[from];
      require.modules[to] = fn;
    };


    require.register("cyclop.js", function(module, exports, require){

      /**
       * Cyclop constructor.
       *
       * @constructor
       */

      function Cyclop() {
        this.batch = [];
      };

      /**
       * Add a function to the batch.
       *
       * @param {Function} fn
       * @api public
       */

      Cyclop.prototype.push = function(fn) {
        this.batch.push(fn);
        return this;
      };

      /**
       * Run the batch.
       *
       * @param {Function} function [optional]
       * @api public
       */

      Cyclop.prototype.run = function(fn) {
        if (fn) this.push(fn);
        this.cycle();
      };

      /**
       * Call the added functions.
       *
       * @api private
       */

      Cyclop.prototype.cycle = function() {
        var fn = this.batch.shift()
        var args = slice(arguments);
        if (this.batch.length > 0) args.unshift(this.cycle.bind(this));
        fn.apply(fn, args);
      };

      /*!
       * Slice.
       *
       * @param {Arguments} args
       * @returns {Array}
       */

      function slice(args) {
        return Array.prototype.slice.call(args);
      };

      /*!
       * Create a new `Cyclop`.
       */

      module.exports = function() {
        return new Cyclop;
      };

      /*!
       * Expose `Cyclop`.
       */

      module.exports.Cyclop = Cyclop;

    }); // module: cyclop.js

    require.alias("./cyclop.js", "cyclop");

  return require('cyclop');
});