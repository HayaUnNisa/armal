import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

/** Saved homes and the compare list, remembered on this device. */
type Store = {
  saved: string[]
  toggleSaved: (id: string) => void
  compare: string[]
  toggleCompare: (id: string) => boolean
  clearCompare: () => void
  compareOpen: boolean
  setCompareOpen: (v: boolean) => void
  viewing: string | null
  setViewing: (id: string | null) => void
}
const Ctx = createContext<Store | null>(null)
const read = (k: string): string[] => { try { return JSON.parse(localStorage.getItem(k) || '[]') } catch { return [] } }

export function StoreProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>(() => read('armal-saved'))
  const [compare, setCompare] = useState<string[]>([])
  const [compareOpen, setCompareOpen] = useState(false)
  const [viewing, setViewing] = useState<string | null>(null)
  useEffect(() => { try { localStorage.setItem('armal-saved', JSON.stringify(saved)) } catch { /* ignore */ } }, [saved])

  const toggleSaved = useCallback((id: string) => setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id])), [])
  const toggleCompare = useCallback((id: string) => {
    let ok = true
    setCompare((c) => {
      if (c.includes(id)) return c.filter((x) => x !== id)
      if (c.length >= 3) { ok = false; return c }
      return [...c, id]
    })
    return ok
  }, [])
  const clearCompare = useCallback(() => setCompare([]), [])
  return <Ctx.Provider value={{ saved, toggleSaved, compare, toggleCompare, clearCompare, compareOpen, setCompareOpen, viewing, setViewing }}>{children}</Ctx.Provider>
}
export function useStore() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useStore must be inside StoreProvider')
  return v
}
