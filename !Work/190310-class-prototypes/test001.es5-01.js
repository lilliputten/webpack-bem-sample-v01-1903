/* eslint-disable no-debugger */

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) {
      descriptor.writable = true;
    }
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) {
    _defineProperties(Constructor.prototype, protoProps);
  }
  if (staticProps) {
    _defineProperties(Constructor, staticProps);
  }
  return Constructor;
}

var Block1 = function() {
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
  }();

debugger;
var block1 = new Block1();
console.log(block1, block1.method1());
debugger;
