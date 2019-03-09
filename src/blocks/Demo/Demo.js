import BemBlock from 'lib/Bem/BemBlock';

import './Demo.bemhtml';
import './Demo.pcss';

const block = 'Demo';

class Demo extends BemBlock {

  block = block;

  constructor() {
    super();
  }

  init() {
    // console.log(this.block);
    // debugger;
    super.init();
  }

}

export default Demo;
