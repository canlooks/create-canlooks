---
name: coding-standards-skill
description: Coding standards, file structure conventions, and toolchain usage for the React + Vite + MUI template project. Use this skill whenever working on this codebase — writing new components, views, stores, services, or styles. Also triggers when the user asks about project conventions, file organization, how to structure code, which libraries to use, or how to follow the project's patterns.
---

# Coding Standards — React + Vite + MUI Template

This document defines the coding standards, file structure, and toolchain conventions for the **react-mui** template project. All code written for this project **must** follow these standards.

---

## 1. Tech Stack

| Category | Library | Version | Purpose |
|---|---|---|---|
| Runtime | `react`, `react-dom` | ^19.2 | UI framework |
| Language | `typescript` | ^6.0 | Type safety |
| Build | `vite` | ^8.0 | Dev server & bundler |
| UI Kit | `@mui/material` | ^9.0 | Material Design components |
| CSS-in-JS | `@emotion/react`, `@emotion/styled` | ^11.14 | Styling engine (MUI's dependency) |
| Icons | `@mui/icons-material` | ^9.0 | Material Icons |
| Font | `@fontsource/roboto` | ^5.2 | Default typeface |
| Routing | `@canlooks/react-router` | ^2.0 | Client-side routing |
| State | `@canlooks/statio` | ^1.0 | Class-based reactive store |
| HTTP | `@canlooks/ajax` | ^5.0 | Decorator-based HTTP client |
| Date | `dayjs` | ^1.11 | Date manipulation |
| Color | `color` | ^5.0 | Color utilities |
| Lint | `eslint` + `typescript-eslint` + `eslint-plugin-react` + `eslint-plugin-react-hooks` | ^9 | Code quality |

---

## 2. File Structure

```
src/
├── main.tsx                    # Entry point — mounts React root
├── app/                        # Application shell
│   ├── app.tsx                 # Theme provider, global styles, router mount
│   ├── app.style.ts            # Global CSS (body, #app reset)
│   └── routes.tsx              # Route table (RouteItem)
├── components/                 # Reusable UI components
│   └── <name>/                 # One directory per component
│       ├── <name>.tsx          # Component logic + JSX
│       └── <name>.style.ts     # Component-scoped styles
├── lib/                        # Shared utilities / helpers
│   └── style.ts                # Style utilities: defineCss, font families
├── services/                   # API service layer
│   ├── root.ts                 # Base service (interceptors, common config)
│   ├── urls.ts                 # API base URL from env
│   └── <domain>.ts             # Domain-specific services
├── stores/                     # Reactive state stores
│   └── <name>.ts               # Class-based store (one per file)
├── types/                      # Ambient type declarations (.d.ts)
│   ├── env.d.ts                # Vite env type augmentation
│   └── <name>.d.ts             # Global type namespaces
└── views/                      # Page-level components (route targets)
    └── <name>/                 # One directory per view
        ├── <name>.tsx          # View component
        └── <name>.style.ts     # View-scoped styles
```

### Key rules:

- **Every component and view** lives in its own directory, paired with a co-located `<name>.style.ts` file.
- **`lib/`** is for framework-agnostic utilities (not React components).
- **`types/`** files are ambient — they are `.d.ts` files that do **not** need to be imported. Use them for global type extensions or shared namespaces.
- **`services/`** and **`stores/`** are flat — no nesting. Each domain gets one file.
- **No barrel files (`index.ts`)** are used in this project.

---

## 3. Component Conventions

### 3.1 Component Declaration

Every component **must** be a **named export**, wrapped in `React.memo`, using an **arrow function**:

```tsx
import { memo } from 'react'
import { Stack, Typography } from '@mui/material'
import { style } from './<name>.style'

export const MyComponent = memo(() => {
    return (
        <Stack css={style}>
            <Typography>Hello</Typography>
        </Stack>
    )
})
```

**Rules:**
- Always use `memo()` on every component — it's the project default.
- Always use **named exports** (`export const Xxx = ...`), never `export default`.
- Component file name is **kebab-case** matching the directory (e.g., `my-component/` → `my-component.tsx`).
- Component export name is **PascalCase**.

### 3.2 App Entry Point

`main.tsx` is minimal — it only mounts the root component:

```tsx
import { createRoot } from 'react-dom/client'
import { App } from './app/app'

createRoot(document.getElementById('app')!).render(<App />)
```

- The root DOM element is `#app` (defined in `index.html`).
- Never add logic or providers here — they belong in `App`.

---

## 4. Style Conventions

### 4.1 Project Styling System

This project uses **Emotion** (CSS-in-JS) via MUI's theme integration. The project provides a custom `defineCss` utility in `@/lib/style` that binds to the MUI theme:

```ts
// lib/style.ts
import { Theme, useTheme } from '@mui/material'
import { useMemo } from 'react'

export function defineCss<T>(callback: (theme: Theme) => T): () => T {
    return () => {
        const theme = useTheme()
        return useMemo(() => callback(theme), [theme])
    }
}
```

### 4.2 Style File Pattern

Every component/view has a co-located `<name>.style.ts` that exports a single `style` constant:

```ts
// <name>.style.ts
import { defineCss } from '@/lib/style'
import { css } from '@emotion/react'

export const style = defineCss(({ palette: { secondary } }) => css`
    align-items: center;

    .message {
        color: ${secondary.main};
        font-weight: 700;
    }
`)
```

**Rules:**
- Always import `css` from `@emotion/react` (not `@emotion/css`).
- Use `defineCss()` to get theme access inside your styles.
- Destructure theme properties directly in the callback parameter: `({ palette, spacing, typography })`.
- Use the `css` tagged template literal for styles.
- Apply styles via the `css` prop on MUI components: `<Stack css={style}>`.
- Use **class selectors** (`.className {}`) inside the template literal for nested sub-elements. Do NOT use Emotion's `styled()` or the MUI `styled()`.

### 4.3 Global Styles

Global styles go in `app/app.style.ts`:

```ts
import { css } from '@emotion/react'
import { defineCss } from '@/lib/style'

export const style = defineCss(() => css`
    html, body, #app {
        height: 100%;
    }
`)
```

They are applied via Emotion's `<Global>` component in `App`:

```tsx
<Global styles={style} />
```

### 4.4 Font Families

Default font families are defined in `@/lib/style`:

```ts
export const defaultFontFamily = `-apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, 'Noto Sans', ...`

export const defaultMonospaceFontFamily = `'Consolas', 'SF Mono', ...`
```

Use `defaultFontFamily` in the MUI theme, never hardcode font stacks.

### 4.5 MUI Theme

The theme is created in `app/app.tsx`:

```tsx
const theme = createTheme({
    colorSchemes: { dark: true },
    typography: {
        fontFamily: defaultFontFamily,
    }
})
```

- Always enable `colorSchemes: { dark: true }` — the template supports dark mode by default.
- Wrap the app in `<ThemeProvider theme={theme} defaultMode="dark">`.
- Always include `<CssBaseline enableColorScheme />` for consistent baseline styles.

---

## 5. Service Layer Conventions

### 5.1 Architecture

Services use `@canlooks/ajax` with a **decorator-based class pattern**:

```ts
// services/root.ts
import { AjaxError, AjaxResponse, Config, RequestInterceptor,
         ResolvedConfig, ResponseInterceptor, Service } from '@canlooks/ajax'
import { root } from './urls'

@Config({
    url: root,
    headers: { 'Content-Type': 'application/json' }
})
export class RootService extends Service {
    @RequestInterceptor
    requestInterceptor(config: ResolvedConfig) {
        // Add tokens, modify headers, etc.
        config.headers.set('token', '...')
        return config
    }

    @ResponseInterceptor
    responseInterceptor(res: AjaxResponse<any>, error: AjaxError, config: ResolvedConfig) {
        if (error) {
            // Handle errors centrally
            throw error
        }
        const { result } = res
        // Transform response
        return result
    }
}
```

```ts
// services/urls.ts
export const root = import.meta.env.VITE_API_URL
```

```ts
// services/example.ts
import { RootService } from './root'
import { Config } from '@canlooks/ajax'

@Config({ url: '/example' })
export class ExampleService extends RootService {
    static foo() {
        return this.post('/foo', { data: {} })
    }
}
```

**Rules:**
- `root.ts` defines the **base service** with shared interceptors and headers.
- `urls.ts` reads the API base URL from environment variables.
- Each domain service **extends** `RootService` and adds `@Config({ url: '/path' })`.
- API methods are **static methods** that return the call directly.
- Tokens and auth headers go in `@RequestInterceptor` on `RootService`.
- Error handling goes in `@ResponseInterceptor` on `RootService`.

### 5.2 Environment Variables

- Defined in `env/.env` (custom `envDir` in `vite.config.mts`).
- Typed in `src/types/env.d.ts` via `ImportMetaEnv` augmentation.
- Accessed via `import.meta.env.VITE_*` — always use the `VITE_` prefix.

---

## 6. State Management Conventions

### 6.1 Store Pattern

State management uses `@canlooks/statio` with a **class-based store**:

```ts
// stores/example.ts
import { createStore, SetStateMethod } from '@canlooks/statio'

class ExampleStore {
    constructor(private set: SetStateMethod<ExampleStore>) {}

    msg = 'Hello!'

    sayHello() {
        this.set({ msg: 'Hi!' })
    }
}

export const useExampleStore = createStore(ExampleStore)
```

**Rules:**
- Store files are flat in `src/stores/` (no nesting).
- Each store is a **class** with properties (state) and methods (actions).
- The constructor receives `SetStateMethod<T>` — store it as `private set`.
- Use `this.set({ key: value })` to update state (partial updates merge).
- `createStore()` returns a hook — name it `useXxxStore`.
- One store per file, one file per domain.

### 6.2 Using Stores in Components

```tsx
import { useExampleStore } from '@/stores/example'

export const Example = memo(() => {
    // Selective re-rendering: only re-render when listed properties change
    const exampleStore = useExampleStore('msg', 'sayHello')

    return (
        <div>{exampleStore.msg}</div>
        <button onClick={exampleStore.sayHello}>Say</button>
    )
})
```

**Rules:**
- Always pass the specific property/method names you consume to the hook: `useXxxStore('prop1', 'method1')`.
- This enables **selective re-rendering** — the component only updates when those specific items change.
- Do NOT destructure: `const { msg } = useExampleStore()` — this subscribes to everything.

---

## 7. Routing Conventions

Routing uses `@canlooks/react-router`:

```tsx
// app/routes.tsx
import { RouteItem } from '@canlooks/react-router'
import { Index } from '@/views/index'

export const routeEntry: RouteItem = {
    page: <Index />
}
```

```tsx
// app/app.tsx
import { Router } from '@canlooks/react-router'
import { routeEntry } from './routes'

<Router entry={routeEntry} />
```

**Rules:**
- Route configuration is a single `RouteItem` tree in `app/routes.tsx`.
- Each route's `page` prop references a view component from `@/views/`.
- Routes support nested children via the `children` array on `RouteItem`.
- The `<Router>` is mounted inside `App`.

---

## 8. TypeScript Conventions

### 8.1 Configuration

```json
{
    "compilerOptions": {
        "strict": true,
        "noUnusedLocals": true,
        "noImplicitOverride": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "jsx": "react-jsx",
        "jsxImportSource": "@emotion/react",
        "moduleResolution": "bundler",
        "paths": { "@/*": ["./src/*"] }
    }
}
```

### 8.2 Path Alias

- `@/` maps to `src/` — use it for all cross-directory imports.
- Example: `import { defineCss } from '@/lib/style'`

### 8.3 Ambient Type Declarations

Types in `src/types/` are **ambient** (`.d.ts` files). They do not need to be imported:

```ts
// types/example.d.ts
declare namespace Example {
    type ExampleType = {
        id: number
        name: string
    }
}
```

Then use `Example.ExampleType` anywhere without importing.

**Rules:**
- Use `declare namespace Xxx { ... }` for domain types.
- Use `.d.ts` extension — these files are not modules.
- **Env types** go in `env.d.ts` augmenting `ImportMetaEnv`.
- Do NOT put type files inside `components/` or `views/` — all shared types go in `types/`.

### 8.4 Implicit Rules

- `@ts-ignore` / `@ts-expect-error` are allowed by ESLint config but **use sparingly**.
- `any` is allowed by ESLint but **avoid** — prefer proper types.
- `noUnusedLocals: true` is enforced by the compiler — unused variables cause build failures.

---

## 9. Import Order Convention

Imports follow this order with a blank line between groups:

```tsx
// 1. React and third-party libraries
import { memo } from 'react'
import { Stack, Typography } from '@mui/material'
import { css } from '@emotion/react'

// 2. Relative imports (same directory or nearby)
import { style } from './index.style'

// 3. Absolute imports (@/ alias)
import { Example } from '@/components/example/example'
import { defineCss } from '@/lib/style'
```

---

## 10. Component vs. View Distinction

| Aspect | `components/` | `views/` |
|---|---|---|
| Purpose | Reusable UI elements | Page-level (route targets) |
| Dependencies | Stores, services, lib | Components, stores |
| Routing | Never directly in routes | Always referenced in `routes.tsx` |
| Nesting | May contain sub-directories | Flat — one directory per view |

---

## 11. Build & Dev Commands

```shell
npm run dev       # Start Vite dev server
npm run build     # Type-check + production build
npm run test      # Run test script (test/test.ts via ts-node)
```

- `build` runs `tsc --noEmit` first to type-check, then `vite build`.
- `vite.config.mts` defines the `@/` alias and custom `envDir`.
- Output goes to `dist/` (cleaned before each build: `emptyOutDir: true`).

---

## 12. Checklist: Adding a New Feature

When adding a new feature, create files in this order:

1. **`src/types/<feature>.d.ts`** — Shared type declarations (if needed)
2. **`src/services/<feature>.ts`** — API service extending `RootService`
3. **`src/stores/<feature>.ts`** — State store (if needed)
4. **`src/components/<feature>/<feature>.tsx` + `<feature>.style.ts`** — Reusable UI (if needed)
5. **`src/views/<feature>/<feature>.tsx` + `<feature>.style.ts`** — Page component
6. **`src/app/routes.tsx`** — Add route entry

---

## 13. Anti-Patterns (NEVER do these)

- ❌ `export default` — always use named exports
- ❌ `const { prop } = useXxxStore()` — always pass property names for selective re-rendering
- ❌ `import { css } from '@emotion/css'` — always `@emotion/react`
- ❌ `styled()` from MUI or Emotion — use `defineCss()` + `css` prop instead
- ❌ Type files in `components/` or `views/` — put shared types in `types/`
- ❌ Barrel `index.ts` files — this project does not use them
- ❌ Direct `fetch()` or `axios` — use `@canlooks/ajax` service classes
- ❌ `useState` for shared state — use `@canlooks/statio` stores
- ❌ Hardcoded font stacks — use `defaultFontFamily` from `@/lib/style`
- ❌ Missing `memo()` on components — wrap every component in `memo()`
