import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { useIsDesktop, useReducedMotion } from '../hooks/useMediaQuery'
import { Hero } from './Hero'
import { Manifesto } from './Manifesto'
import { Chapter } from './Chapter'
import { chapters } from '../data/site'

/**
 * Cinematic stage — single source of truth for the scroll narrative.
 *
 * Desktop (≥ 1024px, no reduced-motion):
 *   - 600vh wrapper pins a 100vh stage and scrubs a long GSAP timeline.
 *   - Background image: scale 1.0 → 2.9 (dolly-zoom).
 *   - 7 layers (Hero + Manifesto + 5 chapters) fade in/out around their
 *     scroll-progress windows.
 *
 * Mobile / reduced-motion:
 *   - No pinning. Each layer renders as its own normal section.
 *   - Background stays as a fixed full-viewport image without zoom.
 *   - Trades cinematic dolly for accessibility + battery + small screens.
 */
const layerWindows: ReadonlyArray<readonly [number, number]> = [
  [0.0, 0.13],
  [0.13, 0.26],
  [0.26, 0.4],
  [0.4, 0.54],
  [0.54, 0.68],
  [0.68, 0.82],
  [0.82, 0.95],
] as const

export function Stage() {
  const isDesktop = useIsDesktop()
  const reduced = useReducedMotion()
  const enableCinematic = isDesktop && !reduced

  return enableCinematic ? <CinematicStage /> : <FallbackStage />
}

function CinematicStage() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const wrapper = wrapperRef.current
      const stage = stageRef.current
      if (!wrapper || !stage) return

      const bgImg = document.querySelector<HTMLElement>('[data-stage-bg] > img')
      const layers = gsap.utils.toArray<HTMLElement>('[data-stage-layer]')

      layers.forEach((el, idx) => {
        gsap.set(el, { autoAlpha: idx === 0 ? 1 : 0, y: idx === 0 ? 0 : 24 })
      })

      const st = ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: 'bottom bottom',
        pin: stage,
        scrub: 1.1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress

          if (bgImg) {
            const scale = 1.0 + p * 1.9
            bgImg.style.transform = `scale(${scale})`
          }

          layers.forEach((el, idx) => {
            const [start, end] = layerWindows[idx]
            const fadeIn = 0.022
            const fadeOut = 0.022
            let alpha = 0
            let y = 24

            if (p < start - fadeIn) {
              alpha = 0
              y = 24
            } else if (p < start) {
              const t = (p - (start - fadeIn)) / fadeIn
              alpha = t
              y = 24 * (1 - t)
            } else if (p < end - fadeOut) {
              alpha = 1
              y = 0
            } else if (p < end) {
              const t = (p - (end - fadeOut)) / fadeOut
              alpha = 1 - t
              y = -16 * t
            } else {
              alpha = 0
              y = -16
            }

            gsap.set(el, { autoAlpha: alpha, y })
          })
        },
      })

      return () => {
        st.kill()
        if (bgImg) bgImg.style.transform = ''
      }
    },
    { scope: wrapperRef }
  )

  return (
    <div
      ref={wrapperRef}
      id="top"
      className="stage-wrapper relative"
      style={{ height: '600vh' }}
    >
      <div
        ref={stageRef}
        className="stage relative h-screen w-full overflow-hidden"
      >
        <div data-stage-layer className="absolute inset-0">
          <Hero />
        </div>
        <div data-stage-layer className="absolute inset-0">
          <Manifesto />
        </div>
        {chapters.map((c) => (
          <div data-stage-layer key={c.index} className="absolute inset-0">
            <Chapter {...c} />
          </div>
        ))}
      </div>
    </div>
  )
}

/** Mobile / reduced-motion: plain stacked sections. */
function FallbackStage() {
  return (
    <div id="top" className="stage-wrapper-fallback relative">
      <Hero />
      <Manifesto />
      {chapters.map((c) => (
        <Chapter key={c.index} {...c} />
      ))}
    </div>
  )
}
