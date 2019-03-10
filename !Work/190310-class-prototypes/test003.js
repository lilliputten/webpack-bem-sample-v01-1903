/* eslint-disable no-debugger */

/** Block1A ** {{{
 */
class Block1A {
  constructor() {
    console.log('Block1A constructor');
    // debugger;
  }
  method1() {
    console.log('Block1A method1');
    const method1 = super.method1;
    debugger;
    return (method1 && method1() || '') + ' Block1A method1 result';
  }
}/*}}}*/
/** Block1B ** {{{
 */
class Block1B {
  constructor() {
    console.log('Block1B constructor');
    // debugger;
  }
  method1() {
    console.log('Block1B method1');
    const method1 = super.method1;
    debugger;
    return (method1 && method1() || '') + ' Block1B method1 result';
  }
}/*}}}*/

/** Block2 ** {{{
 */
class Block2 /* extends Block1A */ {
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

/** Block4 ** {{{
 */
class Block4 {
  constructor() {
    console.log('Block4 constructor');
    debugger;
    // super();
  }
  method1() {
    console.log('Block4 method1');
    const method1 = super.method1;
    debugger;
    return (method1 && method1() || '') + ' Block4 method1 result';
  }
  method3() {
    console.log('Block4 method3');
    const method3 = super.method3;
    debugger;
    return (method3 && method3() || '') + ' Block4 method3 result';
  }
}/*}}}*/

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

/** Object.appendPrototype ** {{{
 */
Object.appendPrototype = function(oChain, newProto) {

  // If class prototype...
  if (newProto.prototype) {
    // const x = Object.create(newProto);
    const x = new newProto();
    console.log(x.prototype);
    // newProto = newProto.prototype;
    // newProto = x.prototype;
    newProto = x.__proto__;
    // TODO: How to make other chain without impacting original classes (using in other chains)?
    // debugger;
  }
  // // Check prototype...
  // if (typeof newProto !== 'object') {
  //   throw new TypeError('second argument to Object.appendPrototype must be an object');
  // }

  const newProtoName = newProto.constructor.name; // DEBUG

  const firstProto = (oChain instanceof Object) ? oChain : new oChain.constructor(oChain);
  const nextProto = Object.getPrototypeOf(firstProto);
  const firstProtoName = firstProto.constructor.name; // DEBUG
  const nextProtoName = nextProto.constructor.name; // DEBUG
  debugger;

  // newProto.__proto = nextProto;
  // firstProto.__proto = newProto;
  Object.setPrototypeOf(newProto, nextProto); // Here impacting class proto for `newProto` -- TODO?
  Object.setPrototypeOf(firstProto, newProto);

  return oChain;

};/*}}}*/
/** Object.removePrototype ** {{{
 */
Object.removePrototype = function(oChain, oProto) {

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

const blockA = new Block1A();
const blockB = new Block1B();
const protoNamesA1 = Object.getPrototypeNames(blockA);
const protoNamesB1 = Object.getPrototypeNames(blockB);
// debugger;

// TODO: Must be different bases: `Block1A` for `blockA` and `Block1B` for `blockB!
// NOTE: Here changing proto for all `Block2` instances on last appended class (now for `BlockA`).
// ???
Object.appendPrototype(blockB, Block2);
Object.appendPrototype(blockA, Block2);
// Object.appendPrototype(blockA, Block3);
const protoNamesA2 = Object.getPrototypeNames(blockA);
const protoNamesB2 = Object.getPrototypeNames(blockB);
debugger;

// Object.removePrototype(blockA, Block3);
// // Object.removePrototype(blockB, Block3);
// const protoNamesA3 = Object.getPrototypeNames(blockA);
// const protoNamesB3 = Object.getPrototypeNames(blockB);
// debugger;
//
// const instanceAOfBlock1 = blockA instanceof Block1A;
// const instanceAOfBlock2 = blockA instanceof Block2;
// const instanceAOfBlock3 = blockA instanceof Block3;
// const instanceBOfBlock1 = blockB instanceof Block1B;
// const instanceBOfBlock2 = blockB instanceof Block2;
// const instanceBOfBlock3 = blockB instanceof Block3;
// const proto = blockA.__proto__;
// debugger;
//
// console.log(blockA, blockB,
//   'A:method1:', blockA.method1 && blockA.method1(),
//   'A:method2:', blockA.method2 && blockA.method2(),
//   'A:method3:', blockA.method3 && blockA.method3(),
//   'B:method1:', blockB.method1 && blockB.method1(),
//   'B:method2:', blockB.method2 && blockB.method2(),
//   'B:method3:', blockB.method3 && blockB.method3(),
// '\n');
// debugger;
