

## Startup

```shell
npm run dev
```

## UI components

The template includes a shadcn/ui button and Sonner notifications. Add more components from the project root.

```shell
npx shadcn add dialog
```

Import components from `@/components/ui`. The CLI reads the aliases and Tailwind CSS entry from `components.json`. [shadcn/ui for Vite](https://ui.shadcn.com/docs/installation/vite)

## Appearance

Define light and dark tokens in `src/app/global.css`. Use semantic classes such as `bg-background`, `text-foreground`, and `bg-primary` in components. [shadcn/ui theming](https://ui.shadcn.com/docs/theming)

`useAppearanceStore` persists the theme, primary color, and root font size. Its `setTheme`, `setPrimaryColor`, and `setFontSize` actions update the running app.
