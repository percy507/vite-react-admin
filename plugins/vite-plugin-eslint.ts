import { createFilter } from '@rollup/pluginutils';
import { ESLint } from 'eslint';
import * as path from 'path';
import type { PluginOption } from 'vite';

type Options = {
  fix?: boolean;
  logWarnings?: boolean;
  logErrors?: boolean;
};

/**
 * Normalizes file path. Allows to locate local files by url with query.
 * @param filePath File path
 */
export function normalizePath(filePath: string): string {
  return path.relative(process.cwd(), filePath).split('?')[0].split(path.sep).join('/');
}

// Integrate eslint with vite
// make vite can print eslint warnings or errors in terminal
export default function viteEslintPlugin(
  opts: Options = {
    // default disable autofix, because we use vscode eslint extension to autofix
    fix: false,
    logWarnings: true,
    logErrors: true,
  },
): PluginOption {
  const filter = createFilter(/.*\.(js|jsx|ts|tsx|vue)/, /node_modules/);
  const eslintOptions = {
    fix: opts.fix,
    overrideConfigFile: path.resolve(__dirname, '../.eslintrc.js'),
    ignorePath: path.resolve(__dirname, '../.eslintignore'),
  };
  const eslint = new ESLint(eslintOptions);
  let formatter: ESLint.Formatter;

  return {
    name: 'vite-plugin-eslint',
    async transform(_, id) {
      const filePath = normalizePath(id);

      if (!filter(filePath)) {
        return null;
      }

      if (!formatter) {
        formatter = await eslint.loadFormatter('stylish');
      }

      const lintResultList = await eslint.lintFiles(filePath);
      const hasWarnings = lintResultList.some((item) => item.warningCount !== 0);
      const hasErrors = lintResultList.some((item) => item.errorCount !== 0);
      const result = formatter.format(lintResultList);

      // autofix code by using eslint api
      if (opts.fix && lintResultList) ESLint.outputFixes(lintResultList);

      // print eslint warnings or errors by using vite internal method
      if (opts.logWarnings && hasWarnings) this.warn(result);
      if (opts.logErrors && hasErrors) this.error(result);

      return null;
    },
  };
}
