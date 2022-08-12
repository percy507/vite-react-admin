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
