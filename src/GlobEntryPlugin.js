'use strict';

var glob = require('glob');
var path = require('path');

var MultiEntryPlugin = require('webpack/lib/MultiEntryPlugin');
var SingleEntryPlugin = require('webpack/lib/SingleEntryPlugin');

class GlobEntryPlugin
{
  paths:Array;
  options:Object;
  entries:Object;
  context:String;

  constructor (paths, options) {
    this.paths = paths || [];
    this.options = options || {};

    this.entries = {};
    this.context = path.resolve('.');

    if ( !Array.isArray(this.paths) ) this.paths = [this.paths];
  }

  apply (compiler) {
    this.compiler = compiler;
    this.context = compiler.options.context;

    // find all modules from given paths
    this.paths.map(pth => {
      let modules = glob.sync('*', { cwd: path.join(this.context, pth) });

      modules.map(module => {
      	this.entries[module] = glob.sync(path.join(pth, module, '{index,' + module + '}.js'), { cwd: this.context, nodir: true });
      });
    });

    compiler.plugin('compilation', this.compile.bind(this));
  }

  compile (compilation, params) {
    Object.keys(this.entries).map(module => {
      let entries = this.entries[module];

      if (entries.length === 0) return;

      if ( entries.length > 1 )
        this.compiler.apply(new MultiEntryPlugin(this.context, entries, module));
      else
        this.compiler.apply(new SingleEntryPlugin(this.context, entries[0], module));
    });
  }
}

module.exports = GlobEntryPlugin;
