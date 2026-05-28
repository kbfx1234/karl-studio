import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { idCard } from '../data/site'

/**
 * Hover-triggered ID card hanging from the top of the viewport.
 *
 * UX:
 *   - Idle: card is hidden above the viewport.
 *   - When the cursor enters the top-right "hot zone" (where the navbar lives),
 *     the rope drops, the card falls in with bounce, and a damped pendulum
 *     swing settles it upright.
 *   - When the cursor leaves the zone for >300ms, the card retracts upward.
 *   - When the card is settled, mouse moves over the card cause a 3D tilt.
 */
export function IdCard() {
  const wrap = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLDivElement>(null)
  const rope = useRef<HTMLDivElement>(null)
  const tip = useRef<HTMLDivElement>(null)
  const isOpenRef = useRef(false)
  const closeTimer = useRef<number | null>(null)

  // Initialize hidden state + register the global hot-zone listener.
  useEffect(() => {
    if (!card.current || !rope.current || !tip.current) return

    gsap.set(card.current, { y: -560, rotation: 0, opacity: 0 })
    gsap.set(rope.current, { scaleY: 0, transformOrigin: 'top center' })
    gsap.set(tip.current, { opacity: 0 })

    function isHotZone(e: MouseEvent) {
      // Top-right rectangle: roughly the navbar area where ENTER STUDIO sits
      const w = window.innerWidth
      return e.clientY < 110 && e.clientX > w - 460
    }

    function open() {
      if (isOpenRef.current) return
      isOpenRef.current = true
      const tl = gsap.timeline()
      tl.to(rope.current, {
        scaleY: 1,
        duration: 0.35,
        ease: 'power2.out',
      })
        .to(tip.current, { opacity: 1, duration: 0.15 }, '<+0.1')
        .fromTo(
          card.current,
          { y: -560, rotation: 0, opacity: 0 },
          { y: 0, rotation: -22, opacity: 1, duration: 0.55, ease: 'power2.in' },
          '<'
        )
        // Damped pendulum
        .to(card.current, { rotation: 14, duration: 0.45, ease: 'sine.inOut' })
        .to(card.current, { rotation: -8, duration: 0.45, ease: 'sine.inOut' })
        .to(card.current, { rotation: 4, duration: 0.4, ease: 'sine.inOut' })
        .to(card.current, { rotation: 0, duration: 0.4, ease: 'sine.out' })
    }

    function close() {
      if (!isOpenRef.current) return
      isOpenRef.current = false
      gsap.to(card.current, {
        y: -560,
        rotation: 0,
        opacity: 0,
        duration: 0.45,
        ease: 'power2.in',
      })
      gsap.to(tip.current, { opacity: 0, duration: 0.2 })
      gsap.to(rope.current, {
        scaleY: 0,
        duration: 0.3,
        ease: 'power2.in',
        delay: 0.2,
      })
    }

    function onMove(e: MouseEvent) {
      if (isHotZone(e)) {
        if (closeTimer.current) {
          window.clearTimeout(closeTimer.current)
          closeTimer.current = null
        }
        open()
      } else if (isOpenRef.current && !closeTimer.current) {
        // Delay the close so a quick pass through doesn't dismiss it
        closeTimer.current = window.setTimeout(() => {
          closeTimer.current = null
          close()
        }, 350)
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      if (closeTimer.current) window.clearTimeout(closeTimer.current)
    }
  }, [])

  // 3D tilt on hover over the card itself
  function onCardMove(e: React.MouseEvent) {
    if (!card.current) return
    const rect = card.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(card.current, {
      rotateY: px * 16,
      rotateX: -py * 12,
      duration: 0.4,
      ease: 'power2.out',
      transformPerspective: 800,
    })
  }
  function onCardLeave() {
    if (!card.current) return
    gsap.to(card.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  return (
    <div
      ref={wrap}
      className="pointer-events-none fixed right-12 top-0 z-30 hidden w-[260px] xl:block"
    >
      <div
        ref={rope}
        className="mx-auto h-20 w-px bg-fg/40"
      />
      <div
        ref={tip}
        className="mx-auto -mt-1 h-3 w-3 rotate-45 bg-fg-muted/60"
      />

      <div
        ref={card}
        onMouseMove={onCardMove}
        onMouseLeave={onCardLeave}
        className="pointer-events-auto relative -mt-2 origin-top rounded-md bg-stage/95 p-5 text-fg shadow-2xl ring-1 ring-fg/10 backdrop-blur"
      >
        <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-fg-dim">
          <span>ID</span>
          <span>{idCard.id}</span>
        </div>

        <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight">
          {idCard.name}
          <span className="ml-1 text-fg-muted">—13</span>
        </h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-fg-muted">
          {idCard.subtitle}
        </p>

        <div className="my-5 h-px w-full bg-fg/10" />

        <ul className="space-y-1.5 text-xs leading-relaxed text-fg-muted">
          {idCard.meta.map((m) => (
            <li key={m}>{m}</li>
          ))}
        </ul>

        <div className="mt-5 flex items-end justify-between">
          <p className="font-mono text-[10px] uppercase tracking-widest text-fg-dim">
            {idCard.role}
          </p>
          <div className="flex h-6 items-end gap-[2px]">
            {Array.from({ length: 18 }).map((_, i) => (
              <span
                key={i}
                className="block w-px bg-fg-muted"
                style={{ height: `${50 + ((i * 37) % 50)}%` }}
              />
            ))}
          </div>
        </div>

        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-fg-dim">
          {idCard.status}
        </p>
      </div>
    </div>
  )
}
