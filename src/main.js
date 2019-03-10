/**
 * @module main
 * @author lilliputten <lilliputten@yandex.ru>
 * @description Main entry point
 * @since 2019.03.09, 20:59
 * @version 2019.03.09, 20:59
 */

// jQuery etc...
const $ = window.jQuery = window.$ = require('jquery');

// Legacy styles...
import 'bootstrap/dist/css/bootstrap.css';

import { BEMHTML } from 'lib/Bem/BEMHTML';
import BemDom from 'lib/Bem/BemDom';

import App from 'blocks/App';
import Demo from 'blocks/Demo';

// Main styles...
import './main.pcss';

/** testCreateBemhtmlBlock ** {{{
 */
function testCreateBemhtmlBlock() {

  BEMHTML.compile(function(match, block, elem, mod, elemMod, oninit, xjstOptions, wrap, replace, extend, mode, def, content, appendContent, prependContent, attrs, addAttrs, js, addJs, mix, addMix, mods, addMods, addElemMods, elemMods, tag, cls, bem, local, applyCtx, applyNext, apply) {
    block('Test')(
      addJs()(true),
      tag()('div')
    );
  });

  BEMHTML.compile(function(match, block, elem, mod, elemMod, oninit, xjstOptions, wrap, replace, extend, mode, def, content, appendContent, prependContent, attrs, addAttrs, js, addJs, mix, addMix, mods, addMods, addElemMods, elemMods, tag, cls, bem, local, applyCtx, applyNext, apply) {
    block('Test2')(
      addJs()(true),
      content()('Block Test2'),
      tag()('div')
    );
  });

  const blockHtml = BEMHTML.apply({
    block: 'Test',
    content: {
      // 'Test block',
      block: 'Test2',
    },
  });
  const domElem = $(blockHtml);

  // Container
  const appWrapperDom = $('.AppWrapper');

  // Append DOM
  appWrapperDom.append(domElem);

  // Remove DOM
  // domElem.remove();

}/*}}}*/

/** testDemoBlock ** {{{
 */
function testDemoBlock() {

  BEMHTML.compile(function(match, block, elem, mod, elemMod, oninit, xjstOptions, wrap, replace, extend, mode, def, content, appendContent, prependContent, attrs, addAttrs, js, addJs, mix, addMix, mods, addMods, addElemMods, elemMods, tag, cls, bem, local, applyCtx, applyNext, apply) {
    block('Test2')(
      addJs()(true),
      content()('Block Test2'),
      tag()('span')
    );
  });

  console.log(Demo);
  const demo = new Demo();
  demo.init();
  debugger;

  const blockHtml = BEMHTML.apply({
    block: 'Demo',
    content: {
      // 'Test block',
      block: 'Test2',
    },
  });
  const domElem = $(blockHtml);
  debugger;

  // Container
  const appWrapperDom = $('.AppWrapper');

  // Append DOM
  appWrapperDom.append(domElem);

  // Remove DOM
  // domElem.remove();


}/*}}}*/

/** testHydrate ** {{{
 */
function testHydrate() {

  // const body = $('body');
  BemDom.hydrate(/* body */);

}/*}}}*/

/* Main entry point (jQuery) */
$(() => {
  /*DEBUG Let time to load css styles... */ setTimeout(() => {

    // const b = BEMHTML;
    // console.log('Ok loaded!', BEMHTML && BEMHTML.compile);
    // debugger;

    // testCreateBemhtmlBlock();
    // testDemoBlock();
    testHydrate();

  /*DEBUG*/ }, 100);
});
