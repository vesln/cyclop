
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
