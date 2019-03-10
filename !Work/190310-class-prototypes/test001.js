/* eslint-disable no-debugger */

class Block1 {
  constructor() {
    console.log('Block1 constructor');
    debugger;
  }
  method1() {
    console.log('Block1 method1');
    debugger;
    return 'method1 ok';
  }
}
class Block2 extends Block1 {
  constructor() {
    console.log('Block2 constructor');
    debugger;
    super();
  }
  method1() {
    console.log('Block2 method1');
    debugger;
    return super.method1();
  }
  method2() {
    console.log('Block2 method2');
    debugger;
    return 'method2 ok';
  }
}

debugger;
const block1 = new Block1();
console.log(block1, block1.method1());
debugger;
