import { company } from '../../data/site'

const paths: Record<string, JSX.Element> = {
  x: <path d="M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.2L4.8 21H1.6l7.5-8.6L1.2 3h6.6l4.5 5.7L17.5 3Zm-1.1 16.2h1.8L6.6 4.7H4.7l11.7 14.5Z" fill="currentColor" />,
  instagram: <g fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.4" cy="6.6" r=".9" fill="currentColor" /></g>,
  snapchat: <path d="M12 2.5c3 0 5.3 2.3 5.3 5.4v2.4c.6.2 1.3-.1 1.8-.1.7 0 1 .7.4 1.1-.6.4-1.7.6-2 1.1.6 2 2.3 3.4 3.9 3.9.5.2.3.8-.3 1-1 .3-1.7.3-1.9.8-.1.4-.2.9-.8.9-.6 0-1.4-.4-2.6.1-1.1.5-1.9 1.8-3.8 1.8s-2.7-1.3-3.8-1.8c-1.2-.5-2-.1-2.6-.1s-.7-.5-.8-.9c-.2-.5-.9-.5-1.9-.8-.6-.2-.8-.8-.3-1 1.6-.5 3.3-1.9 3.9-3.9-.3-.5-1.4-.7-2-1.1-.6-.4-.3-1.1.4-1.1.5 0 1.2.3 1.8.1V7.9C6.7 4.8 9 2.5 12 2.5Z" fill="currentColor" />,
  tiktok: <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.4 7.4 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6Z" fill="currentColor" />,
  linkedin: <path d="M4.5 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h3v12H3V9Zm6 0h2.9v1.7c.4-.8 1.5-1.9 3.4-1.9 3.4 0 4.2 2.2 4.2 5.2V21h-3v-6.3c0-1.5-.1-3.3-2.1-3.3-2 0-2.4 1.6-2.4 3.2V21H9V9Z" fill="currentColor" />,
}

/** Social icons. Links are not connected yet (demo) — add URLs here after approval. */
export default function Socials({ className = '' }: { className?: string }) {
  return (
    <ul className={`flex gap-2 ${className}`}>
      {company.socials.map((s) => (
        <li key={s}>
          <a href="#" onClick={(e) => e.preventDefault()} aria-label={`${s} (coming soon)`} className="grid h-10 w-10 place-items-center rounded-lg border border-white/15 text-white/80 transition hover:-translate-y-0.5 hover:border-alizarin hover:bg-alizarin hover:text-white">
            <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]">{paths[s]}</svg>
          </a>
        </li>
      ))}
    </ul>
  )
}
