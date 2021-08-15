// https://commitlint.js.org/#/concepts-commit-conventions
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // 添加新功能
        'fix', // 修复bug
        'docs', // 修改文档
        'style', // 不影响代码含义的更改 (比如格式化代码)
        'refactor', // 重构已有代码（非新增功能或修bug）
        'perf', // 提高性能的代码更改
        'test', // 添加或修改测试
        'revert', // 用于撤销以前的commit
        'chore', // 对构建或者辅助工具的更改
      ],
    ],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
  },
};
