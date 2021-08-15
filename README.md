# 搭个中后台系统的脚手架

- **搭建脚手架目的**
  - 学习 vite、recoil 等新技术
  - 封装项目中常用的较复杂的组件
  - 学习一定的前端架构能力

```bash
# 主要使用到的依赖
Vite          v2.1.0+           一种新型前端构建工具
React         v17.0.0+          前端框架
recoil        v0.4.0            React 状态管理库
antd          v4.16.10+         React UI 组件库
Typescript    v4.2.1+           为JavaScript提供强大的类型系统
```

> **注意: recoil v0.4.0 还不是稳定版，谨慎用于生产环境**
>
> [When Recoil is going to stop being experimental?](https://github.com/facebookexperimental/Recoil/issues/691)

```bash
# 代码提交、校验、格式化的相关工具
husky         v7.0.1+           一款简化使用git hook的工具
lint-staged   v11.1.2+          为git暂存区文件执行指定的校验程序
Eslint        v7.22.0+          校验js、jsx、ts、tsx代码
Prettier      v2.2.1+           格式化代码
stylelint     v13.13.1+         校验css、less代码
commitlint    v13.1.0+          校验commit信息

# commitlint
@commitlint/cli                           提供commitlint命令校验提交信息规范
@commitlint/config-conventional           提供commit信息规则

# eslint插件
eslint-plugin-react                       提供一些用于校验react代码的规则
eslint-plugin-simple-import-sort          eslint插件，用于自动对import、export语句以一定的规则排序
@typescript-eslint/parser                 一种eslint解析器，用于支持eslint解析typescript
@typescript-eslint/eslint-plugin          提供一些用于校验typescript代码的规则
eslint-config-prettier                    禁用非必要的以及与prettier有冲突的规则

# stylelint插件
stylelint-config-standard                 提供一些常用的CSS编写规则
stylelint-order                           强制按照某个顺序编写css
stylelint-config-rational-order           提供一种css编写顺序的规则
stylelint-config-prettier                 禁用非必要的以及与prettier有冲突的规则
```

### 构建命令

> npm 与 yarn 对新版 husky（v7.0.1+）的配置方式不太相同，我们这里只使用 npm
>
> <https://typicode.github.io/husky/#/?id=usage>

```bash
npm i -d              # 装依赖
npm run dev           # 本地开发
npm run build:dev     # 开发服务器生产环境打包
npm run build:test    # 测试服务器生产环境打包
npm run build:prod    # 生产服务器生产环境打包
npm run preview       # 本地打包并预览打包后的页面

npm run deploy        # 将打包后的代码推送到github远程仓库，以便预览
```

### 组件

- **核心组件**

  - MenuList: 菜单组件。用于渲染顶部菜单与侧边栏菜单的配置化数据
  - Authorized: 权限组件。同时暴露出一个 `hasPermission` 函数用于逻辑上的权限判断
  - ErrorBoundary: 错误边界组件。用来在子组件树渲染报错后，降级显示错误 UI
  - Exception: 异常页通用组件。比如 404 页面、403 页面、500 页面等
  - IconFont: 自定义图标组件。图标数据从 iconfont.cn 获取
  - PageWrapper: 通用页面包裹层组件。
  - RouteList: 路由组件。用于渲染路由的配置化数据

- **自定义业务组件**

  - IframeComponent: iframe 组件。用来渲染 html 字符串
  - QuillEditor: 富文本编辑器

### hooks

- useMenuStatus: 获取当前侧边栏菜单默认被打开、选中的菜单项

### 架构设计

##### 目录设计

```bash
.config         # 存储husky以及各种linter的配置文件
.vscode         # vscode当前工作空间配置目录
src
  @types        # 存储可用于全局的类型声明文件
  assets        # 静态资源目录
  components    # 组件目录
  hooks         # 自定义hooks目录
  layouts       # 存储页面布局
  pages         # 存储具体页面
  recoil        # 按模块存储recoil状态文件
  services      # 存储调接口的文件
  styles        # 存储一些全局的样式或变量
  utils         # 存储工具函数
```

> **为了抽离项目根目录下各种 linter 的配置文件**，才创建`.config` 目录
>
> linter 配置文件被使用的两种方式:
>
> - `vscode相关插件调用`: `.vscode/settings.json`
> - `npm依赖调用`: `package.json` 中的 `scripts` 字段下的某个命令以及 `lint-staged` 字段

##### 路由、权限命名设计

```bash
# 路由命名设计
# 如果有多个layout，则layout为第一个path
/layout/first-menu/[second-menu]/other
/布局名称/一级菜单/二级菜单(可能没有)/其他子路径
```

```bash
# 权限命名格式
布局名称__[一级菜单]__[二级菜单]__[其他]

# 权限控制（前端）
菜单、路由、页面按钮或子模块
封装权限组件、权限判断函数

# 权限控制（后端）
接口权限控制
接口里面某些字段的权限控制（数据权限控制）
```

```bash
# 如果要侧边栏或顶部菜单、权限配置化，存后端
可参考 https://github.com/javaLuo/react-admin
```

##### 打包代码的注意事项

```bash
css（预处理器、css modules）
服务器生产环境区分(dev,test,prod)
公共代码抽离
基于路由进行代码拆分
```
