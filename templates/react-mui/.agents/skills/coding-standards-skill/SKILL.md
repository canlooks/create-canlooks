---
name: coding-standards-skill
description: Use this skill whenever creating, modifying, reviewing, or refactoring code in the MUI-based Canlooks React + Vite template. It defines the current project file structure, component/view conventions, Emotion styling model, MUI theme setup, @canlooks/react-router routing, @canlooks/statio stores, @canlooks/ajax services, Vite configuration, TypeScript/ESLint settings, and dependency choices. Trigger strongly for requests like add view, add route, create component, add service, add store, update styles, use project conventions, follow coding standards, or new file.
---

# Coding Standards Skill

This project is the `react-mui` Canlooks template: Vite 8, React 19, MUI 9, Emotion, `@canlooks/react-router`, `@canlooks/statio`, and `@canlooks/ajax`.

Before changing code, inspect the nearby files and keep the existing local style. If this skill and the checked-in code disagree, treat the checked-in code as the source of truth and avoid broad style-only rewrites.

## Current Structure

Keep the project organized around these owners:

```text
/
├── AGENTS.md
├── README.md
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.mts
├── eslint.config.mts
├── env/
│   └── .env
├── public/
│   └── logo.png
├── test/
│   ├── tsconfig.json
│   └── *.ts / *.tsx
└── src/
    ├── main.tsx
    ├── app/
    │   ├── app.tsx
    │   ├── global.style.ts
    │   ├── routes.tsx
    │   └── theme.provider.tsx
    ├── components/
    │   └── <componentName>/
    │       ├── <componentName>.tsx
    │       └── <componentName>.style.ts
    ├── lib/
    │   ├── classNames.ts
    │   ├── ref.ts
    │   ├── router.ts
    │   └── style.ts
    ├── services/
    │   ├── root.ts
    │   ├── urls.ts
    │   └── <domain>.service.ts
    ├── stores/
    │   ├── system.store.ts
    │   └── <domain>.store.ts
    ├── types/
    │   ├── env.d.ts
    │   └── <domain>.d.ts
    └── views/
        └── <viewName>/
            ├── <viewName>.tsx
            └── <viewName>.style.ts
```

Add new code under the existing owner instead of creating new top-level folders unless the feature clearly needs a new domain boundary.

## General Code Style

- Use TypeScript, 4-space indentation, single quotes, no semicolons, and the current JSX formatting style (`<Component/>` for empty elements).
- Use camelCase for file and directory names unless a tool requires a fixed name such as `index.html`, `vite.config.mts`, `tsconfig.json`, or `eslint.config.mts`.
- Give component and view directories the same camelCase basename as their component file: `globalSnackbar/globalSnackbar.tsx`.
- Prefer named imports. Use default imports when the dependency or local pattern expects them, such as `path` or `Color`.
- Keep imports readable and stable. When adding imports, prefer this grouping when it fits the file: React/Vite, MUI, other packages, `@/` internal imports, then relative imports. Do not churn unrelated imports only to sort them.
- Use `type` imports for types when it improves clarity or avoids runtime imports, following existing files such as `globalSnackbar.tsx`.
- Avoid unrelated formatting changes. This template values small, local edits.

## Vite Entry, App Shell, Views, And Routing

The Vite document and application shell are split across `index.html`, `src/main.tsx`, and `src/app/`.

- Keep `index.html` limited to document metadata, the `#app` mount element, and the `/src/main.tsx` module script.
- Keep `src/main.tsx` limited to mounting the named `App` export:

```tsx
import {createRoot} from 'react-dom/client'

import {App} from './app/app'

createRoot(document.getElementById('app')!).render(<App/>)
```

- Do not add Next.js files, server components, `'use client'`, or `next/*` imports. The Vite application runs on the client.
- Keep the root application composition in `src/app/app.tsx`:

```tsx
<ThemeProvider>
    <Router entry={routeEntry}/>
    <GlobalSnackbar/>
</ThemeProvider>
```

- Define the single `RouteItem` route tree in `src/app/routes.tsx` and mount it with `Router` from `@canlooks/react-router`.
- Put route targets in `src/views/<viewName>/`; use a named, memoized export for each view.
- Add nested routes through the `children` array supported by `RouteItem` instead of introducing another routing library.
- Keep reusable UI in `src/components/`; do not use a view as a general-purpose shared component.
- Keep `systemStore` as the owner of static application metadata such as `appId`, `title`, and `subTitle`.

## Components

Shared components live in `src/components/<componentName>/`.

- Use one component directory per reusable component.
- Use a named export for public shared components:

```tsx
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
- Give event handlers defined inside components the `Handler` suffix, such as `closeHandler` or `submitHandler`.
- Keep local helper components as file-local consts or functions when they are implementation details.
- Do not use `React.FC`; type props inline or with a nearby type when useful.
- Use `cloneRef` from `src/lib/ref.ts` when merging refs. Use `forwardRef` only when a component deliberately exposes a ref API.

## Styling

Use Emotion through the `css` prop and `defineCss` for project-owned styling.

- Co-locate component and view styles in `<name>.style.ts`.
- Export named style constants, usually `style`.
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

- First prefer colors from the MUI theme palette, such as `palette.primary.main`, `palette.secondary.main`, `palette.text.primary`, and `palette.background.default`.
- When a palette color is close but needs transparency, mixing, lightening, darkening, or another calculation, derive the result from the MUI theme palette with the `color` library. Use `alpha()` and `mixColor()` when they fit; add another small wrapper in `src/lib/style.ts` or use `Color(...)` directly when a different calculation is clearer.
- Use `customColors` from `src/app/theme.provider.tsx` only when the color cannot reasonably be derived from the MUI palette, or when a semantic project token is clearer than a complex calculation.
- Use literal colors only for theme/custom color definitions, hard visual constants, or effects that are clearer as CSS literals.
- For normal component/view typography, write font sizes in `rem` and keep the 16px-root calculation visible in code; for example, a 14px font size is `font-size: ${14 / 16}rem;`.
- Prefer the Emotion `css` prop over `sx` or inline `style={{}}` for project-owned layout and visual styling.
- Keep global styles in `src/app/global.style.ts` and inject them from `ThemeProvider` with Emotion's `Global` component.

## Theme And Global UI

Treat the app theme layer as part of the template contract.

- Keep `src/app/theme.provider.tsx` as the owner of:
  - `defaultFontFamily` and `defaultMonospaceFontFamily`
  - `customColors`
  - `ColorContext` and `useColorContext()`
  - MUI `createTheme()`
  - `CssBaseline`
  - global Emotion styles
  - syncing document color scheme, background, and root font size
- Add theme-wide palette, typography, shape, or appearance changes in `theme.provider.tsx`.
- Add global CSS reset and document layout rules in `global.style.ts`.
- Keep `GlobalSnackbar` mounted once under `ThemeProvider` in `App`; drive it through `snackbar.store.ts`.
- Do not add an Emotion cache or server-side style insertion code. Those belong to the Next.js SSR template, not this Vite client template.

## State Stores

Use `@canlooks/statio` for shared state.

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

- Name store files `<domain>.store.ts`.
- Use PascalCase for store classes and keep them file-local unless there is a clear reason to export them.
- Name store hooks `use<Domain>Store`.
- Consume stores with explicit selectors: `useExampleStore('msg', 'sayHello')`.
- Use `storage()` from `@canlooks/statio` for persisted stores, as in `appearance.store.ts`.
- Use `useStore.getState()` in non-component helpers only when needed. Guard DOM or storage access when the helper can run in tests or other non-browser tooling.
- Use local React state for component-only UI state; use stores for shared state.
- Keep `system.store.ts` as a plain static object for application metadata, not a statio store.

## Services And HTTP

Use `@canlooks/ajax`; do not introduce `fetch`, `axios`, `ky`, or another HTTP client for application APIs.

- Define the Vite API root in `src/services/urls.ts`:

```ts
export const root = import.meta.env.VITE_API_URL
```

- Keep `src/services/root.ts` as the owner of `RootService`, global headers, request interceptors, response interceptors, timeout/auth/network error messages, and snackbar error reporting.
- Name domain service files `<domain>.service.ts`, import `RootService` from `./root`, and define service classes that extend it.

```ts
import {Config} from '@canlooks/ajax'

import {RootService} from './root'

@Config({url: '/example'})
export class ExampleService extends RootService {
    static foo() {
        return this.post('/foo', {
            data: {}
        })
    }
}
```

- Make service methods static.
- Use `@Config` for each service base URL.
- Keep shared error behavior in `RootService`; put endpoint-specific logic in domain services.
- Store Vite environment values in `env/.env`, expose client values only with the `VITE_` prefix, and type them in `src/types/env.d.ts`.

## Types

Support both local TypeScript types and ambient domain declarations.

- Keep `src/types/env.d.ts` present for Vite client references and `ImportMetaEnv` augmentation.
- Use `src/types/<domain>.d.ts` for ambient domain namespaces that should be globally available without imports.

```ts
/**
 * types内的文件无需引入
 */

declare namespace Example {
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

- `src/lib/classNames.ts`: use `clsx(...)` for conditional class-name composition.
- `src/lib/ref.ts`: use `cloneRef(...)` for merging callback and object refs.
- `src/lib/router.ts`: use `replaceLocation(...)` for browser location replacement, including optional search parameters. Keep it browser-only and do not import `next/navigation`.
- `src/lib/style.ts`: use the Emotion theme/custom-color helpers.

## Vite, Config, And Tooling

- Keep `index.html` as the Vite document entry and `src/main.tsx` as the React entry.
- Keep `vite.config.mts` responsible for `envDir: 'env'`, the `@ -> src` alias, and clearing the Vite output directory.
- Keep root `tsconfig.json` strict with `moduleResolution: "bundler"`, `jsx: "react-jsx"`, `jsxImportSource: "@emotion/react"`, decorators enabled, unused-local checks enabled, and the `@/* -> ./src/*` path alias.
- Use flat ESLint config in `eslint.config.mts`; keep the `react/no-unknown-property` exception for Emotion's `css` prop.
- Keep test files under `test/` and ignored by ESLint through `globalIgnores(['test'])`.
- Use `npm run dev` for the Vite development server, `npm run build` for TypeScript checking plus the production bundle, and `npm test` for the test script.
- Keep production output in `dist/`.

## Dependencies

Stay within the template stack unless the user explicitly asks for a new library or the current stack cannot solve the problem.

- Runtime and UI: `react`, `react-dom`, `@mui/material`, `@mui/icons-material`
- Build and routing: `vite`, `@canlooks/react-router`
- Styling: `@emotion/react`, `@emotion/styled`, `color`, `@fontsource/roboto`
- State: `@canlooks/statio`
- HTTP: `@canlooks/ajax`
- Utility already present: `dayjs`
- Tooling: TypeScript 6, ESLint 9, TypeScript ESLint, and React ESLint plugins

Do not add alternative routers, state managers, HTTP clients, CSS frameworks, or UI libraries unless the user explicitly approves the architectural change.

## MUI Usage

Use MUI components for UI building blocks. When using unfamiliar MUI components or advanced props, consult the official MUI LLM documentation linked from `AGENTS.md` before coding. Prefer class names plus Emotion styles for project styling, and use MUI props for component behavior, accessibility, layout primitives, and slots.

## New Feature Checklist

When adding a feature:

1. Place files under the existing owner (`app`, `views`, `components`, `stores`, `services`, `types`, or `lib`).
2. Add route targets as `src/views/<viewName>/<viewName>.tsx` with a co-located `<viewName>.style.ts` when styles are needed.
3. Register routes in `src/app/routes.tsx` with `RouteItem`.
4. Add reusable UI as `src/components/<componentName>/<componentName>.tsx` plus a co-located style file.
5. Add shared state as `src/stores/<domain>.store.ts`.
6. Add HTTP access as `src/services/<domain>.service.ts`.
7. Add broad ambient domain types under `src/types/<domain>.d.ts`; keep local types near their owner.
8. Reuse the existing theme, `defineCss`, snackbar, router, ref, and class-name helpers.
9. Run the relevant checks when practical: `npm run build` and `npm test`.
