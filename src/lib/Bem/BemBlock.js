/**
 * @class BemBlock
 * @author lilliputten <lilliputten@yandex.ru>
 * @description Main entry point
 * @since 2019.03.09, 22:54
 * @version 2019.03.09, 22:55
 */

class BemBlock {

  params = {};

  // TODO 2019.03.10, 23:46 -- To pass argments (params etc) from inherited object constructors
  constructor({ params }) {
    Object.assign(this.params, params);
  }

  init() {
    // console.log(this.block);
    // debugger;
  }

  // TODO: destroy

}

export default BemBlock;
