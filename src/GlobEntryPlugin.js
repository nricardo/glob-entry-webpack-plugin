'use strict';

var glob = require('glob');
var path = require('path');

var MultiEntryPlugin = require("webpack/lib/MultiEntryPlugin");
var SingleEntryPlugin = require("webpack/lib/SingleEntryPlugin");

class GlobEntryPlugin
{
  constructor (patterns) {
    this.patterns = patterns || [];
  }

  apply (compiler) {
    var context = compiler.options.context;

    // find all modules here
    var modules = glob.sync('*', { cwd: path.join(context, gep.path) });

    var entries = {};
    modules.map(function(module) {
    	entries[module] = glob.sync(path.join(gep.path, module, '**/*'), { cwd: context, nodir: true });
    });

    compiler.plugin('compilation', this.compile);
  }

  compile (compilation, params) {
    Object.keys(entries).forEach(function(module) {
      var files = entries[module];

      if ( Array.isArray(files) )
        compiler.apply(new MultiEntryPlugin(context, files, module));
      else
        compiler.apply(new SingleEntryPlugin(context, files, module));
    });
  }
}

module.exports = GlobEntryPlugin;
