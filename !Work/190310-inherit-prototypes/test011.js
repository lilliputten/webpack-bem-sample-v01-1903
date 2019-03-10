/* eslint-disable no-debugger */

const inherit = require('inherit');

/** Block1A ** {{{
 */
const Block1A = inherit({
  __constructor: function() {
    console.log('Block1A:__constructor');
    // debugger;
    this.__base && this.__base.apply(this, arguments);
  },
  method1: function() {
    console.log('Block1A:method1');
    // debugger;
    this.__base && this.__base.apply(this, arguments);
  },
});/*}}}*/

/** Block1B ** {{{
 */
const Block1B = inherit({
  __constructor: function() {
    console.log('Block1B:__constructor');
    // debugger;
    this.__base && this.__base.apply(this, arguments);
  },
  method1: function() {
    console.log('Block1B:method1');
    // debugger;
    this.__base && this.__base.apply(this, arguments);
  },
});/*}}}*/

/** Block2 ** {{{
 */
const Block2 = inherit(Block1A, {
  __constructor: function() {
    console.log('Block2:__constructor');
    // debugger;
    this.__base && this.__base.apply(this, arguments);
  },
  method1: function() {
    console.log('Block2:method1');
    // debugger;
    this.__base && this.__base.apply(this, arguments);
  },
});/*}}}*/

debugger;
const blockA = new Block1A();
console.log(// inherit, Block1A, blockA,
  'blockA:method1:', blockA.method1 && blockA.method1(),
'\n');
debugger;
