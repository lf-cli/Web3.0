module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  globals: {
    document: true,
    localStorage: true,
    window: true,
    echarts: true,
    AMap: true
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    'plugin:vue/essential',
    './.eslintrc-auto-import.json'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    // 'vue/max-attributes-per-line': [
    //   'error',
    //   {
    //     singleline: {
    //       max: 3,
    //     },
    //     multiline: {
    //       max: 1,
    //     },
    //   },
    // ],
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/no-v-html': 'off',
    'vue/no-multiple-template-root': 'off', // vue3不再限制只能有一个根结点
    'vue/multi-word-component-names': 'off',
    'vue/script-setup-uses-vars': 'error',
    eqeqeq: ['error', 'always'], // 禁止使用双等
    'no-var': 2, // 禁止使用var
    'no-loss-of-precision': 0,
    'semi': [2, 'never'],
    'default-case': 2, // switch语句必须有default
    'no-extra-parens': 2, // 禁止不必要的括号
    '@typescript-eslint/no-unused-vars': [
      // 解决.d.ts中报错
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    'spaced-comment': [
      2,
      'always',
      {
        // 注释前要有空格
        markers: [
          'global',
          'globals',
          'eslint',
          'eslint-disable',
          '*package',
          '!',
          ','
        ]
      }
    ]
  }
}
