# React Bits

React Bits is an animated React component collection and visual showcase built with Next.js, React, TypeScript, Tailwind CSS, GSAP, Three.js, and WebGL.

The homepage presents a responsive gallery of 219 components, including backgrounds, text effects, cards, menus, cursors, loaders, galleries, controls, and WebGL experiences.

## Features

- 219 reusable React components
- Lazy-loaded component previews
- Responsive component gallery
- Animated backgrounds and interfaces
- GSAP, Motion, Three.js, React Three Fiber, and OGL integrations
- Next.js App Router and TypeScript
- Tailwind CSS styling

## Prerequisites

- Node.js 20 or later
- npm

## Installation

Install the dependencies:

```powershell
npm install
```

Start the development server:

```powershell
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For complete setup details, see [INSTALLATION.md](./INSTALLATION.md).

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project structure

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── ComponentGallery.tsx
│   └── 219 visual component files
└── lib/
    └── utils.ts
```

## Component usage

Components are stored in `src/components`. Import a component by its default export:

```tsx
import Aurora from "@/components/Aurora";

export default function Example() {
  return (
    <Aurora
      colorStops={["#5227FF", "#7cff67", "#5227FF"]}
      amplitude={1}
      blend={0.5}
    />
  );
}
```

Individual components expose their own props and may require additional configuration or external assets. Check the component source and its exported interfaces for the supported options.

## Production build

```powershell
npm run build
npm run start
```
