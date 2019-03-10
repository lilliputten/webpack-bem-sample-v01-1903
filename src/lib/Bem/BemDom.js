/**
 * @module BemDom
 * @author lilliputten <lilliputten@yandex.ru>
 * @description Main entry point
 * @since 2019.03.09, 22:54
 * @version 2019.03.09, 22:55
 */

const $ = window.$ || require('jquery');

class BemDomFabric {

  blocksRegistry = {};
  elemsRegistry = {};
  modsRegistry = {};

  /** constructor ** {{{
   */
  constructor() {
  }/*}}}*/

  /** registerBlock ** {{{
   * @param {object} blockClass
   * @return {object} this
   */
  registerBlock(blockClass) {
    const blockName = blockClass.blockName;
    if (this.blocksRegistry[blockName]) {
      throw new Error('Block already defined: ' + blockName);
    }
    this.blocksRegistry[blockName] = blockClass;
    return this;
  }/*}}}*/

  /** hydrate ** {{{
   * @param {jQuery} [domElem=document.body]
   */
  hydrate(domElem) {
    domElem = domElem || $('body');
    const found = domElem.find('.i-bem');
    // found.each() // XXX TODO STOPPED 2019.03.10, 22:01
    debugger;
  }/*}}}*/

}

const BemDom = new BemDomFabric();

export default BemDom;
