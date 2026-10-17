# brycek.me — The Open Water

A personal website that is a little unnecessary in the best way.

## What it is
- Full-screen cinematic ocean landing page with four atmospheric moods.
- Real-time ocean simulation for capable desktop browsers, powered by a self-contained WebGPU engine.
- Battery-friendly, animated CSS ocean fallback for browsers/devices without WebGPU, reduced-motion preferences, and mobile by default. Full 3D can be enabled from the menu.
- Keyboard / pointer exploration, responsive navigation, accessible controls, a dramatic goodbye, and a link to the old seasonal experience at `/classic.html`.
- No runtime dependencies for the landing page itself.

## Run
`npm install && npm run dev` for local development. `npm run build` for production. Vite copies `public/ocean-engine.html` and `public/classic.html` into the output unchanged.

## Attribution
Ocean physics and rendering are based on **[Noniv/web-ocean](https://github.com/Noniv/web-ocean)** by Maksymilian Dendura, available under the MIT License. The full license is preserved in `public/LICENSE-ocean.txt`. This site's design, interactions, fallback, and copy are adaptations made for brycek.me.

The engine is GPU-intensive and not guaranteed to work in every browser. The CSS scene is an intentional fallback, not a failed loading state.
