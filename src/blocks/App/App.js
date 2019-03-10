/**
 * @class App
 * @description Experimental demo block
 * @author lilliputten <lilliputten@yandex.ru>
 * @description Main entry point
 * @since 2019.03.09, 22:54
 * @version 2019.03.10, 21:23
 */

import BemBlock from 'lib/Bem/BemBlock';
import BemDom from 'lib/Bem/BemDom';

import './App.bemhtml';
import './App.pcss';

const blockName = 'App';

class App extends BemBlock {

  static blockName = blockName;

  constructor() {
    console.log(App.blockName);
    // debugger;
    super();
  }

  init() {
    // console.log(this.blockName);
    // debugger;
    super.init();
  }

}

// console.log(BemDom, BemBlock);
// console.log(App && App.blockName);
// debugger;

BemDom.registerBlock(App);

export default App;
