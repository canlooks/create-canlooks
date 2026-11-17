# AGENTS.md

## Project conventions

Follow the project-level skill when creating or changing views, components, routes, stores, and services. It covers file placement, React patterns, styling, theme tokens, and the Canlooks libraries. [Coding standards](./.agents/skills/coding-standards-skill/SKILL.md)

## shadcn/ui

- Import shared UI primitives from `@/components/ui`. Inspect the local source for props and variants. For unfamiliar components, consult the official component documentation. [shadcn/ui documentation for agents](https://ui.shadcn.com/llms.txt)
- Add registry components with `npx shadcn add <component>` from the project root. The CLI uses the New York style, Radix primitives, Lucide icons, and the aliases in `components.json`. [CLI configuration](https://ui.shadcn.com/docs/components-json)
- Style components with Tailwind CSS v4 utilities and the semantic tokens in `src/app/global.css`. The theme provider applies persisted appearance settings to the document root, including UI rendered in portals. [Theming](https://ui.shadcn.com/docs/theming)
