/**
 * @module BemDom
 * @author lilliputten <lilliputten@yandex.ru>
 * @description Main entry point
 * @since 2019.03.09, 22:54
 * @version 2019.03.09, 22:55
 *
 * TODO:
 *
 *   - declMod (?)
 *   - setMod
 *   - delMod
 *   - declElem -- ???
 *   - findChildBlock
 *   - findChildBlocks
 *   - findParentBlock
 *   - find*
 *
 *  Later:
 *
 *   - findChildElem
 *   - findChildElems
 *
 */

const $ = (window && window.$) || require('jquery');

// TODO 2019.03.10, 23:25 -- Get delims from bemrc
const modDelim = '_';
const elemDelim = '__';

class BemDomFabric {

  // Entities registry
  entitiesRegistry = {};

  // TODO 2019.03.10, 23:26 -- Need to separate registries for blocks, elems, mods?
  // blocksRegistry = {};
  // elemsRegistry = {};
  // modsRegistry = {};

  /** constructor ** {{{
   */
  constructor() {
    // TODO?
  }/*}}}*/

  // Decl methods..

  /** declBlock ** {{{
   * @param {object} blockClass
   * @return {object} blockClass
   */
  declBlock(blockClass) {
    const blockName = blockClass.blockName;
    if (this.entitiesRegistry[blockName]) {
      throw new Error('Block already defined: ' + blockName);
    }
    this.entitiesRegistry[blockName] = blockClass;
    return blockClass;
  }/*}}}*/

  // Hydrate methods...

  /** hydrateDomElemEntity ** {{{ Hydrate one entity (class) on the specified dom element
   * @param {jQuery} domElem
   * @param {string} entityName
   * @return {object|undefined} entityInstance
   */
  hydrateDomElemEntity(domElem, entityName) {

    // data-bem attribute
    const bemData = domElem.data('bem');

    // Do we have a class description?
    const EntityClass = this.entitiesRegistry[entityName];

    // If found EntityClass class...
    if (EntityClass) {

      // Get entity params
      const params = bemData[entityName];

      // Create entity instance with fetched params
      const entityInstance = new EntityClass({ params });

      // Return entity instance
      return entityInstance;

    }

  }/*}}}*/
  /** hydrateDomElem ** {{{ Find and reanimate (hydrate) all existing i-bem instances on specified dom element
   * @param {jQuery} domElem
   */
  hydrateDomElem(domElem) {

    // Get data-bem property on specified dom
    const bemData = domElem.data('bem');

    // Get data-bem keys (block names)
    const bemEntities = Object.keys(bemData);

    // Entities list to store
    const entities = {};

    // Walk thru all found entities...
    bemEntities.map((entityName) => {
      const entityInstance = this.hydrateDomElemEntity(domElem, entityName);
      if (entityInstance) {
        entities[entityName] = entityInstance;
      }
    });

    // Set DOM element entities
    domElem.data('bemEntities', entities);

    // /*DEBUG*/ console.log('Found bem entities:', entities);
    // /*DEBUG*/ debugger; // eslint-disable-line no-debugger

  }/*}}}*/
  /** hydrate ** {{{
   * @param {jQuery} [domElem=document.body]
   */
  hydrate(domRoot) {

    // DOM root element to hydrate
    domRoot = domRoot || $('body');

    // Find all i-bem enabled dom elements...
    const foundItems = domRoot.find('.i-bem[data-bem]');

    // Walk thru all found elements...
    foundItems.each((_n, elem) => {
      const domElem = $(elem);
      this.hydrateDomElem(domElem);
    });

    // /*DEBUG*/ console.log('Found items to hydrate:', foundItems);
    // /*DEBUG*/ debugger; // eslint-disable-line no-debugger

    /*DEBUG-BEGIN {{{ DEBUG hydratedElems... */
    const hydratedElems = foundItems.map((_n, elem) => {
      const domElem = $(elem);
      const bemEntities = domElem.data('bemEntities');
      const entites = Object.keys(bemEntities).join(', ');
      return {
        entites,
        domElem,
        bemEntities,
      };
    });
    /*DEBUG*/ console.log('Hydrated elemetnts:', hydratedElems);
    /*DEBUG*/ debugger; // eslint-disable-line no-debugger
    /* }}} DEBUG-END*/

  }/*}}}*/

}

const BemDom = new BemDomFabric();

export default BemDom;
