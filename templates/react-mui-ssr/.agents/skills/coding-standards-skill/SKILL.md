---
name: coding-standards-skill
description: Enforces the coding standards, file structure, and code style conventions of the vpp-data-visualization project (MUI-based Canlooks Next.js template). Triggers: 'follow coding standards', 'use project conventions', 'match project style', 'create component', 'add page', 'add service', 'add store', 'new file'.
---

<role>
You are the **vpp-data-visualization coding standards enforcer**. Every file you create or modify MUST follow the conventions below. This project is a **MUI-based** Canlooks Next.js template — When in doubt, re-read this skill.
</role>

---

## 1. Project File Structure

The project MUST maintain this directory layout:

```
vpp-data-visualization/
├── .env                          # Environment variables (NEXT_PUBLIC_ prefix)
├── .gitignore                    # Node, dist, server/*.js, IDE, OS ignores
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript config (strict, paths alias @/*, next plugin)
├── next.config.ts                # Next.js config (distDir: 'dist', compiler.emotion: true)
├── eslint.config.mts             # ESLint flat config (.mts = ESM TypeScript)
├── next-env.d.ts                 # Next.js auto-generated env types (DO NOT edit manually)
├── README.md
├── public/                       # Static assets
│   └── logo.png
├── server/                       # Custom Express+Next.js server (CommonJS)
│   ├── index.ts                  # renderUI() — Express middleware wrapping Next.js
│   └── tsconfig.json             # Server TS config (module: commonjs, strict)
├── src/
│   ├── app/                      # Next.js App Router — file-based routing
│   │   ├── layout.tsx            # Root layout: <html>, <head>, MUI ThemeProvider
│   │   ├── page.tsx              # Home page ("/")
│   │   ├── page.style.ts         # Co-located page styles
│   │   └── <route>/
│   │       └── page.tsx          # Nested route pages
│   ├── components/               # Shared/reusable components — ONE subdirectory per component
│   │   └── <component-name>/
│   │       ├── <component-name>.tsx       # Component implementation
│   │       └── <component-name>.style.ts  # Co-located component styles
│   ├── lib/                      # Shared library/utility code
│   │   └── style.ts             # defineCss() helper + font family constants
│   ├── providers/                # React context providers
│   │   ├── theme.provider.tsx    # MUI ThemeProvider wrapper (dark mode, CssBaseline, GlobalStyles)
│   │   └── global.style.ts      # Global CSS reset styles
│   ├── services/                 # API service layer (@canlooks/ajax decorator-based)
│   │   ├── root.ts               # RootService base class with interceptors
│   │   ├── urls.ts               # API URL resolution (dev/production)
│   │   └── *.ts                  # Domain services extending RootService
│   ├── stores/                   # State management (@canlooks/statio)
│   │   └── *.ts                  # One store per file, class-based
│   └── types/                    # Ambient type declarations (NEVER import from here)
│       ├── emotion-env.d.ts      # Emotion css prop type reference
│       └── *.d.ts                # Domain types as declare namespace
└── test/                         # Test files
    ├── tsconfig.json             # Extends root, CommonJS module
    └── *.ts                      # Test files
```

### Key Structural Rules:

- **Next.js App Router routing** — routes are defined by the file system under `src/app/`. Each route folder has a `page.tsx`. Layouts use `layout.tsx`.
- **One component per directory** — each component lives in its own subdirectory under `src/components/` with co-located `.tsx` and `.style.ts` files. NEVER place multiple components in one directory.
- **components/** uses kebab-case subdirectory names matching the component name (e.g., `example/` → `Example` component).
- **providers/** contains `theme.provider.tsx` (MUI theme wrapper) and `global.style.ts` (CSS reset).
- **services/** uses class-based decorator pattern — each domain service extends `RootService`. Service files use kebab-case.
- **stores/** uses class-based stores with `createStore()` — one store per file. Store files use kebab-case.
- **types/** contains `.d.ts` files with `namespace` declarations — NEVER import from `src/types/`.
- **lib/** contains shared utilities: `style.ts` provides `defineCss()`, `defaultFontFamily`, and `defaultMonospaceFontFamily`.
- Server compiles to CommonJS via its own `tsconfig.json`. Compiled output (`server/*.js`, `server/*.d.ts`) is gitignored.
- Config files at the root use `.mts` extension (ESM TypeScript) — `next.config.ts` is the exception, Next.js expects `.ts`.
- `next-env.d.ts` is auto-generated — never manually edit.

---

## 2. Coding Conventions

### 2.1 Component Pattern

#### Client Components

```tsx
'use client'  // REQUIRED for components using hooks, event handlers, or browser APIs

import {memo} from 'react'
import {Stack, Button} from '@mui/material'
import {style} from './<name>.style'
import {useStore} from '@/stores/<store-name>'

export const ComponentName = memo(() => {
    // hooks at top
    const store = useStore('property')

    // event handlers MUST use 'Handler' suffix
    const clickHandler = () => {
        // ...
    }

    return (
        <Stack css={style} spacing={3}>
            <Button variant="contained" onClick={clickHandler}>Action</Button>
        </Stack>
    )
})
```

#### App Router Pages and Layouts (`page.tsx` / `layout.tsx`)

Next.js App Router file conventions require a default export from route files. For `src/app/**/page.tsx` and `src/app/**/layout.tsx`, define the component as a local `const` and export it as the default at the bottom. Do this for both server and client route files.

Client route files may still use `'use client'` and hooks, but they MUST NOT use `export const Page = ...` as the public component export. If a client route needs memoization, wrap the local const initializer with `memo(...)` and still export it only as default.

```tsx
import {ReactNode} from 'react'
import {ThemeProvider} from '@/providers/theme.provider'

const AppLayout = ({children}: {
    children: ReactNode
}) => {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <title>Project Title</title>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <link rel="icon" href="/logo.png"/>
        </head>
        <body>
        <ThemeProvider>
            {children}
        </ThemeProvider>
        </body>
        </html>
    )
}

export default AppLayout
```

**Rules:**
- **Shared client components outside `src/app/**/page.tsx` and `src/app/**/layout.tsx`**: ALWAYS use named exports (`export const X = memo(...)`). NEVER `export default` for components in `src/components/`.
- **App Router `page.tsx` and `layout.tsx` files**: ALWAYS use `const ComponentName = (...) => { ... }` followed by `export default ComponentName`. This satisfies Next.js route-file requirements while keeping component names explicit.
- ALWAYS wrap shared client components in `memo()`. For client `page.tsx` files, memoization is optional; if used, write `const PageName = memo(() => { ... })` and `export default PageName`.
- Event handler functions MUST use the `Handler` suffix (e.g., `clickHandler`, `changeHandler`, `submitHandler`).
- Hooks go at the top of the component body, before any handlers or derived values.
- NEVER use `React.FC` type annotation — let TypeScript infer the return type.
- Add `'use client'` directive at the VERY TOP of the file when the component uses hooks, event handlers, or browser APIs.
- `layout.tsx` is usually a server component (no `'use client'`). It imports client providers.
- Components in `src/components/` MUST use `export const X = memo(...)` pattern.
- **Ref passing**: Components wrapping a single JSX element pass `ref` through `{...props}` — do NOT use `forwardRef`. Simply extend `ComponentProps<'div'>` (or the appropriate element) and spread `{...props}` to the root element. `forwardRef` is reserved ONLY for components that expose imperative APIs via `useImperativeHandle`.

### 2.2 Import Order

Imports MUST follow this order with a blank line between groups:

```tsx
// 1. React and core libraries
import {memo, useState} from 'react'

// 2. Next.js
import {useRouter} from 'next/navigation'

// 3. MUI (Material UI)
import {Button, Stack, Typography} from '@mui/material'

// 4. Third-party libraries (emotion, canlooks packages, etc.)
import {css} from '@emotion/react'
import {useExampleStore} from '@/stores/example'

// 5. Internal absolute imports (@/ alias)
import {defineCss} from '@/lib/style'
import {ExampleService} from '@/services/example'

// 6. Relative imports (same directory)
import {style} from './<name>.style'
```

**Rules:**
- Group 1-4: external packages (alphabetical within group)
- Group 5: absolute `@/` imports (alphabetical by path)
- Group 6: relative `./` imports (alphabetical)
- One blank line between groups
- Use named imports — avoid default imports except for Next.js layouts

### 2.3 Styling Convention

Styles are defined in **co-located `.style.ts` files** using `@emotion/react`'s `css` template literal wrapped in `defineCss()` from `@/lib/style`.

#### Component Style File (`<name>.style.ts`)

```ts
import {defineCss} from '@/lib/style'
import {css} from '@emotion/react'

export const style = defineCss(({palette: {secondary}}) => css`
    align-items: center;
    
    .nested-class {
        color: ${secondary.main};
        font-weight: 700;
    }
`)
```

#### Global Style File (for CSS reset / layout styles)

```ts
import {css} from '@emotion/react'
import {defineCss} from '@/lib/style'

export const style = defineCss(() => css`
    html, body, #app {
        height: 100%;
    }
`)
```

#### The `defineCss` Helper (`src/lib/style.ts`)

```ts
import {Theme, useTheme} from '@mui/material'
import {useMemo} from 'react'

export function defineCss<T>(callback: (theme: Theme) => T): () => T {
    return () => {
        const theme = useTheme()
        return useMemo(() => callback(theme), [theme])
    }
}
```

#### Using Styles in Components

```tsx
<Stack css={style}>           {/* Root element uses css prop with style */}
    <div className="nested">  {/* Nested elements use className */}
        ...
    </div>
</Stack>
```

**Rules:**
- EVERY component MUST have a co-located `.style.ts` file. Global styles live in `src/providers/global.style.ts`.
- ALWAYS use `defineCss` from `@/lib/style` for MUI theme-aware styles.
- NEVER use inline styles or `style={{}}` objects — always use the emotion `css` prop.
- NEVER use CSS modules, SCSS, or plain `.css` files.
- Style files export named constants (`export const style = ...`), not default exports.
- For nested element styling, use CSS class selectors (`.nested-class`) INSIDE the emotion template literal.
- Access MUI theme tokens via callback destructuring: `({palette: {primary, secondary}}) => ...`.
- `next.config.ts` MUST have `compiler: { emotion: true }` for SSR compilation.
- ESLint rule `'react/no-unknown-property': [2, {'ignore': ['css']}]` allows the `css` prop.
- Define shared styles/font constants in `src/lib/style.ts`: `defaultFontFamily`, `defaultMonospaceFontFamily`.

### 2.4 Layout Pattern

```tsx
// src/app/layout.tsx — Root layout (server component)
import {ReactNode} from 'react'
import {ThemeProvider} from '@/providers/theme.provider'

const AppLayout = ({children}: {
    children: ReactNode
}) => {
    return (
        <html lang="en" suppressHydrationWarning>
        <head>
            <title>Project Title</title>
            <meta charSet="UTF-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            <link rel="icon" href="/logo.png"/>
        </head>
        <body>
        <ThemeProvider>
            {children}
        </ThemeProvider>
        </body>
        </html>
    )
}

export default AppLayout
```

**Rules:**
- Root layout MUST define a local `const AppLayout = (...) => { ... }` and end with `export default AppLayout` (Next.js requirement).
- `<html>` and `<body>` tags are defined in the root layout — NEVER in other components.
- Providers are wrapped in order: ThemeProvider (contains MUI theme + CssBaseline + GlobalStyles) → {children}.
- `<html>` MUST have `suppressHydrationWarning` for MUI dark mode SSR.

### 2.5 Service Pattern

#### Root Service (`src/services/root.ts`)

```ts
import {AjaxError, AjaxResponse, Config, RequestInterceptor, ResolvedConfig, ResponseInterceptor, Service} from '@canlooks/ajax'
import {root} from './urls'

@Config({
    url: root,
    headers: {
        'Content-Type': 'application/json'
    }
})
export class RootService extends Service {
    @RequestInterceptor
    static requestInterceptor(config: ResolvedConfig) {
        if (!config.url!.startsWith('/login')) {
            config.headers.set('token', 'your_token_here')
        }
        return config
    }

    @ResponseInterceptor
    static responseInterceptor(res: AjaxResponse<any>, error: AjaxError, config: ResolvedConfig) {
        if (error) {
            throw error
        }
        const {result} = res
        return result
    }
}
```

#### Domain Service (`src/services/<name>.ts`)

```ts
import {RootService} from './root'
import {Config} from '@canlooks/ajax'

@Config({url: '/example'})
export class ExampleService extends RootService {
    static getList() {
        return this.get('/list')
    }

    static create(data: Record<string, unknown>) {
        return this.post('/create', {data})
    }
}
```

**Rules:**
- `RootService` extends `Service` from `@canlooks/ajax`.
- Each domain service file contains ONE service class that extends `RootService`.
- Service file names use **kebab-case**: `user-auth.ts`, `data-export.ts`.
- Service class names use **PascalCase**: `UserAuthService`, `DataExportService`.
- Use `@Config` decorator at class level for the base URL path (relative to `root`).
- Use `@RequestInterceptor` / `@ResponseInterceptor` for global request/response handling.
- Service methods are `static` — call them as `ServiceName.method()`.
- API base URL is resolved via `services/urls.ts` from environment variables.
- NEVER use `fetch` or `axios` directly — always use `@canlooks/ajax` Service classes.

### 2.6 Store Pattern

```ts
import {createStore, SetStateMethod} from '@canlooks/statio'

class ExampleStore {
    constructor(private set: SetStateMethod<ExampleStore>) {
    }

    msg = 'Hello!'
    items: Item[] = []

    updateMsg(newMsg: string) {
        this.set({msg: newMsg})
    }
}

export const useExampleStore = createStore(ExampleStore)
```

#### Using Stores in Components

```tsx
const exampleStore = useExampleStore('msg', 'updateMsg')

// Read:  exampleStore.msg
// Write: exampleStore.updateMsg('new value')
```

**Rules:**
- Stores are plain classes with observable properties and methods.
- Constructor MUST accept `private set: SetStateMethod<ClassName>` for state updates.
- Export a hook via `createStore(ClassName)`.
- Hook names follow `use<Name>Store` convention.
- Store file names use **kebab-case**: `user-store.ts`, `data-store.ts`.
- NEVER use `useState` or `useReducer` for global/shared state — use statio stores.
- For truly local component-only state, `useState` is acceptable.
- When consuming a store in a component, explicitly list the properties/methods you need as string arguments to `useStore(...)`.

### 2.7 URLs / Environment Variables

```ts
// src/services/urls.ts
export const root = process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_DEV_SERVER === 'remote'
    ? process.env.NEXT_PUBLIC_API_URL
    : typeof location !== 'undefined'
        ? location.origin
        : ''
```

```sh
# .env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

**Rules:**
- Client-exposed env vars MUST use `NEXT_PUBLIC_` prefix.
- Use `process.env.NEXT_PUBLIC_*` (not `import.meta.env`).
- `urls.ts` handles dev/production URL resolution logic.
- In development with `NEXT_PUBLIC_DEV_SERVER=remote`, uses the remote API URL.
- In development without remote flag or production, uses `location.origin`.

### 2.8 Type Declarations

```ts
// src/types/emotion-env.d.ts — Emotion css prop type support (REQUIRED)
/// <reference types="@emotion/react/types/css-prop"/>

// src/types/<domain>.d.ts — domain types (ambient, NO import needed)
/**
 * types内的文件无需import
 */

declare namespace Example {
    type Item = {
        id: number
        name: string
    }
}
```

**Rules:**
- Types in `src/types/` are **ambient declarations** — NEVER `import` or `export` from this directory.
- Use `declare namespace` for domain type groupings.
- Each `.d.ts` file MUST start with the comment: `/** types内的文件无需import */`.
- File names in `src/types/` use **kebab-case**: `user-types.d.ts`, `api-types.d.ts`.
- The `emotion-env.d.ts` file enables the `css` prop on all JSX elements — it is REQUIRED.
- For non-ambient shared types, define them alongside the code that uses them (not in `src/types/`).

### 2.9 Custom Server

```ts
// server/index.ts
import next from 'next'
import {NextFunction, Request, Response} from 'express'
import {NextBundlerOptions, NextServerOptions} from 'next/dist/server/next'
import path from 'path'

export type RenderOptions = NextServerOptions & NextBundlerOptions

export default function renderUI(options: RenderOptions = {}) {
    const dev = process.env.NODE_ENV === 'development'
    const nextApp = next({
        dev,
        dir: path.join(__dirname, '..'),
        ...options
    })
    const nextAppPrepare = nextApp.prepare()

    return async (req: Request, res: Response, next: NextFunction) => {
        if (req.method !== 'GET' && !req.originalUrl.startsWith('/__nextjs')) {
            return next()
        }
        await nextAppPrepare
        await nextApp.getRequestHandler()(req, res)
    }
}
```

**Rules:**
- The Express custom server lives in `server/index.ts`.
- It exports a `renderUI` function that returns an Express middleware.
- Only GET requests and Next.js internal requests (`/__nextjs`) are forwarded to Next.js — other methods pass through to Express routes.
- Server TypeScript compiles to CommonJS (`server/tsconfig.json` has `"module": "commonjs"`).
- Compiled server output (`server/*.js`, `server/*.d.ts`) is gitignored.
- Server build: `npm run build:server` → `tsc -p server/tsconfig.json`.

---

## 3. TypeScript Configuration

### Root `tsconfig.json` (SRC code)

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noImplicitOverride": true,
    "noEmit": true,
    "allowJs": true,
    "incremental": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "isolatedModules": true,
    "resolveJsonModule": true,
    "experimentalDecorators": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

**Key settings:**
- `strict: true` — full strict mode. Never relax this.
- `noUnusedLocals: true` — no unused local variables.
- `noImplicitOverride: true` — must use `override` keyword when overriding methods.
- `noEmit: true` — TypeScript only checks types; Next.js handles compilation.
- `experimentalDecorators: true` — REQUIRED for `@canlooks/ajax` decorators (`@Config`, `@RequestInterceptor`, etc.).
- `paths`: `@/*` → `./src/*` — ALL module imports use this path alias for internal code.
- `jsx: "react-jsx"` — React 19 JSX transform.

### Server `tsconfig.json`

```json
{
  "compilerOptions": {
    "rootDir": ".",
    "target": "esnext",
    "module": "commonjs",
    "moduleResolution": "bundler",
    "strict": true,
    "declaration": true,
    "skipLibCheck": true,
    "esModuleInterop": true
  }
}
```

### Test `tsconfig.json`

```json
{
  "extends": "../tsconfig.json",
  "compilerOptions": {
    "module": "CommonJS",
    "noUnusedLocals": false
  }
}
```

---

## 4. Technology Stack

### Core (REQUIRED — never change)

| Technology | Version | Purpose |
|---|---|---|
| `react` & `react-dom` | ^19 | UI framework |
| `next` | ^16 | Full-stack React framework (App Router) |
| `@emotion/react` | ^11 | CSS-in-JS styling (with SSR support) |
| `@emotion/styled` | ^11 | Styled component wrappers for MUI |
| `@canlooks/statio` | ^1 | Global state management |
| `@canlooks/ajax` | ^5 | HTTP request management (decorator-based) |
| `typescript` | ^6 | Type system |

### UI Framework

| Technology | Version | Purpose |
|---|---|---|
| `@mui/material` | ^9 | Material UI component library |
| `@mui/icons-material` | ^9 | MUI icon set |
| `@fontsource/roboto` | ^5 | Roboto font (MUI default) |

### Dev Tools

| Technology | Version | Purpose |
|---|---|---|
| `eslint` | ^9 | Linting (flat config) |
| `typescript-eslint` | ^8 | TypeScript ESLint rules |
| `eslint-plugin-react` | ^7 | React linting rules |
| `eslint-plugin-react-hooks` | ^7 | React hooks linting rules |
| `dayjs` | ^1 | Date utilities |
| `color` | ^5 | Color manipulation |
| `react-transition-group` | ^4 | Transition animations (MUI dependency) |

**Rules:**
- NEVER add alternative state management libraries (Redux, Zustand, MobX) — use `@canlooks/statio`.
- NEVER add alternative HTTP libraries (axios, ky, got) — use `@canlooks/ajax`.
- NEVER add alternative CSS solutions (Tailwind, CSS Modules, styled-components) — use `@emotion/react`.
- NEVER change the UI framework without explicit instruction. This project uses MUI.

---

## 5. ESLint Configuration

```ts
// eslint.config.mts — Flat config format
import js from '@eslint/js'
import globals from 'globals'
import tsEslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginReactHooks from 'eslint-plugin-react-hooks'
import {defineConfig, globalIgnores} from 'eslint/config'

export default defineConfig([
    {
        files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
        plugins: {js},
        extends: ['js/recommended'],
        languageOptions: {globals: globals.browser}
    },
    tsEslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    pluginReactHooks.configs.flat.recommended,
    {
        rules: {
            'no-case-declarations': 0,
            '@typescript-eslint/ban-ts-comment': 0,
            '@typescript-eslint/no-explicit-any': 0,
            '@typescript-eslint/no-unused-expressions': 0,
            'react/display-name': 0,
            'react/react-in-jsx-scope': 0,
            'react/no-unknown-property': [2, {'ignore': ['css']}]
        }
    },
    globalIgnores(['test'])
])
```

**Key rules:**
- Flat config format (ESLint 9).
- `'react/no-unknown-property': [2, {'ignore': ['css']}]` — CRITICAL: allows emotion `css` prop.
- `'react/react-in-jsx-scope': 0` — not needed with React 19 JSX transform.
- `'@typescript-eslint/ban-ts-comment': 0` — `@ts-ignore` is allowed (use sparingly).
- Test files are globally ignored by ESLint.

---

## 6. Naming Conventions Summary

| Element | Convention | Example |
|---|---|---|
| Component directories (under `components/`) | kebab-case | `user-profile/`, `data-table/` |
| Component files | kebab-case `*.tsx` | `user-profile.tsx`, `data-table.tsx` |
| Style files | kebab-case `*.style.ts` | `user-profile.style.ts` |
| Page style files | `*.style.ts` (co-located with page) | `page.style.ts` |
| Service files | kebab-case `*.ts` | `user-auth.ts`, `report-service.ts` |
| Service classes | PascalCase | `UserAuthService`, `ReportService` |
| Store files | kebab-case `*.ts` | `user-store.ts`, `ui-store.ts` |
| Store classes | PascalCase | `UserStore`, `UIStore` |
| Store hooks | `use<PascalCase>Store` | `useUserStore`, `useUIStore` |
| Provider files | kebab-case `*.provider.tsx` | `theme.provider.tsx` |
| Type declaration files | kebab-case `*.d.ts` | `user-types.d.ts`, `api-types.d.ts` |
| Shared React components | PascalCase (named export) | `export const UserProfile = memo(...)` |
| Layout/page components | PascalCase local const + default export | `const AppLayout = (...) => { ... }` then `export default AppLayout` |
| Event handlers | camelCase + `Handler` suffix | `clickHandler`, `submitHandler` |
| CSS class names (in emotion) | kebab-case | `.user-card`, `.error-message` |

---

## 7. Quick Reference: Adding New Features

### Adding a New Page

```
src/app/<route-name>/
└── page.tsx          # default-exported route component + styles
```

- Page file: use `const PageName = () => { ... }` followed by `export default PageName` (Next.js route-file requirement).
- Client page file: add `'use client'` at the top when hooks, event handlers, or browser APIs are used; if memoization is desired, write `const PageName = memo(() => { ... })` followed by `export default PageName`.
- Co-locate styles in the same directory if needed.

### Adding a New Component

```
src/components/<component-name>/
├── <component-name>.tsx        # export const ComponentName = memo(...)
└── <component-name>.style.ts   # export const style = defineCss(...)
```

### Adding a New Service

```
src/services/<service-name>.ts
```

- Extend `RootService`, use `@Config` decorator, static methods.

### Adding a New Store

```
src/stores/<store-name>.ts
```

- Class with `SetStateMethod<ClassName>` constructor, `createStore()` export.

### Adding New Ambient Types

```
src/types/<type-name>.d.ts
```

- `declare namespace` blocks, NEVER import/export, MUST start with comment.

---

## 8. Anti-Patterns (BLOCKING violations)

- ❌ Using `export default` for components in `src/components/` — use named `export const X = memo(...)`.
- ❌ Using inline `style={{}}` or `sx` prop — use emotion `css` prop with `defineCss`.
- ❌ Using CSS modules, Tailwind, SCSS, or plain CSS files.
- ❌ Using `fetch`, `axios`, or raw HTTP calls — use `@canlooks/ajax` Service classes.
- ❌ Using `useState`/`useReducer` for global state — use `@canlooks/statio` stores.
- ❌ Importing from `@/types/` — types are ambient and auto-available.
- ❌ Skipping `memo()` on shared client components in `src/components/`.
- ❌ Using named exports as the route component API in `src/app/**/page.tsx` or `src/app/**/layout.tsx` — use a local const plus `export default ComponentName`.
- ❌ Skipping the `Handler` suffix on event handler functions.
- ❌ Not using `'use client'` directive on client components.
- ❌ Using `React.FC` type annotation.
- ❌ Using `forwardRef` when the component just wraps a single DOM element — pass `ref` through `{...props}` instead.
- ❌ Defining multiple exported components in one file.
- ❌ Adding packages not in the approved technology stack without explicit instruction.
