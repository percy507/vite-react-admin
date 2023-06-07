# 搭个中后台系统的脚手架

- 尝试新版本的框架（细节请查看 `package.json`）
- 记录项目中封装过的实用的组件
- 记录曾经对某些技术的调研结果等

### 交互规范

```md
# 列表页（表格）

1、新建弹窗和删除操作，在调完接口后，返回第一页并清空筛选项
2、列表其他操作（编辑弹窗，Switch 组件切换状态等），都在当前页面，筛选项不变
```

### 踩坑

#### react-router v6 相关

`useNavigate` & `useRoutes` 竟与 `useLocation` 一样，在路由发生变化时，会触发组件重新渲染。。。WTF？

```bash
# useNavigate hook causes waste rendering
https://github.com/remix-run/react-router/issues/7634

# [Feature]: use useRoutes() render Router, re-render click link every time
https://github.com/remix-run/react-router/issues/8493

# [Feature]: Performance issues
https://github.com/remix-run/react-router/issues/8653
```

### TODO

```bash
request 方法如何处理竞态问题
https://developer.mozilla.org/en-US/docs/Web/API/AbortController
https://segmentfault.com/a/1190000039396584

vite 设置 server.proxy，这样就不用单独配置各个环境的 url 了，也不用跨域，貌似相对安全点

基础列表页
添加或编辑的表单梳理下

重新设计系统管理下的权限配置？
```
