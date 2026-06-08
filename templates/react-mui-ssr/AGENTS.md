# AGENTS.md

## Coding Standards & File Structure

本项目编码规范与文件结构遵循项目级 skill 定义：

**[.agents/skills/coding-standards-skill/SKILL.md](.agents/skills/coding-standards-skill/SKILL.md)**

所有代码生成、文件创建、重构操作必须严格遵循该 skill 中定义的规范，包括但不限于：

- 目录结构约定
- 组件模式（命名导出、`memo`、`'use client'`）
- 样式约定（`@emotion/react` + `defineCss`）
- 服务层模式（`@canlooks/ajax` 装饰器）
- 状态管理模式（`@canlooks/statio`）
- 类型声明规范
- 命名约定
- 导入顺序

---

## MUI 组件开发参考

本项目基于 **Material UI (MUI) v9** 构建 UI。所有编码智能体在编写或修改 MUI 组件时，**必须**查阅 MUI 官方 LLMs 文档以获取准确的组件 API、props、示例和最佳实践：

- **MUI Material UI LLMs**: [https://mui.com/material-ui/llms.txt](https://mui.com/material-ui/llms.txt)

该链接包含 MUI 所有核心组件的完整文档（Button、Stack、Typography、ThemeProvider、CssBaseline、Grid、Dialog 等），编码智能体在以下场景时必须查阅：

- 使用不熟悉的 MUI 组件或 props
- 需要了解 MUI 组件的 TypeScript 类型签名
- 实现 MUI 主题定制或暗色模式
- 处理 MUI 组件的响应式布局
- 使用 MUI 的 sx 简写、system utilities、间距/断点系统
- 解决 MUI 组件相关的渲染或样式问题

> 在编写 MUI 组件代码前，优先从 `https://mui.com/material-ui/llms.txt` 获取相关组件的 API 文档，确保组件用法与 MUI v9 官方 API 一致。
