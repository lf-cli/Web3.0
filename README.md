### 项目启动

pnpm i
npm run dev

### 项目架构说明

> vite+ts+vue3.2+router4+pinia+pnpm+element-plus

### 跟目录文件说明

- .husky git 提交约束
- .vscode vscode 相关配置
- public 放项目静态文件
- src

  - api 接口地址
  - assets 项目资源 js css image
  - components 项目组件，一般放公共组件
  - layout 视图入口，基本框架
  - router 路由
  - store 状态管理仓库
  - utils 项目常用的工具库
  - views 项目中涉及到的页面（子页面写在父页面的 modules 文件夹中）
  - App.vue 入口文件
  - main.ts 入口文件
  - vite-env.d.ts 全局声明文件

- .eslintignore eslint 不校验的目录
- .eslintrc-auto-import.json 放 elementui 全局使用的组件名，目的是避免校验
- .eslintrc.cjs eslint 校验规则
- .gitignore git 不提交的目录
- .prettierrc.cjs 格式化文件，统一代码风格
- auto-imports.d.ts 自动导入 elementui
- components.d.ts 自动导入全局组件
- index.html 入口文件
- jsconfig.json 输入@后能自动提示文件夹目录
- package.json 依赖
- pnpm-lock.yaml 依赖版本及地址
- tsconfig.json 配置 ts 相关规则
- tsconfig.node.json
- vite.config.ts 等同于 webpack 的 vue.config.js

### attention:

> package.json 中设置了 type=module,所有 js 文件默认使用 ESM 模块规范，不支持 commonjs 规范，所以必须显式的声明成 xxx.cjs 才能标识这个是用 commonjs 规范的。所以根目录下的.js 文件要改成.cjs

> elementui 用自动导入的方式，可以直接使用，不用再引入什么东西

### 项目规范

- 使用组合式 api 开发
- 该项目使用 eslint 规范，开发必须遵从 eslint 规范来开发
- 开发风格需要遵从 pretter，相关配置在.prettierrc.cjs 中
- 项目集成了 husky,提交会自动校验 eslint 和 prettier
- 要遵从组合式 api 开发的理念，适当抽离 hook
- components 里开发公共组件，且用大驼峰的方式命名

### TODO

1. [x] eslint 校验
2. [x] git 提交校验
3. [x] 公共方法封装
4. [ ] inteface,type,enum 开发
5. [x] icon 图标接入
6. [x] 接入 elementui
7. [x] 接入高德地图
8. [ ] 权限模块开发
9. [x] http 封装
10. [x] prettier 格式化
11. [ ] CI/CD 集成
12. [ ] 公共组件
13. [ ] 抽离路由，路由和 header 或者 nav 使用同一组数据
14. [ ] 公共 hooks 开发
15. [ ] echarts 组件
