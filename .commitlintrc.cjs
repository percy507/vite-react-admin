// https://commitlint.js.org/#/concepts-commit-conventions
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // new features
        'fix', // bugfix
        'docs', // midify doc
        'style', // style-like's change, eg: remove space or format code
        'refactor', // just refactor code, not add new features or fix bugs
        'perf', // improve performance
        'test', // add or midify test cases
        'revert', // revert commit
        'chore', // improve build or bundle tools
      ],
    ],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
  },
};
