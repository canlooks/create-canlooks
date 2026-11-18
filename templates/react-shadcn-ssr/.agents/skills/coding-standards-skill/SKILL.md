---
name: coding-standards-skill
description: Follow this Canlooks Next.js template's conventions when adding or editing shadcn/ui components, Tailwind styles, themes, views, routes, statio stores, or decorated Ajax services.
---

# Coding standards

The `react-shadcn-ssr` template uses Next.js 16, React 19, TypeScript 6, shadcn/ui, and Tailwind CSS v4. Follow the surrounding code when editing an existing feature.

## File placement

Prefer camelCase for project-defined file and directory names, as in `userProfile/userProfile.tsx`. Preserve names required by the framework, tooling, or shadcn/ui registry.

| Path | Responsibility |
| --- | --- |
| `src/app/layout.tsx` | Import the global stylesheet, set page metadata, and wrap routes in `App`. |
| `src/app/` | Compose the application, define routes, and apply the theme. |
| `src/views/<viewName>/page.tsx` | Export the named, memoized route target. Keep page-specific sections beside the page. |
| `src/components/<componentName>/<componentName>.tsx` | Implement reusable application components such as `Example`. |
| `src/components/ui/` | Own the shadcn/ui primitive source installed by the registry. Keep its filenames and public exports compatible with registry imports. |
| `src/stores/<domain>.store.ts` | Own shared state and its actions. |
| `src/services/<domain>.service.ts` | Define the HTTP endpoints for a domain. |
| `src/types/<domain>.d.ts` | Declare ambient types used across domains. Keep component props and store-specific types near their owner. |
| `src/lib/` | Share utilities such as class-name and ref helpers. When the same logic appears in multiple places or multiple callers need the same utility, extract it into a shared function or class in `src/lib/` and use it at each call site. |

## React components and routing

- Use named exports and `memo` for application components and views. Use TypeScript, four spaces, single quotes, and the existing JSX style.
- Read store slices near the top of the component. Name local event handlers with a `Handler` suffix. Pass an existing store action directly when it already fits the event.
- Use `useTransition` for pending UI and `useOptimistic` for optimistic updates with rollback when their lifecycles fit the action.
- Split substantial page sections, dialogs, or tabs into focused components. Move a component to `src/components/` when it is shared across views.
- Register views with a default export in `src/app/**/page.tsx`. Use `'use client'` on components that provide interactive behavior, such as `Example`. `src/app/app.tsx` wraps each route and one Sonner `Toaster` in `ThemeProvider`.
- Keep static metadata such as the application title in `systemStore`. Use `cloneRef` from `@/lib/ref` when combining refs.

## shadcn/ui and styles

Run `npx shadcn add <component>` from the project root to install a primitive with its dependencies. `components.json` configures the New York style, React Server Component support, TypeScript, Lucide icons, and aliases. Consult the checked-in primitive and the official registry for its API. [shadcn/ui component documentation](https://ui.shadcn.com/llms.txt)

Use native elements and Tailwind utilities for layout and typography. Import primitives and apply semantic color classes as in the example component.

```tsx
'use client'

import {memo} from 'react'
import {Button} from '@/components/ui/button'
import {useExampleStore} from '@/stores/example.store'

export const Example = memo(() => {
    const {msg, sayHello} = useExampleStore('msg', 'sayHello')

    return (
        <div className="flex flex-col items-center gap-6">
            <p className="font-bold text-example">{msg}</p>
            <Button onClick={sayHello}>Say Hello!</Button>
        </div>
    )
})
```

Merge conditional and caller-supplied utility classes with `cn`. Registry components import it from the `cn` package. Application code can also use the re-export from `@/lib/classNames`. Put the caller's classes last so they can override conflicting utilities. Follow `buttonVariants` in `src/components/ui/button.tsx` for components with multiple sizes or variants. [shadcn/ui class merging](https://ui.shadcn.com/docs/changelog/2026-09-cn)

## Theme and notifications

- `src/app/global.css` imports Tailwind and defines light tokens in `:root` and dark overrides in `.dark`. Map each new semantic color through `@theme inline`. For example, `--example` is mapped to `--color-example` and consumed as `text-example`. Pair surface and foreground tokens, such as `bg-card text-card-foreground`.
- Use `useAppearanceStore` for theme, primary color, and font size. Its actions persist preferences with `@canlooks/statio`. `src/app/theme.provider.tsx` applies the root theme class, the adjusted `--primary`, a contrasting `--primary-foreground`, and the normalized root font size. Dialogs and other portals inherit these values from the document.
- Global font families, radii, page defaults, and the scrollbar utility live in the stylesheet. Use the Tailwind spacing and typography scales for component sizes that follow the root font size.
- Import `toast` from `sonner` in event handlers or services. Call `toast.success(message)`, `toast.error(message)`, or `toast.warning(message)` to notify the user. Sonner manages the queue and returns an ID that can be passed to `toast.dismiss(id)`.

## State, services, and types

- Use `createStore` from `@canlooks/statio` for shared state. Follow `example.store.ts` for the store class, `SetStateMethod` constructor, and `use<Domain>Store` export. Subscribe to explicit keys, such as `useExampleStore('msg', 'sayHello')`. Use local React state for component-only interactions.
- Access a store outside React through `use<Domain>Store.getState()`. Guard browser-dependent helpers when they can run in tests.
- When multiple components need the same data, call the domain service from a shared store action. For identical requests, reuse the in-flight request or the stored result while it is fresh. Have each component subscribe to the data in the store.
- Extend `RootService` from `./root.service` in domain services. Follow `example.service.ts` for the `@Config` base URL and static methods. Keep shared headers and interceptors in `root.service.ts`.
- `src/services/urls.ts` obtains the API root from `process.env.NEXT_PUBLIC_API_URL`. Define client environment values in the root `.env` with the `NEXT_PUBLIC_` prefix and type them in `src/types/env.d.ts`.
- Ambient declarations in `src/types/*.d.ts` are available without imports. Keep exported domain-specific types beside their store or service when callers depend on that API.

## Tooling

- Keep the `@/*` alias aligned in `tsconfig.json` and `components.json`. Tailwind runs through `@tailwindcss/postcss` in `postcss.config.mjs`. TypeScript uses the React JSX runtime, strict checking, and decorators.
- Use `npm run dev` for local development, `npm run build` to type-check and build into `dist/`, and `npm start` to serve the build. The existing `npm test` entry runs `test/test.ts`.
