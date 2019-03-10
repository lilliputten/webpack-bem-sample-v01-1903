/* eslint-disable no-debugger */

/** Block1 ** {{{
 */
class Block1 {
  constructor() {
    console.log('Block1 constructor');
    // debugger;
  }
  method1() {
    console.log('Block1 method1');
    const method1 = super.method1;
    debugger;
    return (method1 && method1() || '') + ' Block1 method1 result';
  }
}/*}}}*/

/** Block2 ** {{{
 */
class Block2 /* extends Block1 */ {
  constructor() {
    console.log('Block2 constructor');
    // debugger;
    // super();
  }
  method1() {
    console.log('Block2 method1');
    const method1 = super.method1;
    debugger;
    return (method1 && method1() || '') + ' Block2 method1 result';
  }
  method2() {
    console.log('Block2 method2');
    const method2 = super.method2;
    debugger;
    return (method2 && method2() || '') + ' Block2 method2 result';
  }
}/*}}}*/

/** Block3 ** {{{
 */
class Block3 {
  constructor() {
    console.log('Block3 constructor');
    debugger;
    // super();
  }
  method1() {
    console.log('Block3 method1');
    const method1 = super.method1;
    debugger;
    return (method1 && method1() || '') + ' Block3 method1 result';
  }
  method3() {
    console.log('Block3 method3');
    const method3 = super.method3;
    debugger;
    return (method3 && method3() || '') + ' Block3 method3 result';
  }
}/*}}}*/

// /** Block2 (ES5) ** {{{
//  */
// const Block2 = function() {
//   const selfClass = this instanceof Block2;
//   const proto = this.__proto__;
//   // this.isPrototypeOf(Block2)
//   console.log('Block2 constructor', selfClass, proto);
//   debugger;
// };
// // Block2.prototype = new Block1();
// // Block2.prototype = new Block1();
// debugger;
// Block2.prototype = Object.create(Block1.prototype);
// Object.setPrototypeOf(Block2, Block1);
// Block2.prototype.method2 = function() {
//   console.log('Block2 method2');
//   debugger;
//   return 'method2 ok';
// };/*}}}*/

/** Object.getPrototypes ** {{{
 * @param {object} obj
 * @return {object[]} list
 */
Object.getPrototypes = function(obj) {
  const list = [];
  while (obj && obj.__proto__) {
    obj = obj.__proto__;
    obj && list.push(obj);
  }
  return list;
};/*}}}*/
/** Object.getPrototypeNames ** {{{
 * @param {object|object[]} objOrProtos
 * @param {object} options
 * @param {boolean} [options.unique]
 * @return {string[]} list
 */
Object.getPrototypeNames = function(objOrProtos, options = {}) {
  const protos = Array.isArray(objOrProtos) ? objOrProtos : Object.getPrototypes(objOrProtos);
  const protoNames = [];
  protos
    .map((proto) => proto && proto.constructor && proto.constructor.name)
    .map((proto) => {
      if (proto && (protoNames.indexOf(proto) === -1 || !options.unique)) {
        protoNames.push(proto);
      }
    });
  return protoNames;
};/*}}}*/

/** Object.prependPrototype ** {{{ ???
 */
Object.prependPrototype = function(oChain, oProto) {
  if (arguments.length < 2) {
    throw new TypeError('Object.prependPrototype - Not enough arguments');
  }
  // If class prototype...
  if (oProto.prototype) {
    oProto = oProto.prototype;
  }
  // Check prototype...
  if (typeof oProto !== 'object' && typeof oProto !== 'string') {
    throw new TypeError('second argument to Object.prependPrototype must be an object or a string');
  }

  let o2nd, oLast;
  let oNewProto = oProto,
      oReturn = o2nd = oLast = oChain instanceof this ? oChain : new oChain.constructor(oChain);

  let oName = o2nd.constructor.name; // DEBUG
  // Find first non-Object proto...
  for (let o1st = this.getPrototypeOf(o2nd);
    o1st !== Object.prototype && o1st !== Function.prototype;
    o1st = this.getPrototypeOf(o2nd)
  ) {
    oName = o1st.constructor.name; // DEBUG
    o2nd = o1st;
  }

  if (oProto.constructor === String) {
    oNewProto = Function.prototype;
    oReturn = Function.apply(null, Array.prototype.slice.call(arguments, 1));
    this.setPrototypeOf(oReturn, oLast);
  }

  this.setPrototypeOf(o2nd, oNewProto);
  return oReturn;
};/*}}}*/
/** Object.appendPrototype ** {{{
 */
Object.appendPrototype = function(oChain, oProto) {
  // Check arguments...
  if (arguments.length < 2) {
    throw new TypeError('Object.appendPrototype - Not enough arguments');
  }
  // If class prototype...
  if (oProto.prototype) {
    const x = Object.create(oProto);
    console.log(x.prototype);
    // oProto = oProto.prototype;
    oProto = x.prototype;
  }
  // Check prototype...
  if (typeof oProto !== 'object') {
    throw new TypeError('second argument to Object.appendPrototype must be an object');
  }

  let o1st = (oChain instanceof Object) ? oChain : new oChain.constructor(oChain);
  let o2nd = Object.getPrototypeOf(o1st);
  let oName = o2nd.constructor.name; // DEBUG

  Object.setPrototypeOf(oProto, o2nd);
  Object.setPrototypeOf(o1st, oProto);

  return oChain;
};/*}}}*/
/** Object.removePrototype ** {{{
 */
Object.removePrototype = function(oChain, oProto) {

  // Check arguments...
  if (arguments.length < 2) {
    throw new TypeError('Object.removePrototype - Not enough arguments');
  }
  // If class prototype...
  if (oProto.prototype) {
    oProto = oProto.prototype;
  }
  // Check prototype...
  if (typeof oProto !== 'object') {
    throw new TypeError('second argument to Object.removePrototype must be an object');
  }

  const findName = oProto.constructor.name;

  const protos = []; // Object.getPrototypes(oChain);
  const protoNames = []; // Object.getPrototypeNames(protos);

  let proto = oChain; // Object.getPrototypeOf(oChain);

  while (proto) {
    protos.push(proto);
    protoNames.push(proto.constructor.name);
    proto = Object.getPrototypeOf(proto);
  }

  // const foundFirst = protoNames.indexOf(findName); // ???
  const foundLast = protoNames.lastIndexOf(findName);

  // If found...
  if (foundLast !== -1) {
    const foundProto = protos[foundLast];
    const foundNextProto = protos[foundLast + 1];
    const foundPrevProto = protos[foundLast - 1];

    // Exclude foundproto from prototypes chain...
    if (foundPrevProto) {
      Object.setPrototypeOf(foundPrevProto, foundNextProto);
    }
  }

  return oChain;

};/*}}}*/

const block = new Block1();
const protoNames = Object.getPrototypeNames(block);
// debugger;

Object.appendPrototype(block, Block2);
Object.appendPrototype(block, Block3);
const protoNames2 = Object.getPrototypeNames(block);
debugger;

Object.removePrototype(block, Block3);
const protoNames3 = Object.getPrototypeNames(block);
debugger;

const instanceOfBlock1 = block instanceof Block1;
const instanceOfBlock2 = block instanceof Block2;
const instanceOfBlock3 = block instanceof Block3;
const proto = block.__proto__;
debugger;

console.log(block,
  protoNames,
  instanceOfBlock1,
  instanceOfBlock2,
  instanceOfBlock3,
  'method1:', block.method1 && block.method1(),
  'method2:', block.method2 && block.method2(),
  'method3:', block.method3 && block.method3(),
  proto);
debugger;
