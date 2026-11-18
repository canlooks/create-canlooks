

## Startup

```shell
npm run dev
```

Run `npm run build` and then `npm start` to serve the production build.

## UI components

The template includes a shadcn/ui button and Sonner notifications. Add more components from the project root.

```shell
npx shadcn add dialog
```

Import components from `@/components/ui`. The CLI reads the aliases and Tailwind CSS entry from `components.json`. [shadcn/ui for Next.js](https://ui.shadcn.com/docs/installation/next)

For notifications, import `toast` from `sonner` and call it from an event handler or service, for example `toast.success('Saved')`. The app mounts one `Toaster` for all routes. [Sonner usage](https://ui.shadcn.com/docs/components/radix/sonner)

## Appearance

Define light and dark tokens in `src/app/global.css`. Use semantic classes such as `bg-background`, `text-foreground`, and `bg-primary` in components. [shadcn/ui theming](https://ui.shadcn.com/docs/theming)

`useAppearanceStore` persists the theme, primary color, and root font size. Its `setTheme`, `setPrimaryColor`, and `setFontSize` actions update the running app.
