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
    // debugger;
    return 'Block1A method1 result ' + (method1 && method1() || '');
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
    // debugger;
    return 'Block1B method1 result ' + (method1 && method1() || '');
  }
}/*}}}*/

/** Block2A ** {{{
 */
class Block2A extends Block1A {
  constructor() {
    console.log('Block2A constructor');
    // debugger;
    super();
  }
  method1() {
    console.log('Block2A method1');
    const method1 = super.method1;
    // debugger;
    return 'Block2A method1 result ' + (method1 && method1() || '');
  }
  method2() {
    console.log('Block2A method2');
    const method2 = super.method2;
    // debugger;
    return 'Block2A method2 result ' + (method2 && method2() || '');
  }
}/*}}}*/
/** Block3A ** {{{
 */
class Block3A extends Block1A {
  constructor() {
    console.log('Block3A constructor');
    // debugger;
    super();
  }
  method1() {
    console.log('Block3A method1');
    const method1 = super.method1;
    // debugger;
    return 'Block3A method1 result ' + (method1 && method1() || '');
  }
  method2() {
    console.log('Block3A method2');
    const method2 = super.method2;
    // debugger;
    return 'Block3A method2 result ' + (method2 && method2() || '');
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

/** changeObjectPrototype ** {{{
 * @param {object} srcObject
 * @param {object} tgtProto
 * @return {object} srcObject
 */
function changeObjectPrototype(srcObject, tgtProto) {
  if (srcObject) {
    const setProto = tgtProto.prototype || tgtProto;
    Object.setPrototypeOf(srcObject, setProto);
  }
  return srcObject;
}/*}}}*/

const block2A = new Block2A();
const block3A = new Block3A();

block2A.xxx = 1; // Check to save value

const protoNames2A1 = Object.getPrototypeNames(block2A);
const protoNames3A1 = Object.getPrototypeNames(block3A);
console.log('\n',
  'before changeObjectPrototype', '\n',
  'protoNames2A1:', protoNames2A1.join(', '), '\n',
  'protoNames3A1:', protoNames3A1.join(', '), '\n',
'\n');
console.log('\n',
  'block2A:method1:', block2A.method1 && block2A.method1(), '\n',
  'block2A:method2:', block2A.method2 && block2A.method2(), '\n',
'\n');
debugger;

changeObjectPrototype(block2A, Block3A);
changeObjectPrototype(block3A, Block1B);

const protoNames2A2 = Object.getPrototypeNames(block2A);
const protoNames3A2 = Object.getPrototypeNames(block3A);
console.log('\n',
  'after changeObjectPrototype', '\n',
  'protoNames2A2:', protoNames2A2.join(', '), '\n',
  'protoNames3A2:', protoNames3A2.join(', '), '\n',
'\n');
console.log('\n',
  'block2A:method1:', block2A.method1 && block2A.method1(), '\n',
  'block2A:method2:', block2A.method2 && block2A.method2(), '\n',
'\n');
debugger;

