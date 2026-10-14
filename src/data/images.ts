/**
 * PHOTOS: drop a real photo into src/assets/images/ with the same name as a placeholder
 * (e.g. villa-1.webp, living-2.jpg) and it replaces it automatically. No code changes.
 */
const real = import.meta.glob('../assets/images/*.{webp,jpg,jpeg,png,avif}', { eager: true, import: 'default' }) as Record<string, string>
const ph = import.meta.glob('../assets/placeholders/*.svg', { eager: true, import: 'default' }) as Record<string, string>
const map = (o: Record<string, string>) => Object.fromEntries(Object.entries(o).map(([p, u]) => [p.split('/').pop()!.replace(/\.[^.]+$/, ''), u]))
const R = map(real)
const P = map(ph)
export const img = (name: string) => R[name] ?? P[name] ?? P['villa-1']
