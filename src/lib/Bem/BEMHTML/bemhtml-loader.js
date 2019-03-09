'use strict';

/**
 * bemhtml loader
 *
 * @param  {string} source
 * @return {string}
 */
module.exports = function (source) {

  this.cacheable();

  var corePath = require.resolve('./BEMHTML').replace(/\\/g, '/');

  return "var BEMHTML = require('" + corePath + "').BEMHTML;\n\nBEMHTML.compile(function() {\n" +
    source + "\n});\n\nmodule.exports = BEMHTML;\n";

};
