/* eslint-disable no-debugger */

function _typeof(obj) {/*{{{*/
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  }
  else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj;
    };
  }
  return _typeof(obj);
}/*}}}*/
function _possibleConstructorReturn(self, call) {/*{{{*/
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }
  return _assertThisInitialized(self);
}/*}}}*/
function _assertThisInitialized(self) {/*{{{*/
  if (self === void 0) {
    throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
  }
  return self;
}/*}}}*/
function _get(target, property, receiver) {/*{{{*/
  if (typeof Reflect !== 'undefined' && Reflect.get) {
    _get = Reflect.get;
  }
  else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) {
        return;
      }
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(receiver);
      }
      return desc.value;
    };
  }
  return _get(target, property, receiver || target);
}/*}}}*/
function _superPropBase(object, property) {/*{{{*/
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) {
      break;
    }
  }
  return object;
}/*}}}*/
function _getPrototypeOf(o) {/*{{{*/
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}/*}}}*/
function _inherits(subClass, superClass) {/*{{{*/
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) {
    _setPrototypeOf(subClass, superClass);
  }
}/*}}}*/
function _setPrototypeOf(o, p) {/*{{{*/
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}/*}}}*/
function _classCallCheck(instance, Constructor) {/*{{{*/
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}/*}}}*/
function _defineProperties(target, props) {/*{{{*/
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) {
      descriptor.writable = true;
    }
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}/*}}}*/
function _createClass(Constructor, protoProps, staticProps) {/*{{{*/
  if (protoProps) {
    _defineProperties(Constructor.prototype, protoProps);
  }
  if (staticProps) {
    _defineProperties(Constructor, staticProps);
  }
  return Constructor;
}/*}}}*/

var Block1 = function() {/*{{{*/
  function Block1() {
    _classCallCheck(this, Block1);

    console.log('Block1 constructor');
    debugger;
  }

  _createClass(Block1, [{
    key: 'method1',
    value: function method1() {
      console.log('Block1 method1');
      debugger;
      return 'method1 ok';
    }
  }]);

  return Block1;
}();/*}}}*/

var Block2 = function(_Block) {/*{{{*/
  _inherits(Block2, _Block);

  function Block2() {
    _classCallCheck(this, Block2);

    console.log('Block2 constructor');
    debugger;
    var proto = Object.getPrototypeOf(Block2);
    var protoResult = proto.call(this);
    return _possibleConstructorReturn(this, protoResult);
  }

  _createClass(Block2, [{
    key: 'method1',
    value: function method1() {
      console.log('Block2 method1');
      debugger;
      var proto = Object.getPrototypeOf(this.__proto__);
      var protoMethod1 = proto && proto.method1;
      var result = protoMethod1 && protoMethod1.call(this);
      // var result = _get(_getPrototypeOf(Block2.prototype), 'method1', this).call(this); // babel
      return result;
    }
  }, {
    key: 'method2',
    value: function method2() {
      console.log('Block2 method2');
      debugger;
      return 'method2 ok';
    }
  }]);

  return Block2;
}(Block1);/*}}}*/

debugger;
// var block1 = Object.create(Block1.prototype);
// var block1 = new Block1();
var block2 = new Block2();
var instanceOfBlock2 = block2 instanceof Block2;
var instanceOfBlock1 = block2 instanceof Block1;
var proto = block2.__proto__;
debugger;
console.log(block2,
  instanceOfBlock1,
  instanceOfBlock2,
  block2.method1 && block2.method1(),
  block2.method2 && block2.method2(),
  proto);
