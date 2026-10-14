# Armal Real Estate — demo website (أرمال العقارية)

React + TypeScript + Tailwind CSS + React Router + Framer Motion (Vite). Arabic (default, right-to-left) and English.

## Run
```bash
npm install
npm run dev      # local
npm run build    # production build in /dist
```
Deploy on Vercel with the **Vite** preset (`vercel.json` handles page refreshes).

## Brand (from the Armal Visual Identity guide)
- Colours: exact hex values from page 6, in `tailwind.config.js` (`alizarin`, `revolver`, `manatee`, `snow`).
- Font: Fustat (Arabic + Latin), self-hosted in `src/assets/fonts/`.
- Logos: `src/assets/brand/` — **redrawn from the PDF for the demo. Replace with the official SVG files** (keep the same file names).

## Editing content
| What | File |
|---|---|
| Properties, cities, types, agents, company details | `src/data/site.ts` |
| Every interface text (Arabic + English) | `src/i18n/strings.ts` |
| Social links (currently not linked) | `src/components/ui/Socials.tsx` |

### Photos (no code needed)
Placeholders are in `src/assets/placeholders/` (e.g. `villa-1.svg`, `living-2.svg`).
Put a real photo in `src/assets/images/` with the same name (`villa-1.webp`, `living-2.jpg`) and it replaces the placeholder everywhere.

### Demo limitations
Forms (viewing booking, contact, list a property) show a success message but don't send data yet.
No map yet. Saved homes are stored on the visitor's device.
