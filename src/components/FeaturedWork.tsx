import { useRef } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import { featured } from '../data/site'

export function FeaturedWork() {
  const root = useRef<HTMLDivElement>(null)
  const card = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        },
      })
      tl.from('[data-featured-eyebrow]', { opacity: 0, y: 12, duration: 0.5, ease: 'power2.out' })
        .from(card.current, { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' }, '<+0.05')
        .from('[data-featured-title]', { opacity: 0, y: 30, duration: 0.7, ease: 'power3.out' }, '<+0.1')
        .from('[data-featured-sub]', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '<+0.08')
        .from('[data-featured-body]', { opacity: 0, y: 20, duration: 0.5, ease: 'power2.out' }, '<+0.08')
        .from('[data-featured-tag]', { opacity: 0, y: 14, duration: 0.4, stagger: 0.07, ease: 'power2.out' }, '<+0.05')

      return () => {
        ScrollTrigger.getAll().forEach((s) => {
          if (s.trigger === root.current) s.kill()
        })
      }
    },
    { scope: root }
  )

  function onCardMove(e: React.MouseEvent) {
    if (!card.current) return
    const rect = card.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    gsap.to(card.current, {
      rotateY: px * 12,
      rotateX: -py * 10,
      transformPerspective: 900,
      duration: 0.4,
      ease: 'power2.out',
    })
  }
  function onCardLeave() {
    if (!card.current) return
    gsap.to(card.current, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' })
  }

  return (
    <section
      id="work"
      ref={root}
      className="relative bg-bg px-8 pb-40 pt-56 lg:px-12 lg:pt-64"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 flex items-baseline justify-between" data-featured-eyebrow>
          <p className="text-meta">{featured.eyebrow}</p>
          <p className="text-meta">{featured.count}</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,360px)_1fr]">
          <figure
            ref={card}
            onMouseMove={onCardMove}
            onMouseLeave={onCardLeave}
            className="featured-card relative aspect-[3/4] overflow-hidden rounded-sm bg-stage shadow-2xl"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <img
              src="/images/featured-placeholder-600w.webp"
              srcSet="
                /images/featured-placeholder-600w.webp 600w,
                /images/featured-placeholder-1024w.webp 1024w
              "
              sizes="(min-width: 1024px) 360px, 80vw"
              alt="AUTO / KIN poster"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <figcaption className="pointer-events-none absolute inset-x-4 top-4 flex items-start justify-between font-mono text-[10px] uppercase tracking-widest text-fg/80">
              <span>{featured.title}</span>
              <span>{featured.year}</span>
            </figcaption>
            <figcaption className="pointer-events-none absolute inset-x-4 bottom-4 font-mono text-[10px] uppercase tracking-widest text-fg/80">
              {featured.subtitle}
            </figcaption>
          </figure>

          <div className="flex flex-col justify-between">
            <div>
              <h3 data-featured-title className="text-display text-[clamp(2rem,4vw,3.4rem)]">
                {featured.title}
              </h3>
              <p data-featured-sub className="mt-3 font-display text-xl text-fg-muted">
                {featured.subtitle}
              </p>
              <p data-featured-body className="mt-8 max-w-lg text-sm leading-relaxed text-fg-muted">
                {featured.body}
              </p>
            </div>
            <div className="mt-12 flex flex-wrap gap-3">
              {featured.tags.map((tag) => (
                <span
                  data-featured-tag
                  key={tag}
                  className="text-meta border border-fg/20 px-2.5 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
