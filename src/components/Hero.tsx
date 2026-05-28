import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../lib/gsap'
import { hero } from '../data/site'


/**
 * Hero — entry section.
 * Animations:
 *  - eyebrow lines: stagger fade
 *  - main 3 lines: char-level blur reveal (the SplitText magic)
 *  - active block + meta + CTA: post-stagger fade
 */
export function Hero() {
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      // Char-level blur reveal for the three hero lines
      const lines = gsap.utils.toArray<HTMLElement>('[data-hero-line]')
      const splits = lines.map(
        (line) => new SplitText(line, { type: 'chars,words' })
      )

      const tl = gsap.timeline({ delay: 0.15 })

      tl.from('[data-hero-eyebrow] > p', {
        opacity: 0,
        y: 12,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power2.out',
      }, 0)

      splits.forEach((split, i) => {
        tl.from(
          split.chars,
          {
            opacity: 0,
            y: 28,
            filter: 'blur(12px)',
            stagger: 0.022,
            duration: 0.85,
            ease: 'power3.out',
          },
          0.4 + i * 0.32
        )
      })

      tl.from(
        '[data-hero-cta]',
        { opacity: 0, y: 16, duration: 0.6, ease: 'power2.out' },
        '>-0.2'
      )
        .from(
          '[data-hero-meta]',
          { opacity: 0, y: 10, stagger: 0.1, duration: 0.6, ease: 'power2.out' },
          '<'
        )
        .from(
          '[data-hero-active] > *',
          { opacity: 0, y: 8, stagger: 0.05, duration: 0.5, ease: 'power2.out' },
          '<'
        )

      return () => {
        splits.forEach((s) => s.revert())
      }
    },
    { scope: root }
  )

  return (
    <section
      ref={root}
      aria-label="Introduction"
      className="relative flex h-full flex-col justify-end px-8 pb-24 pt-32 lg:px-12 lg:pb-28"
    >
      {/* Right-side eyebrow lines (hidden on mobile to save room) */}
      <div
        className="absolute right-8 top-32 hidden max-w-xs text-right md:block lg:right-12 lg:top-40"
        data-hero-eyebrow
      >
        {hero.eyebrow.map((line) => (
          <p key={line} className="font-display text-sm text-fg-muted lg:text-base">
            {line}
          </p>
        ))}
      </div>

      {/* Bottom-left main copy */}
      <div className="relative max-w-5xl">
        <h1 className="text-display text-[clamp(2.4rem,5.6vw,5rem)]">
          {hero.lines.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-hero-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-10 flex items-end justify-between">
          <div className="text-meta" data-hero-meta>
            <p>{hero.scrollHint}</p>
          </div>
          <a href={hero.cta.href} className="cta-button" data-hero-cta>
            {hero.cta.label}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>

      {/* Bottom-right meta */}
      <div
        className="absolute bottom-28 right-8 text-right lg:bottom-28 lg:right-12"
        data-hero-meta
      >
        <p className="text-meta">{hero.rightHint}</p>
      </div>

      {/* Bottom-far-left active block */}
      <div
        className="absolute bottom-28 left-8 hidden lg:left-12 lg:block"
        data-hero-active
      >
        <p className="text-meta mb-4">● {hero.active.status}</p>
        <ul className="space-y-1 font-mono text-[10px] uppercase tracking-widest text-fg-dim">
          {hero.active.rows.map((row) => (
            <li key={row}>{row}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
