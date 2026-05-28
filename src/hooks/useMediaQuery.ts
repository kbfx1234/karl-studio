import { useEffect, useState } from 'react'

/**
 * Subscribe to a media query and re-render when it changes.
 * SSR-safe (returns initialValue during the first paint).
 */
export function useMediaQuery(query: string, initialValue = false): boolean {
  const [matches, setMatches] = useState(initialValue)

  useEffect(() => {
    const mql = window.matchMedia(query)
    setMatches(mql.matches)
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [query])

  return matches
}

export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
export const useReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)')
