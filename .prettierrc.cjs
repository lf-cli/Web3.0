module.exports = {
  printWidth: 80, // 超过最大值换行
  tabWidth: 2, // 缩进字节数
  useTabs: false, // 句尾添加分号
  semi: false, //  必须无分号结尾
  singleQuote: true, // 使用单引号代替双引号
  quoteProps: 'as-needed',
  jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
  trailingComma: 'none', // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
  jsxBracketSameLine: false, // 在jsx中把'>' 是否单独放一行
  arrowParens: 'always',
  htmlWhitespaceSensitivity: 'ignore',
  vueIndentScriptAndStyle: true
};
