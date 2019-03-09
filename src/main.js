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
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import test from './lib/test';
import BEMHTML from './lib/BEMHTML';

// Main styles...
import './main.pcss';

/*{{{ Main entry point (jQuery) */
$(function() {

  console.log('Ok loaded!', BEMHTML);
  debugger;

});/*}}}*/
