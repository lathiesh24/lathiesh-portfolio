# Lathiesh Mahendran — portfolio

Next.js App Router portfolio with TypeScript, Tailwind CSS 4, React Three Fiber / Three.js, Drei, Motion, and Lucide icons. Fonts are bundled locally with Fontsource.

## Development

Requires Node.js 22 and npm.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:4173.

```sh
npm run typecheck
npm run build
```

The Next.js production build creates a static export in `out/`. It can be served by any static host; it does not require a Node.js server or API keys. ChatGPT Sites hosts the current private preview.

## Where to edit

- `content/portfolio-draft.json`: content source, with editorial notes kept out of the public site. College projects are excluded.
- `scripts/sync-content.mjs`: generates the public content module before each build.
- `src/lib/profile.ts`: generated introduction, about, skills, case-study contributions, and employment timeline.
- `src/lib/projects.ts`: project presentation and engineering decisions.
- `src/components/portfolio.tsx`: page structure and project dialogs.
- `src/components/system-scene.tsx`: interactive Three.js scene.
- `src/app/globals.css`: design, Tailwind import, and responsive layouts.
- `src/app/layout.tsx`: metadata and local fonts.
- `src/app/resume/page.tsx`: printable resume using the corrected website content; the original PDF is unchanged.

The 3D scene is lazy-loaded. Rendering pauses when offscreen or manually paused; reduced-motion preferences disable continuous animation. A CSS fallback handles unsupported WebGL and rendering errors. The project buttons provide equivalent keyboard-accessible project selection.

## Content decisions

The supplied resume is the source for project contributions. User-supplied LinkedIn details take precedence for dates: Corvus begins December 2025, and The Yellow Network has separate part-time and full-time periods. Education displays college and years only, as requested. Diagrams are labeled conceptual views or illustrations; they are not screenshots of proprietary products.
