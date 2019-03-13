/**
 * @class App
 * @description Experimental demo block
 * @author lilliputten <lilliputten@yandex.ru>
 * @description Main entry point
 * @since 2019.03.09, 22:54
 * @version 2019.03.10, 21:23
 */

import BemBlock from 'nano-bem/BemBlock';
import BemDom from 'nano-bem/BemDom';

import './App.bemhtml';
import './App.pcss';

const blockName = 'App';

class App extends BemBlock {

  static blockName = blockName;

  constructor(...args) {
    super(...args);
  }

  init() {
    console.log(blockName, 'init');
    // debugger;
    super.init();
  }

  // TODO: destroy

}

export default BemDom.declBlock(App);
