/**
 * @class Demo
 * @description Experimental demo block
 * @author lilliputten <lilliputten@yandex.ru>
 * @description Main entry point
 * @since 2019.03.09, 22:54
 * @version 2019.03.10, 21:23
 */

import BemBlock from 'nano-bem/BemBlock';
import BemDom from 'nano-bem/BemDom';

import './Demo.bemhtml';
import './Demo.pcss';

const blockName = 'Demo';

class Demo extends BemBlock {

  static blockName = blockName;

  constructor() {
    console.log(blockName, 'constructor');
    // debugger;
    super();
  }

  init() {
    console.log(blockName, 'init');
    // debugger;
    super.init();
  }

}

export default BemDom.declBlock(Demo);
