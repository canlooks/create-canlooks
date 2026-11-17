---
name: coding-standards-skill
description: Follow this Canlooks React and Vite template's conventions when adding or editing shadcn/ui components, Tailwind styles, themes, views, routes, statio stores, or decorated Ajax services.
---

# Coding standards

The `react-shadcn` template uses Vite 8, React 19, TypeScript 6, shadcn/ui, and Tailwind CSS v4. Follow the surrounding code when editing an existing feature.

## File placement

| Path | Responsibility |
| --- | --- |
| `src/main.tsx` | Import the global stylesheet and mount the named `App` export into `#app`. |
| `src/app/` | Compose the application, define routes, and apply the theme. |
| `src/views/<viewName>/page.tsx` | Export the named, memoized route target. Keep page-specific sections beside the page. |
| `src/components/<componentName>/<componentName>.tsx` | Implement reusable application components such as `Example` and `GlobalSnackbar`. |
| `src/components/ui/` | Own the shadcn/ui primitive source installed by the registry. Keep its filenames and public exports compatible with registry imports. |
| `src/stores/<domain>.store.ts` | Own shared state and its actions. |
| `src/services/<domain>.service.ts` | Define the HTTP endpoints for a domain. |
| `src/types/<domain>.d.ts` | Declare ambient types used across domains. Keep component props and store-specific types near their owner. |
| `src/lib/` | Share class-name and ref helpers. |

## React components and routing

- Use named exports and `memo` for application components and views. Use TypeScript, four spaces, single quotes, and the existing JSX style.
- Read store slices near the top of the component. Name local event handlers with a `Handler` suffix. Pass an existing store action directly when it already fits the event.
- Use `useTransition` for pending UI and `useOptimistic` for optimistic updates with rollback when their lifecycles fit the action.
- Split substantial page sections, dialogs, or tabs into focused components. Move a component to `src/components/` when it is shared across views.
- Register views in the `RouteItem` tree in `src/app/routes.tsx`. Use `children` for nested routes. `src/app/app.tsx` mounts the `@canlooks/react-router` router and one `GlobalSnackbar` inside `ThemeProvider`.
- Keep static metadata such as the application title in `systemStore`. Use `cloneRef` from `@/lib/ref` when combining refs.

## shadcn/ui and styles

Run `npx shadcn add <component>` from the project root to install a primitive with its dependencies. `components.json` configures the New York style, TypeScript client components, Lucide icons, and aliases. Consult the checked-in primitive and the official registry for its API. [shadcn/ui component documentation](https://ui.shadcn.com/llms.txt)

Use native elements and Tailwind utilities for layout and typography. Import primitives and apply semantic color classes as in the example component.

```tsx
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
- Use `showSnackbarError`, `showSnackbarSuccess`, or `showSnackbarWarning` from `@/stores/snackbar.store` for notifications, including from non-component code. `GlobalSnackbar` displays the store's queue through the local Sonner `Toaster`. Use the existing host for all routes.

## State, services, and types

- Use `createStore` from `@canlooks/statio` for shared state. Follow `example.store.ts` for the store class, `SetStateMethod` constructor, and `use<Domain>Store` export. Subscribe to explicit keys, such as `useExampleStore('msg', 'sayHello')`. Use local React state for component-only interactions.
- Access a store outside React through `use<Domain>Store.getState()`. Guard browser-dependent helpers when they can run in tests.
- Extend `RootService` from `./root.service` in domain services. Follow `example.service.ts` for the `@Config` base URL and static methods. Keep shared headers and interceptors in `root.service.ts`.
- `src/services/urls.ts` obtains the API root from `import.meta.env.VITE_API_URL`. Define client environment values in `env/.env` with the `VITE_` prefix and type them in `src/types/env.d.ts`.
- Ambient declarations in `src/types/*.d.ts` are available without imports. Keep exported domain-specific types beside their store or service when callers depend on that API.

## Tooling

- Keep the `@/*` alias aligned in `tsconfig.json`, `vite.config.mts`, and `components.json`. The Vite config also registers `@tailwindcss/vite` and sets the environment directory. TypeScript uses the React JSX runtime, strict checking, and decorators.
- Use `npm run dev` for local development and `npm run build` to type-check and build into `dist/`. The existing `npm test` entry runs `test/test.ts`.
