import { useEffect, useRef } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

/**
 * Smooth-scroll provider.
 * Wraps the app so all GSAP ScrollTriggers tick in sync with Lenis.
 *
 * Disabled on:
 *  - touch devices (iOS/Android already have great native momentum)
 *  - prefers-reduced-motion users
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    if (isTouch || reducedMotion) return

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, lerp: 0.1 })
    lenisRef.current = lenis

    function update(time: number) {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(update)
    gsap.ticker.lagSmoothing(0)
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      gsap.ticker.remove(update)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return <>{children}</>
}
