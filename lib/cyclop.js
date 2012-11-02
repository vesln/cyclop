
/**
 * Cyclop constructor.
 *
 * @constructor
 */

function Cyclop() {
  this.batch = [];
  this.steps = {};
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

Cyclop.prototype.end =
Cyclop.prototype.run = function(fn) {
  if (fn) this.push(fn);
  this.cycle();
};

/**
 * Register or add to the queue a named step.
 *
 * @param {String} step
 * @param {Function} callback [optional]
 * @api public
 */

Cyclop.prototype.step = function(step, fn) {
  if (fn) this.steps[step] = fn;
  else this.push(this.steps[step]);
  return this;
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
