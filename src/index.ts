//gets TS to shut up
declare var require:any;

import * as ts from 'typescript';
import {RollupPlugin, RollupPluginOptions} from './rollup-plugin';
const {createFilter} = require('rollup-pluginutils');

export function typescript (
  options:RollupPluginOptions = {},
  compilerOptions:ts.CompilerOptions = { modules: ts.ScriptTarget.ES2015 }
  ): RollupPlugin {
    
    const filter = createFilter( options.include, options.exclude );
    
    return {
      transform(code, id){
        return ts.transpile(code, compilerOptions)
      }
    };
}
