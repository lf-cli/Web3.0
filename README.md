### 项目说明

> vite+ts+vue3++router4+pinia+pnpm

### attention:

> package.json 中设置了 type=module,所有 js 文件默认使用 ESM 模块规范，不支持 commonjs 规范，所以必须显式的声明成 xxx.cjs 才能标识这个是用 commonjs 规范的。所以根目录下的.js 文件要改成.cjs

### 项目规范

- 使用组合式 api 开发
- 该项目使用 eslint 规范，开发必须遵从 eslint 规范来开发
- 开发风格需要遵从 pretter，相关配置在.prettierrc.cjs 中，提交代码前需要执行下 npm run format
-
-

### TODO

1. [x] eslint 校验
2. [ ] git 提交校验
3. [ ] 公共方法封装
4. [ ] inteface,type,enum 开发
