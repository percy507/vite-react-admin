import { createFilter } from '@rollup/pluginutils';
import * as path from 'path';
import * as stylelint from 'stylelint';
import type { PluginOption } from 'vite';

import { normalizePath } from './vite-plugin-eslint';

type Options = {
  fix?: boolean;
  logWarnings?: boolean;
  logErrors?: boolean;
};

// Integrate stylelint with vite
// make vite can print stylelint warnings or errors in terminal
export default function viteStylelintPlugin(
  opts: Options = {
    // default disable autofix, because we use vscode stylelint extension to autofix
    fix: false,
  },
): PluginOption {
  const filter = createFilter(/.*\.(css|less|scss|sass|postcss|vue)/, /node_modules/);
  const baseOptions = {
    fix: opts.fix,
    configFile: path.resolve(__dirname, '../.stylelintrc.js'),
    ignorePath: path.resolve(__dirname, '../.stylelintignore'),
  };

  return {
    name: 'vite-plugin-stylelint',
    async transform(_, id) {
      const filePath = normalizePath(id);

      if (!filter(filePath)) {
        return null;
      }

      await stylelint
        .lint({
          ...baseOptions,
          files: filePath,
          formatter: 'string',
        })
        .then(({ errored, output }) => {
          if (errored) this.error(output);
        });
    },
  };
}
