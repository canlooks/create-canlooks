# AGENTS.md

## Coding Standards & File Structure

This project's coding standards and file structure are defined by the project-level skill:

**[coding-standards-skill](./.agents/skills/coding-standards-skill/SKILL.md)**

All code generation, file creation, and refactoring work must follow the conventions defined in that skill, including but not limited to:

- Directory structure conventions
- Component patterns (named exports, `memo`, `'use client'`)
- Styling conventions (`@emotion/react` + `defineCss`)
- Service layer patterns (`@canlooks/ajax` decorators)
- State management patterns (`@canlooks/statio`)
- Type declaration conventions
- Naming conventions

---

## MUI Component Development Reference

This project builds its UI with **Material UI (MUI) v9**. All coding agents must consult the official MUI LLMs documentation when writing or modifying MUI components to get accurate component APIs, props, examples, and best practices:

- **MUI Material UI LLMs**: [https://mui.com/material-ui/llms.txt](https://mui.com/material-ui/llms.txt)

That link contains complete documentation for MUI core components such as Button, Stack, Typography, ThemeProvider, CssBaseline, Grid, and Dialog. Coding agents must consult it in the following situations:

- Using unfamiliar MUI components or props
- Checking TypeScript signatures for MUI components
- Implementing MUI theme customization or dark mode
- Handling responsive layouts with MUI components
- Using MUI `sx`, system utilities, spacing, or breakpoints
- Debugging MUI component rendering or styling issues

> Before writing MUI component code, first consult `https://mui.com/material-ui/llms.txt` for the relevant component API documentation so usage stays consistent with the official MUI v9 API.
