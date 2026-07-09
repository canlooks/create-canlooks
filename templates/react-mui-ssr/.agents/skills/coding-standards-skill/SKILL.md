---
name: coding-standards-skill
description: Use this skill whenever creating, modifying, reviewing, or refactoring code in the MUI-based Canlooks Next.js SSR template. It defines the current project file structure, component/page conventions, Emotion styling model, MUI theme setup, @canlooks/statio stores, @canlooks/ajax services, custom server, TypeScript/ESLint settings, and dependency choices. Trigger strongly for requests like add page, create component, add service, add store, update styles, use project conventions, follow coding standards, or new file.
---

# Coding Standards Skill

This project is the `react-mui-ssr` Canlooks template: Next.js App Router, React 19, MUI 9, Emotion SSR, `@canlooks/statio`, and `@canlooks/ajax`.

Before changing code, inspect the nearby files and keep the existing local style. If this skill and the checked-in code disagree, treat the checked-in code as the source of truth and avoid broad style-only rewrites.

## Current Structure

Keep the project organized around these owners:

```text
/
├── AGENTS.md
├── README.md
├── package.json
├── package-lock.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mts
├── public/
│   └── logo.png
├── server/
│   ├── index.ts
│   └── tsconfig.json
├── test/
│   ├── tsconfig.json
│   └── *.ts / *.tsx
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── page.style.ts
    │   ├── logo.png
    │   └── <route>/page.tsx
    ├── components/
    │   └── <componentName>/
    │       ├── <componentName>.tsx
    │       └── <componentName>.style.ts
    ├── lib/
    │   ├── classNames.ts
    │   ├── ref.ts
    │   ├── router.ts
    │   └── style.ts
    ├── providers/
    │   ├── emotion.provider.tsx
    │   ├── global.style.ts
    │   └── theme.provider.tsx
    ├── services/
    │   ├── root.service.ts
    │   ├── urls.ts
    │   └── <domain>.services.ts
    ├── stores/
    │   ├── system.store.ts
    │   └── <domain>.store.ts
    └── types/
        ├── emotionEnv.d.ts
        └── <domain>.d.ts
```

Add new code under the existing owner instead of creating new top-level folders unless the feature clearly needs a new domain boundary.

## General Code Style

- Use TypeScript, 4-space indentation, single quotes, no semicolons, and the current JSX formatting style (`<Component/>` for empty elements).
- File and directory names use camelCase unless a framework requires a fixed name such as `page.tsx`, `layout.tsx`, `next.config.ts`, `tsconfig.json`, or `eslint.config.mts`.
- Component directories under `src/components/` use the same camelCase basename as their component file: `globalSnackbar/globalSnackbar.tsx`.
- Prefer named imports. Use default imports when the dependency or local pattern expects them, such as `next`, `path`, `Color`, `createCache`, or the default-exported `EmotionProvider`.
- Keep imports readable and stable. When adding imports, prefer this grouping when it fits the file: React/Next, MUI, other packages, `@/` internal imports, then relative imports. Do not churn unrelated imports only to sort them.
- Use `type` imports for types when it improves clarity or avoids runtime imports, following existing files such as `globalSnackbar.tsx`.
- Avoid unrelated formatting changes. This template values small, local edits.

## App Router Pages And Layout

Route files live in `src/app/**`.

- `page.tsx` and `layout.tsx` use default exports because Next.js App Router requires them.
- Prefer a local named const and default export at the bottom:

```tsx
const AppPage = memo(() => {
    return (
        <Stack css={style}>
            ...
        </Stack>
    )
})

export default AppPage
```

- Add `'use client'` at the top of files that use hooks, event handlers, browser APIs, or client-only components directly.
- Client pages may use `memo()`. Server layouts normally do not.
- The root layout owns `<html>`, `<head>`, and `<body>`. Do not render those tags in shared components.
- Keep the root provider chain as:

```tsx
<EmotionProvider>
    <ThemeProvider>
        {children}
        <GlobalSnackbar/>
    </ThemeProvider>
</EmotionProvider>
```

- `systemStore` owns static app metadata such as `title` and `subTitle`.

## Components

Shared components live in `src/components/<componentName>/`.

- Use one component directory per reusable component.
- Use a named export for public shared components:

```tsx
'use client'

import {memo} from 'react'
import {Button, Stack} from '@mui/material'

import {useExampleStore} from '@/stores/example.store'

import {style} from './example.style'

export const Example = memo(() => {
    const exampleStore = useExampleStore('msg', 'sayHello')

    return (
        <Stack css={style} spacing={3}>
            <div className="message">{exampleStore.msg}</div>
            <Button variant="contained" onClick={exampleStore.sayHello}>Say Hello!</Button>
        </Stack>
    )
})
```

- Put hooks and store reads near the top of the component body.
- Event handlers defined inside components use the `Handler` suffix, such as `closeHandler` or `submitHandler`.
- Local helper components may be file-local consts/functions when they are implementation details.
- Do not use `React.FC`; type props inline or with a nearby type when useful.
- Use `cloneRef` from `src/lib/ref.ts` when merging refs. Use `forwardRef` only when a component deliberately exposes a ref API.

## Styling

Project-owned styling uses Emotion through the `css` prop and `defineCss`.

- Co-locate component styles in `<componentName>.style.ts`.
- Co-locate app page styles as `page.style.ts` beside `page.tsx` when the page needs styles.
- Style files export named constants, usually `style`.
- Use nested class selectors for internal elements and MUI slot class targeting.

```ts
import {css} from '@emotion/react'

import {defineCss} from '@/lib/style'

export const style = defineCss(({palette: {secondary}}) => css`
    align-items: center;

    .message {
        color: ${secondary.main};
        font-weight: 700;
    }
`)
```

`src/lib/style.ts` provides:

- `defineCss(callback)`, whose callback receives `(theme, customColor)`.
- `alpha(color, value)` and `mixColor(baseColor, mixinColor, weight)`, common wrappers around the `color` library for deriving colors from existing values.

Use the style system in this order:

- First prefer colors from the MUI theme palette, such as `palette.primary.main`, `palette.secondary.main`, `palette.text.primary`, `palette.background.default`, and related palette tokens.
- When a palette color is close but needs transparency, mixing, lightening, darkening, or another calculation, derive the result from the MUI theme palette with the `color` library. Use the existing `alpha()` and `mixColor()` helpers when they fit; add another small wrapper in `src/lib/style.ts` or use `Color(...)` directly when a different calculation is clearer.
- Use `customColors` from `src/providers/theme.provider.tsx` only when the color cannot reasonably be derived from the MUI palette, or when the calculation would be too complex and a semantic project token is clearer.
- Use literal colors only for theme/custom color definitions, hard visual constants, or effects that are clearer as CSS literals.
- For normal component/page typography, write font sizes in `rem` and keep the 16px-root calculation visible in code; for example, a 14px font size is `font-size: ${14 / 16}rem;`.
- Prefer the Emotion `css` prop over `sx` or inline `style={{}}` for project-owned layout and visual styling.
- Global styles live in `src/providers/global.style.ts` and are injected from `ThemeProvider`.

## Theme, Emotion SSR, And Global UI

The provider layer is part of the template contract.

- `src/providers/emotion.provider.tsx` is a client component that creates the Emotion cache and uses `useServerInsertedHTML()` for SSR style insertion.
- `src/providers/theme.provider.tsx` owns:
  - `defaultFontFamily` and `defaultMonospaceFontFamily`
  - `customColors`
  - `ColorContext` and `useColorContext()`
  - MUI `createTheme()`
  - `CssBaseline`
  - global Emotion styles
  - syncing document color scheme/background for dark mode
- Add theme-wide palette or typography changes in `theme.provider.tsx`.
- Add global CSS reset/layout rules in `global.style.ts`.
- `GlobalSnackbar` is mounted once in the root layout and is driven by `snackbar.store.ts`.

## State Stores

Use `@canlooks/statio` for shared client state.

```ts
import {createStore, type SetStateMethod} from '@canlooks/statio'

class ExampleStore {
    constructor(private set: SetStateMethod<ExampleStore>) {
    }

    msg = 'Hello!'

    sayHello() {
        this.set({msg: 'Hi!'})
    }
}

export const useExampleStore = createStore(ExampleStore)
```

- Store files are named `<domain>.store.ts`.
- Store classes are PascalCase and are kept file-local unless there is a clear reason to export them.
- Store hooks are named `use<Domain>Store`.
- Consume stores with explicit selectors: `useExampleStore('msg', 'sayHello')`.
- Use `storage()` from `@canlooks/statio` for persisted stores, as in `appearance.store.ts`.
- For non-component helpers, use `useStore.getState()` only when needed and guard browser-only behavior with `typeof window !== 'undefined'`.
- Use local React state for component-only UI state; use stores for shared state.
- `system.store.ts` is a plain static object for app metadata, not a statio store.

## Services And HTTP

Use `@canlooks/ajax`; do not introduce `fetch`, `axios`, `ky`, or another HTTP client for application APIs.

- `src/services/urls.ts` defines the API root:

```ts
export const root = process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_DEV_SERVER === 'remote'
    ? process.env.NEXT_PUBLIC_API_URL
    : typeof location !== 'undefined'
        ? location.origin
        : ''
```

- `root.service.ts` defines `RootService`, global headers, request interceptors, response interceptors, timeout/auth/network error messages, and snackbar error reporting.
- Domain service files use `<domain>.services.ts`, import `RootService` from `./root.service`, and contain service classes extending `RootService`.

```ts
import {Config} from '@canlooks/ajax'

import {RootService} from './root.service'

@Config({url: '/example'})
export class ExampleService extends RootService {
    static foo() {
        return this.post('/foo', {
            data: {}
        })
    }
}
```

- Service methods are static.
- Use `@Config` for each service base URL.
- Keep shared error behavior in `RootService`; put endpoint-specific logic in domain services.
- Client-exposed environment variables use the `NEXT_PUBLIC_` prefix.

## Types

The template supports both local TypeScript types and ambient domain declarations.

- `src/types/emotionEnv.d.ts` enables Emotion's `css` prop and should stay present.
- `src/types/<domain>.d.ts` is for ambient domain namespaces that should be globally available without imports.

```ts
/**
 * types内的文件无需import
 */

namespace Example {
    type Item = {
        id: string
    }
}
```

- Do not import from `src/types/*.d.ts`.
- Keep component-only prop types near the component.
- Keep store-owned or service-owned exported types near the owner when that makes the dependency clearer, as with `SnackbarQueueItem`.
- Use ambient namespaces sparingly for broad domain models used across many files.

## Utility Modules

Use the existing helpers instead of recreating them.

- `src/lib/classNames.ts`: `clsx(...)` for conditional class name composition.
- `src/lib/ref.ts`: `cloneRef(...)` for merging callback/object refs.
- `src/lib/router.ts`: `replaceLocation(...)`, which uses `location.replace()` on the client and Next `redirect()` on the server.
- `src/lib/style.ts`: Emotion theme/custom-color style helpers.

## Server, Config, And Tooling

- `server/index.ts` exports the default `renderUI(options)` Express middleware and prepares the Next app once.
- The middleware forwards GET and Next internal requests to Next.js; other methods pass through to Express routes.
- `server/tsconfig.json` compiles the server as CommonJS and emits declarations.
- Root `tsconfig.json` uses strict TypeScript, `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `experimentalDecorators: true`, the Next plugin, and the `@/* -> ./src/*` path alias.
- `next.config.ts` keeps `distDir: 'dist'` and `compiler.emotion: true`.
- ESLint uses flat config in `eslint.config.mts`; keep the `react/no-unknown-property` exception for the Emotion `css` prop.
- Test files live under `test/` and are ignored by ESLint through `globalIgnores(['test'])`.

## Dependencies

Stay within the template stack unless the user explicitly asks for a new library or the current stack cannot solve the problem.

- UI: `react`, `react-dom`, `next`, `@mui/material`, `@mui/icons-material`
- Styling: `@emotion/react`, `@emotion/styled`, `@emotion/cache`, `color`, `@fontsource/roboto`
- State: `@canlooks/statio`
- HTTP: `@canlooks/ajax`
- Utilities already present: `dayjs`, `react-transition-group`
- Tooling: TypeScript 6, ESLint 9, TypeScript ESLint, React ESLint plugins

Do not add alternative state managers, HTTP clients, CSS frameworks, or UI libraries unless the user explicitly approves the architectural change.

## MUI Usage

Use MUI components for UI building blocks. When using unfamiliar MUI components or advanced props, consult the official MUI LLM documentation linked from `AGENTS.md` before coding. Prefer class names plus Emotion styles for project styling, and use MUI props for component behavior, accessibility, layout primitives, and slots.

## New Feature Checklist

When adding a feature:

1. Place files under the existing owner (`app`, `components`, `stores`, `services`, `types`, or `lib`).
2. Add pages as `src/app/<route>/page.tsx` with optional `page.style.ts`.
3. Add reusable UI as `src/components/<componentName>/<componentName>.tsx` plus a co-located style file.
4. Add shared state as `src/stores/<domain>.store.ts`.
5. Add HTTP access as `src/services/<domain>.services.ts`.
6. Add broad ambient domain types under `src/types/<domain>.d.ts`; keep local types near their owner.
7. Reuse the existing theme, `defineCss`, snackbar, router, ref, and class-name helpers.
8. Run the relevant checks when practical: `npm run build:client`, `npm run build:server`, or `npm test`.
