import { useSyncExternalStore } from 'react'

/**
 * Subscribe to a media query and re-render when it changes.
 * SSR-safe (returns initialValue during the first paint).
 */
export function useMediaQuery(query: string, initialValue = false): boolean {
  const getServerSnapshot = () => initialValue
  const getSnapshot = () => window.matchMedia(query).matches
  const subscribe = (onStoreChange: () => void) => {
    const mql = window.matchMedia(query)
    mql.addEventListener('change', onStoreChange)
    return () => mql.removeEventListener('change', onStoreChange)
  }

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)')
export const useReducedMotion = () =>
  useMediaQuery('(prefers-reduced-motion: reduce)')
