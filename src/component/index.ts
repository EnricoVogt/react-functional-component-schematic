import { Rule, SchematicContext, Tree, apply, url, mergeWith, template, move } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { upperfirstChar } from '../util'
import { Schema } from './schema'

export function rc(_options: Schema): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const templateSource = apply(url('./templates/src'), [
      template({
        ..._options,
        ...strings,
        upperfirstChar,
      }),
      move(_options.path),
    ]);

    const rule = mergeWith(templateSource);
    return rule(tree, _context);
  };
}
